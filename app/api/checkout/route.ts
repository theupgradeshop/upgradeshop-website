import { NextRequest, NextResponse } from "next/server";
import { Pool } from "pg";

// UpgradeShop is Tenant #1
const UPGRADESHOP_CUSTOMER_ID = "00000000-0000-0000-0000-000000000001";

// Database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

interface CheckoutRequestBody {
  buyer: {
    email: string;
    first_name: string;
    last_name: string;
    phone: string;
    company?: string;
    country: string;
  };
  items: Array<{
    product_id: string;
    quantity: number;
    display_price?: number; // Price in the display currency (e.g., ILS)
  }>;
  currency?: string; // Display currency (e.g., "ILS", "USD")
  display_total?: number; // Total in the display currency
  language?: string; // Buyer's browsing locale — validated against SUPPORTED_LOCALES below
}

// Mirrors i18n/routing.ts's `locales` — kept as a literal list here rather than
// importing routing.ts, since that config is next-intl-shaped and this route
// only needs the raw set of valid values.
const SUPPORTED_LOCALES = ["en", "he"];

export async function POST(request: NextRequest) {
  const client = await pool.connect();

  try {
    const body: CheckoutRequestBody = await request.json();

    // Validate required fields
    if (!body.buyer?.email || !body.buyer?.first_name || !body.buyer?.last_name) {
      return NextResponse.json(
        { success: false, error: "Missing required buyer information" },
        { status: 400 }
      );
    }

    if (!body.items || body.items.length === 0) {
      return NextResponse.json(
        { success: false, error: "Cart is empty" },
        { status: 400 }
      );
    }

    console.log("[Checkout API] Processing order for:", body.buyer.email);

    await client.query("BEGIN");

    const validatedLanguage =
      body.language && SUPPORTED_LOCALES.includes(body.language) ? body.language : null;

    // Find or create contact for this buyer
    let contactId: string;
    const existingContact = await client.query(
      `SELECT id FROM crm.contacts
       WHERE customer_id = $1 AND email = $2
       LIMIT 1`,
      [UPGRADESHOP_CUSTOMER_ID, body.buyer.email.toLowerCase()]
    );

    if (existingContact.rows.length > 0) {
      contactId = existingContact.rows[0].id;
      console.log("[Checkout API] Found existing contact:", contactId);
      // Fill-only — never overwrite a language the contact already has.
      if (validatedLanguage) {
        await client.query(
          `UPDATE crm.contacts SET language = $1 WHERE id = $2 AND language IS NULL`,
          [validatedLanguage, contactId]
        );
      }
    } else {
      // Create new contact
      const newContact = await client.query(
        `INSERT INTO crm.contacts
         (customer_id, email, first_name, last_name, phone, company, source, status, contact_type, language)
         VALUES ($1, $2, $3, $4, $5, $6, 'checkout', 'active', 'customer', $7)
         RETURNING id`,
        [
          UPGRADESHOP_CUSTOMER_ID,
          body.buyer.email.toLowerCase(),
          body.buyer.first_name,
          body.buyer.last_name,
          body.buyer.phone || null,
          body.buyer.company || null,
          validatedLanguage,
        ]
      );
      contactId = newContact.rows[0].id;
      console.log("[Checkout API] Created new contact:", contactId);
    }

    // Get products and calculate totals
    const productIds = body.items.map((item) => item.product_id);
    const productsResult = await client.query(
      `SELECT id, name, price, billing_cycle, product_type, subscription_features
       FROM store.products
       WHERE customer_id = $1 AND id = ANY($2) AND status = 'active'`,
      [UPGRADESHOP_CUSTOMER_ID, productIds]
    );

    if (productsResult.rows.length !== productIds.length) {
      await client.query("ROLLBACK");
      return NextResponse.json(
        { success: false, error: "One or more products not found" },
        { status: 400 }
      );
    }

    // Build product map
    const productMap = new Map(productsResult.rows.map((p) => [p.id, p]));
    const displayCurrency = body.currency || "USD";

    // Calculate totals - use display prices if provided (for ILS etc.), otherwise DB prices
    let subtotal = 0;
    const orderItems: Array<{
      product_id: string;
      product_name: string;
      price: number;
      quantity: number;
      subtotal: number;
      total_amount: number;
      billing_cycle: string | null;
    }> = [];

    for (const item of body.items) {
      const product = productMap.get(item.product_id);
      if (!product) continue;

      // Use display price if provided, otherwise fall back to DB price
      const price = item.display_price ?? Number(product.price);
      const itemTotal = price * item.quantity;
      subtotal += itemTotal;

      orderItems.push({
        product_id: product.id,
        product_name: product.name,
        price,
        quantity: item.quantity,
        subtotal: itemTotal,
        total_amount: itemTotal,
        billing_cycle: product.billing_cycle,
      });
    }

    // Use display total if provided
    if (body.display_total) {
      subtotal = body.display_total;
    }

    // Generate sequential order number starting from 1000
    const lastOrderResult = await client.query(
      `SELECT order_number FROM store.orders
       WHERE customer_id = $1 AND order_number ~ '^[0-9]+$'
       ORDER BY CAST(order_number AS INTEGER) DESC
       LIMIT 1`,
      [UPGRADESHOP_CUSTOMER_ID]
    );
    const lastNumber = lastOrderResult.rows.length > 0
      ? parseInt(lastOrderResult.rows[0].order_number, 10)
      : 999;
    const orderNumber = `${lastNumber + 1}`;

    // Create order
    const orderResult = await client.query(
      `INSERT INTO store.orders
       (customer_id, contact_id, order_number, subtotal, total_amount, currency,
        financial_status, fulfillment_status, customer_email, customer_phone, customer_name,
        payment_method, metadata)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
       RETURNING id, order_number`,
      [
        UPGRADESHOP_CUSTOMER_ID,
        contactId,
        orderNumber,
        subtotal,
        subtotal, // total_amount = subtotal (no discounts for now)
        displayCurrency,
        "pending", // Will be updated to 'paid' after payment
        "fulfilled", // Digital/virtual products - no shipping needed
        body.buyer.email,
        body.buyer.phone || null,
        `${body.buyer.first_name} ${body.buyer.last_name}`,
        "pending", // Payment method TBD
        JSON.stringify({
          source: "upgradeshop.ai",
          country: body.buyer.country,
          company: body.buyer.company,
          awaitingPayment: true,
          ...(validatedLanguage ? { language: validatedLanguage } : {}),
        }),
      ]
    );

    const orderId = orderResult.rows[0].id;
    const finalOrderNumber = orderResult.rows[0].order_number;

    console.log("[Checkout API] Created order:", orderId, finalOrderNumber);

    // Create order items
    for (const item of orderItems) {
      await client.query(
        `INSERT INTO store.order_items
         (order_id, product_id, product_name, price, quantity, subtotal, total_amount, billing_cycle)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
        [
          orderId,
          item.product_id,
          item.product_name,
          item.price,
          item.quantity,
          item.subtotal,
          item.total_amount,
          item.billing_cycle,
        ]
      );
    }

    console.log("[Checkout API] Created", orderItems.length, "order items");

    await client.query("COMMIT");

    // Check if this order has subscription products
    const hasSubscriptions = orderItems.some(item => item.billing_cycle !== null);
    console.log("[Checkout API] Order has subscriptions:", hasSubscriptions);

    // TODO: Send notification email to team about new order
    // TODO: Send confirmation email to customer

    return NextResponse.json({
      success: true,
      order_id: orderId,
      order_number: finalOrderNumber,
      total: subtotal,
      currency: displayCurrency,
      status: "pending",
      hasSubscriptions,
    });
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("[Checkout API] Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to process checkout. Please try again.",
      },
      { status: 500 }
    );
  } finally {
    client.release();
  }
}

export async function GET() {
  return NextResponse.json({
    status: "ok",
    message: "Checkout API is active",
    store_id: UPGRADESHOP_CUSTOMER_ID,
  });
}
