"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Loader2,
  ShoppingCart,
  AlertCircle,
  AlertTriangle,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  CreditCard,
  Lock,
} from "lucide-react";
import { formatPriceSimple as formatPrice } from "@/lib/currency";


const PLATFORM_URL = process.env.NEXT_PUBLIC_UPGRADESHOP_API_URL || "https://app.staging.upgradeshop.ai";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://anahata.staging.upgradeshop.ai";

const translations: Record<string, Record<string, string>> = {
  en: {
    checkout: "Checkout",
    completePurchase: "Complete your purchase",
    firstName: "First Name",
    lastName: "Last Name",
    email: "Email",
    phone: "Phone",
    company: "Company",
    companyPlaceholder: "Company name (optional)",
    addAddress: "Address details (optional)",
    address: "Address",
    streetPlaceholder: "Street address",
    city: "City",
    postalCode: "Postal Code",
    country: "Country",
    termsAgree: "I agree to the",
    termsLink: "terms and conditions",
    and: "and",
    privacyLink: "privacy policy",
    processing: "Processing...",
    pay: "Pay",
    placeOrder: "Place Order",
    secureCheckout: "Secure checkout",
    orderSuccess: "Order Placed Successfully!",
    paymentSuccess: "Payment Successful!",
    thankYou: "Thank you for your purchase. You'll receive a confirmation email shortly.",
    acceptTerms: "Please accept the terms and conditions",
    qty: "Qty",
    perMonth: "/mo",
    perYear: "/yr",
    perQuarter: "/quarter",
    coupon: "Coupon",
    couponPlaceholder: "Enter coupon code",
    applyCoupon: "Apply",
    remove: "Remove",
    invalidCoupon: "Invalid coupon code",
    subtotal: "Subtotal",
    discount: "Discount",
    total: "Total",
    expires: "Expires",
    limitedAvailability: "Limited availability",
    remaining: "remaining",
    cardDetails: "Card Details",
    cardNumber: "Card Number",
    expiryMonth: "Month",
    expiryYear: "Year",
    cvv: "CVV",
    idNumber: "ID Number",
    idNumberHint: "Required for Israeli credit cards",
    securePayment: "Your payment is securely processed. We never store your card details.",
    loadingPayment: "Loading payment form...",
    processingPayment: "Processing payment...",
    paymentError: "Payment failed",
    paymentFailedFallback: "Payment failed. Please try again.",
    redirectingToPayment: "Redirecting to secure payment...",
    uncertainTitle: "Your payment is being confirmed",
    uncertainBody:
      "Please don't pay again or refresh this page. We'll confirm your order shortly and email you a receipt. If you don't hear from us within a few hours, please contact us instead of trying again.",
  },
  he: {
    checkout: "תשלום",
    completePurchase: "השלימו את הרכישה",
    firstName: "שם פרטי",
    lastName: "שם משפחה",
    email: "אימייל",
    phone: "טלפון",
    company: "חברה",
    companyPlaceholder: "שם חברה (אופציונלי)",
    addAddress: "פרטי כתובת (אופציונלי)",
    address: "כתובת",
    streetPlaceholder: "רחוב ומספר",
    city: "עיר",
    postalCode: "מיקוד",
    country: "מדינה",
    termsAgree: "אני מסכים/ה",
    termsLink: "לתנאי השימוש",
    and: "ו",
    privacyLink: "מדיניות הפרטיות",
    processing: "מעבד...",
    pay: "לתשלום",
    placeOrder: "שליחת הזמנה",
    secureCheckout: "תשלום מאובטח",
    orderSuccess: "ההזמנה בוצעה בהצלחה!",
    paymentSuccess: "התשלום בוצע בהצלחה!",
    thankYou: "תודה על הרכישה. תקבלו אישור במייל בקרוב.",
    acceptTerms: "יש לאשר את תנאי השימוש",
    qty: "כמות",
    perMonth: "/חודש",
    perYear: "/שנה",
    perQuarter: "/רבעון",
    coupon: "קופון",
    couponPlaceholder: "הזן קוד קופון",
    applyCoupon: "החל",
    remove: "הסר",
    invalidCoupon: "קוד קופון לא תקף",
    subtotal: "סה״כ ביניים",
    discount: "הנחה",
    total: "סה״כ",
    expires: "תוקף",
    limitedAvailability: "זמינות מוגבלת",
    remaining: "נותרו",
    cardDetails: "פרטי כרטיס",
    cardNumber: "מספר כרטיס",
    expiryMonth: "חודש",
    expiryYear: "שנה",
    cvv: "CVV",
    idNumber: "תעודת זהות",
    idNumberHint: "נדרש עבור כרטיסי אשראי ישראליים",
    securePayment: "התשלום מאובטח. פרטי הכרטיס אינם נשמרים אצלנו.",
    loadingPayment: "טוען טופס תשלום...",
    processingPayment: "מעבד תשלום...",
    paymentError: "שגיאת תשלום",
    paymentFailedFallback: "התשלום נכשל. נא לנסות שוב.",
    redirectingToPayment: "מעביר לתשלום מאובטח...",
    uncertainTitle: "התשלום שלכם בבדיקה",
    uncertainBody:
      "נא לא לשלם שוב ולא לרענן את הדף. נאשר את ההזמנה בקרוב ונשלח קבלה במייל. אם לא תקבלו עדכון תוך מספר שעות, אנא צרו קשר איתנו במקום לנסות שוב.",
  },
};

/**
 * Mirrors `PaymentInstruction`/`PaymentOutcome` from the dashboard's
 * src/lib/store/payment-registry.ts (Payments Consolidation, 2026-08-20
 * spec §2.1/§2.4) — redeclared locally rather than imported, since this is
 * a separate repo. This buyer surface renders purely by `instruction.kind`
 * / `outcome.status`, never by gateway name.
 */
type PaymentInstruction =
  | { kind: "none" }
  | { kind: "redirect"; url: string }
  | { kind: "client_instrument"; provider: string; publicConfig: Record<string, any> };

type PaymentOutcome =
  | { status: "paid"; transactionId: string }
  | { status: "declined"; code: string }
  | { status: "ambiguous"; code: string };

/**
 * The engine and the /payment/begin and /payment/execute routes return
 * error CODES, never prose — this table is this component's own localized
 * copy for each one. `generic` is the fallback for any code this table
 * doesn't recognize, so an unmapped/future code never renders raw on the
 * page.
 */
const paymentErrorLabels: Record<string, Record<string, string>> = {
  en: {
    generic: "Something went wrong. Please try again.",
    invalid_request: "Something went wrong. Please try again.",
    rate_limited: "Too many attempts. Please wait a moment and try again.",
    invalid_ownership_token: "Your session has expired. Please refresh the page and try again.",
    order_not_found: "We couldn't find your order. Please refresh the page and try again.",
    module_disabled: "Payments are currently unavailable for this store.",
    no_gateway_connected: "Payment is not available for this store right now.",
    gateway_misconfigured: "Payment is not available for this store right now.",
    unknown_gateway: "Payment is not available for this store right now.",
    invalid_redirect_url: "Something went wrong. Please refresh the page and try again.",
    order_not_chargeable: "This order has already been processed.",
    amount_mismatch: "Something went wrong with your order total. Please refresh the page and try again.",
    currency_mismatch: "Something went wrong with your order currency. Please refresh the page and try again.",
    card_declined: "Your card was declined. Please try a different card.",
    gateway_not_configured: "Payment is not available for this store right now.",
    gateway_unreachable: "We couldn't reach the payment provider. Please try again.",
    sdk_load_failed: "Failed to load the secure payment form. Please refresh the page and try again.",
    sdk_init_failed: "Failed to initialize the payment form. Please refresh the page and try again.",
    form_not_ready: "Payment form is not ready. Please refresh the page and try again.",
    token_missing: "Failed to process card. Please try again.",
    network_error: "Could not reach the payment server. Please check your connection and try again.",
    unsupported_provider: "Payment is not available for this store right now.",
  },
  he: {
    generic: "משהו השתבש. נא לנסות שוב.",
    invalid_request: "משהו השתבש. נא לנסות שוב.",
    rate_limited: "יותר מדי ניסיונות. נא להמתין רגע ולנסות שוב.",
    invalid_ownership_token: "פג תוקף החיבור. נא לרענן את הדף ולנסות שוב.",
    order_not_found: "לא הצלחנו למצוא את ההזמנה. נא לרענן את הדף ולנסות שוב.",
    module_disabled: "התשלומים אינם זמינים כעת עבור חנות זו.",
    no_gateway_connected: "התשלום אינו זמין כעת עבור חנות זו.",
    gateway_misconfigured: "התשלום אינו זמין כעת עבור חנות זו.",
    unknown_gateway: "התשלום אינו זמין כעת עבור חנות זו.",
    invalid_redirect_url: "משהו השתבש. נא לרענן את הדף ולנסות שוב.",
    order_not_chargeable: "ההזמנה הזו כבר טופלה.",
    amount_mismatch: "משהו השתבש בסכום ההזמנה. נא לרענן את הדף ולנסות שוב.",
    currency_mismatch: "משהו השתבש במטבע ההזמנה. נא לרענן את הדף ולנסות שוב.",
    card_declined: "הכרטיס נדחה. נא לנסות כרטיס אחר.",
    gateway_not_configured: "התשלום אינו זמין כעת עבור חנות זו.",
    gateway_unreachable: "לא הצלחנו להתחבר לספק התשלומים. נא לנסות שוב.",
    sdk_load_failed: "טעינת טופס התשלום המאובטח נכשלה. נא לרענן את הדף ולנסות שוב.",
    sdk_init_failed: "אתחול טופס התשלום נכשל. נא לרענן את הדף ולנסות שוב.",
    form_not_ready: "טופס התשלום עדיין לא מוכן. נא לרענן את הדף ולנסות שוב.",
    token_missing: "עיבוד הכרטיס נכשל. נא לנסות שוב.",
    network_error: "לא הצלחנו להתחבר לשרת התשלומים. נא לבדוק את החיבור ולנסות שוב.",
    unsupported_provider: "התשלום אינו זמין כעת עבור חנות זו.",
  },
};

function paymentErrorLabel(lang: string, code: string | null): string {
  if (!code) return "";
  const table = paymentErrorLabels[lang] || paymentErrorLabels.en;
  return table[code] || table.generic;
}

interface PaymentPageCheckoutProps {
  paymentPage: any;
  slug: string;
}

export function PaymentPageCheckout({ paymentPage, slug }: PaymentPageCheckoutProps) {
  const lang = paymentPage.language || "en";
  const t = translations[lang] || translations.en;
  const isRTL = lang === "he";
  const dir = isRTL ? "rtl" : "ltr";
  const currency = paymentPage.currency || "ILS";
  const requiresPayment = paymentPage.total > 0;

  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [viewId, setViewId] = useState<string | null>(null);

  // Customer details
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);

  // Optional address
  const [showAddress, setShowAddress] = useState(false);
  const [company, setCompany] = useState("");
  const [addressLine1, setAddressLine1] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");

  // Coupon
  const [couponInput, setCouponInput] = useState("");
  const [couponLoading, setCouponLoading] = useState(false);
  const [couponError, setCouponError] = useState<string | null>(null);

  // Auto-apply pre-assigned coupon from payment page config
  const getPreAppliedCoupon = () => {
    const coupon = paymentPage.coupon;
    if (!coupon?.code || !coupon?.discountType) return null;
    let discountAmount = 0;
    if (coupon.discountType === "percentage") {
      discountAmount = paymentPage.subtotal * (coupon.discountValue / 100);
    } else {
      discountAmount = Math.min(coupon.discountValue, paymentPage.subtotal);
    }
    return { code: coupon.code, discountAmount };
  };

  const [appliedCoupon, setAppliedCoupon] = useState<{
    code: string;
    discountAmount: number;
  } | null>(getPreAppliedCoupon);

  const getBillingLabel = (billingCycle: string | null | undefined) => {
    if (!billingCycle) return "";
    switch (billingCycle) {
      case "monthly": return t.perMonth;
      case "yearly": return t.perYear;
      case "quarterly": return t.perQuarter;
      default: return "";
    }
  };

  const hasSubscriptionItems = paymentPage.items.some(
    (item: any) => item.product?.billing_cycle
  );
  // Only show billing label on total when ALL items are subscriptions (no mix of one-time + subscription)
  const allItemsAreSubscriptions = paymentPage.items.every(
    (item: any) => item.product?.billing_cycle
  );

  // Split view: separate monthly and one-time totals when both exist
  const monthlyItems = paymentPage.items.filter((item: any) => item.product?.billing_cycle === "monthly");
  const oneTimeItems = paymentPage.items.filter((item: any) => item.product?.billing_cycle !== "monthly");
  const hasBothTypes = monthlyItems.length > 0 && oneTimeItems.length > 0;
  const monthlyEffectiveTotal = monthlyItems.reduce((sum: number, item: any) => sum + (item.effectivePrice ?? 0) * (item.quantity ?? 1), 0);
  const oneTimeEffectiveTotal = oneTimeItems.reduce((sum: number, item: any) => sum + (item.effectivePrice ?? 0) * (item.quantity ?? 1), 0);

  // Apply coupon to monthly first (subscription coupon), overflow to one-time
  const couponDiscount = appliedCoupon?.discountAmount || 0;
  const monthlyAfterCoupon = Math.max(0, monthlyEffectiveTotal - couponDiscount);
  const couponRemainder = Math.max(0, couponDiscount - monthlyEffectiveTotal);
  const oneTimeAfterCoupon = Math.max(0, oneTimeEffectiveTotal - couponRemainder);

  // Gateway-blind payment state (Payments Consolidation, 2026-08-20 spec) —
  // ownershipToken proves this browser was just handed this order by the
  // checkout response; `instruction` is what /payment/begin told us to do
  // (never a gateway name); `paymentErrorCode` holds an error CODE from the
  // engine/routes, rendered through paymentErrorLabel(); `uncertain` is a
  // distinct terminal state from success/failure — an ambiguous outcome or
  // a client-side timeout, neither of which is safe to auto-retry or offer
  // a retry control for (the atomic charge claim on the server is what
  // actually prevents a double charge; a resubmit here would defeat that).
  const [ownershipToken, setOwnershipToken] = useState<string | null>(null);
  const [instruction, setInstruction] = useState<PaymentInstruction | null>(null);
  const [paymentErrorCode, setPaymentErrorCode] = useState<string | null>(null);
  const [uncertain, setUncertain] = useState(false);
  const [sdkLoaded, setSdkLoaded] = useState(false);
  const [formBound, setFormBound] = useState(false);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const boundRef = useRef(false);
  // Holds the created order (id/total/currency/redirectUrl) between
  // checkout and the SUMIT token callback / execute call.
  const orderRef = useRef<any>(null);

  // Renders the SUMIT card form purely by instruction.kind/provider, never
  // by a hardcoded gateway assumption — the only client_instrument gateway
  // today is sumit, but this component never special-cases "sumit" outside
  // of this check + the SDK-loading effects below.
  const showCardForm = instruction?.kind === "client_instrument" && instruction.provider === "sumit";
  const sumitPublicConfig = showCardForm
    ? (instruction as { kind: "client_instrument"; provider: string; publicConfig: Record<string, any> }).publicConfig
    : undefined;

  const effectiveTotal = Math.max(0, paymentPage.total - (appliedCoupon?.discountAmount || 0));
  const hasRestrictions =
    paymentPage.restrictions?.expiresAt || paymentPage.restrictions?.usageRemaining !== null;

  // Record page view
  useEffect(() => {
    const recordView = async () => {
      try {
        const domain = new URL(SITE_URL).hostname;
        const response = await fetch(`${PLATFORM_URL}/api/public/payment-pages/${slug}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            domain,
            visitorIp: null,
            userAgent: navigator.userAgent,
            referrer: document.referrer,
          }),
        });
        if (response.ok) {
          const data = await response.json();
          if (data.viewId) setViewId(data.viewId);
        }
      } catch {
        // Non-critical
      }
    };
    recordView();
  }, [slug]);

  // Load SUMIT SDK — only once /payment/begin has actually told us this
  // order's gateway is a client_instrument (sumit) one. Unlike the old
  // direct sumit-config call, there is nothing to preload speculatively
  // before that: a redirect-gateway tenant (Green Invoice — all three real
  // tenants today) never reaches this branch at all.
  useEffect(() => {
    if (!showCardForm) return;

    setPaymentLoading(true);

    const loadSumitSDK = () => {
      if (window.OfficeGuy?.Payments) { setSdkLoaded(true); setPaymentLoading(false); return; }
      const script = document.createElement("script");
      script.src = "https://app.sumit.co.il/scripts/payments.js";
      script.async = true;
      script.onload = () => { setSdkLoaded(true); setPaymentLoading(false); };
      script.onerror = () => { setPaymentErrorCode("sdk_load_failed"); setPaymentLoading(false); };
      document.head.appendChild(script);
    };

    const loadJQuery = () => {
      if (window.jQuery) { loadSumitSDK(); return; }
      const script = document.createElement("script");
      script.src = "https://code.jquery.com/jquery-3.7.1.min.js";
      script.async = true;
      script.onload = () => loadSumitSDK();
      script.onerror = () => { setPaymentErrorCode("sdk_load_failed"); setPaymentLoading(false); };
      document.head.appendChild(script);
    };

    loadJQuery();
  }, [showCardForm]);

  // Bind SUMIT form once SDK is loaded, using the publicConfig the
  // gateway-blind /payment/begin call handed us — no separate
  // domain-scoped config fetch.
  useEffect(() => {
    if (!sdkLoaded || !formRef.current || boundRef.current) return;
    if (!showCardForm || !sumitPublicConfig) return;
    if (!window.OfficeGuy?.Payments) return;

    boundRef.current = true;
    try {
      window.OfficeGuy.Payments.InitEditors("#sumit-payment-form");
      window.OfficeGuy.Payments.BindFormSubmit({
        CompanyID: sumitPublicConfig.companyId,
        APIPublicKey: sumitPublicConfig.apiPublicKey,
        FormSelector: "#sumit-payment-form",
        Environment: "api",
        ErrorsClass: ".og-errors",
        ResponseLanguage: lang === "he" ? "he" : "en",
        ResponseCallback: handleTokenResponse,
      });
      setFormBound(true);
    } catch (err) {
      console.error("SUMIT init error:", err);
      setPaymentErrorCode("sdk_init_failed");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sdkLoaded, showCardForm]);

  // SUMIT token callback — fires after jQuery form submit, then completes
  // the charge through the gateway-blind /payment/execute endpoint. No
  // direct call to the legacy sumit/charge or sumit/post-payment endpoints.
  const handleTokenResponse = async (response: any) => {
    if (response.Status !== 0) {
      // SUMIT's own client-side tokenization validation message — already
      // localized via ResponseLanguage above (not one of our engine's
      // codes, so it doesn't go through paymentErrorLabel()).
      const errorMsg = response.UserErrorMessage || response.TechnicalErrorDetails || t.paymentFailedFallback;
      setError(errorMsg);
      setPaymentProcessing(false);
      return;
    }

    const token = response.Data?.SingleUseToken;
    if (!token) {
      setPaymentErrorCode("token_missing");
      setPaymentProcessing(false);
      return;
    }

    const order = orderRef.current;
    if (!ownershipToken || !order?.id) {
      setPaymentErrorCode("generic");
      setPaymentProcessing(false);
      return;
    }

    try {
      // The gateway-blind completion path — executeOrderPayment builds its
      // own line items from the order's own stored order_items
      // server-side, takes the atomic charge claim, and returns a
      // PaymentOutcome. No gateway name, no items/customer payload — just
      // the instrument token and the order's own echoed amount/currency
      // for the pre-charge integrity guard.
      const res = await fetch(`${PLATFORM_URL}/api/public/orders/${order.id}/payment/execute`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ownershipToken,
          instrumentToken: token,
          amount: Number(order.total),
          currency: order.currency,
        }),
      });
      const body = await res.json().catch(() => ({}));

      if (!res.ok) {
        const code = typeof body.code === "string" ? body.code : "internal_error";
        // internal_error is the one non-2xx shape executeOrderPayment
        // cannot rule out having happened after a real charge attempt —
        // every genuine gateway-side uncertainty already comes back as a
        // 200 {status:"ambiguous"} below. Treated as uncertain, never a
        // "try again" invitation — same reasoning as the client timeout in
        // handlePayClick.
        if (code === "internal_error") {
          setUncertain(true);
        } else {
          setPaymentErrorCode(code);
        }
        setPaymentProcessing(false);
        return;
      }

      const outcome = body as PaymentOutcome;
      if (outcome.status === "paid") {
        setSuccess(true);
        if (order.redirectUrl) {
          setTimeout(() => { window.location.href = order.redirectUrl; }, 2000);
        }
      } else if (outcome.status === "declined") {
        // Final; the claim was released server-side — a retry with a
        // different card is safe. The card form stays mounted.
        setPaymentErrorCode(outcome.code);
        setPaymentProcessing(false);
      } else {
        // ambiguous — the claim is retained server-side; never auto-retry.
        setUncertain(true);
        setPaymentProcessing(false);
      }
    } catch (err) {
      // A network failure while awaiting the charge outcome is exactly as
      // uncertain as the client timeout below — the request may have
      // reached the server and charged the card even though this browser
      // never saw the response. Never presented as retryable.
      console.error("[payment/execute] request failed:", err);
      setUncertain(true);
      setPaymentProcessing(false);
    }
  };

  // Apply coupon
  const handleApplyCoupon = async () => {
    if (!couponInput.trim()) return;
    setCouponLoading(true);
    setCouponError(null);
    try {
      const domain = new URL(SITE_URL).hostname;
      const res = await fetch(`${PLATFORM_URL}/api/public/payment-pages/${slug}/validate-coupon`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ domain, code: couponInput.trim(), subtotal: paymentPage.subtotal }),
      });
      const data = await res.json();
      if (data.valid) {
        setAppliedCoupon({ code: data.code, discountAmount: data.discountAmount });
        setCouponInput("");
      } else {
        setCouponError(data.message || t.invalidCoupon);
      }
    } catch {
      setCouponError(t.invalidCoupon);
    } finally {
      setCouponLoading(false);
    }
  };

  // Creates the order and asks the gateway-blind payment engine what to do
  // next. This has to happen before we know whether this tenant's gateway
  // needs a card form (client_instrument) or sends the buyer to a hosted
  // page (redirect) — so, unlike the old flow, order creation can no
  // longer wait until a SUMIT-specific "Pay" click. Used both by the
  // "Continue to Payment" button (requiresPayment) and directly by the
  // "Place Order" button for free orders.
  const handleContinue = async () => {
    setError(null);
    setPaymentErrorCode(null);

    if (!firstName || !lastName || !email || !phone) {
      setError(lang === "he" ? "יש למלא את כל השדות החובה" : "Please fill in all required fields");
      return;
    }
    if (!termsAccepted) { setError(t.acceptTerms); return; }

    setLoading(true);

    try {
      const domain = new URL(SITE_URL).hostname;
      const res = await fetch(`${PLATFORM_URL}/api/public/payment-pages/${slug}/checkout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          domain,
          customerData: {
            firstName,
            lastName,
            email,
            phone,
            ...(company && { company }),
            ...(addressLine1 && {
              address: {
                street: addressLine1,
                city: city || undefined,
                postalCode: postalCode || undefined,
                country: country || undefined,
              },
            }),
          },
          viewId,
          couponCode: appliedCoupon?.code || null,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Checkout failed");
      }

      const result = await res.json();

      if (!result.requiresPayment) {
        // Free order (or a coupon that zeroed it out) — done immediately.
        setSuccess(true);
        if (result.redirectUrl) {
          setTimeout(() => { window.location.href = result.redirectUrl; }, 2000);
        }
        setLoading(false);
        return;
      }

      const token = typeof result.ownershipToken === "string" ? result.ownershipToken : null;
      if (!token || !result.order?.id) {
        // trySignOrderOwnershipToken() never blocks the checkout response
        // on a signing failure — without a token we cannot start payment
        // at all, so surface this immediately rather than let a later
        // /payment/begin call fail with a more confusing "session
        // expired" message.
        setPaymentErrorCode("generic");
        setLoading(false);
        return;
      }

      setOwnershipToken(token);
      orderRef.current = { ...result.order, redirectUrl: result.redirectUrl };

      const beginRes = await fetch(`${PLATFORM_URL}/api/public/orders/${result.order.id}/payment/begin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ownershipToken: token }),
      });
      const beginBody = await beginRes.json().catch(() => ({}));

      if (!beginRes.ok) {
        setPaymentErrorCode(typeof beginBody.code === "string" ? beginBody.code : "generic");
        setLoading(false);
        return;
      }

      const nextInstruction = beginBody as PaymentInstruction;

      if (nextInstruction.kind === "none") {
        setSuccess(true);
        if (result.redirectUrl) {
          setTimeout(() => { window.location.href = result.redirectUrl; }, 2000);
        }
        setLoading(false);
        return;
      }

      // A client_instrument for a provider this buyer surface doesn't
      // know how to mount (only "sumit" is implemented today) must not
      // silently render a blank state — showCardForm below only matches
      // provider "sumit", so anything else needs its own explicit error.
      if (nextInstruction.kind === "client_instrument" && nextInstruction.provider !== "sumit") {
        setPaymentErrorCode("unsupported_provider");
        setLoading(false);
        return;
      }

      setInstruction(nextInstruction);
      setLoading(false);

      // A "redirect" instruction (Green Invoice's hosted page) sends the
      // buyer off this page entirely — rendered purely by
      // instruction.kind, never a gateway name.
      if (nextInstruction.kind === "redirect") {
        window.location.href = nextInstruction.url;
      }
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  // SUMIT-specific "Pay" click — only ever shown once /payment/begin
  // returned a client_instrument(sumit) instruction. Triggers the bound
  // SUMIT form submit, which tokenizes the card and calls
  // handleTokenResponse above.
  const handlePayClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setError(null);
    setPaymentErrorCode(null);
    setPaymentProcessing(true);

    if (!window.jQuery || !formRef.current) {
      setPaymentErrorCode("form_not_ready");
      setPaymentProcessing(false);
      return;
    }

    window.jQuery(formRef.current).trigger("submit");

    // Safety timeout — if the SUMIT SDK callback never fires, the charge
    // outcome is genuinely UNKNOWN, not failed. Routes to the same
    // do-not-retry "uncertain" state as a live ambiguous outcome — never
    // "please try again", which would invite the double-charge the atomic
    // claim exists to prevent.
    setTimeout(() => {
      setPaymentProcessing((current) => {
        if (current) setUncertain(true);
        return false;
      });
    }, 30000);
  };

  const websiteUrl = typeof window !== "undefined"
    ? `${window.location.protocol}//${window.location.host}`
    : SITE_URL;

  // Uncertain State — an ambiguous outcome or a client timeout: the charge
  // may or may not have gone through. Deliberately no retry affordance and
  // no automatic retry — a resubmit here could double-charge, which is
  // exactly what the server-side atomic claim exists to prevent.
  if (uncertain) {
    return (
      <div className="max-w-md mx-auto text-center space-y-4 flex flex-col items-center justify-center" style={{ minHeight: "60vh" }} dir={dir}>
        <AlertTriangle className="h-20 w-20 text-amber-600 mx-auto" />
        <h2 className="text-2xl font-semibold">{t.uncertainTitle}</h2>
        <p className="text-muted-foreground">{t.uncertainBody}</p>
      </div>
    );
  }

  if (success) {
    return (
      <div className="max-w-md mx-auto text-center space-y-4 flex flex-col items-center justify-center" style={{ minHeight: "60vh" }}>
        <CheckCircle2 className="h-20 w-20 text-green-600 mx-auto" />
        <h2 className="text-2xl font-semibold">
          {requiresPayment ? t.paymentSuccess : t.orderSuccess}
        </h2>
        {paymentPage.customSuccessMessage ? (
          <p className="text-muted-foreground">{paymentPage.customSuccessMessage}</p>
        ) : (
          <p className="text-muted-foreground">{t.thankYou}</p>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8" dir={dir}>
      {/* Left — Products & Summary */}
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              {paymentPage.title}
            </CardTitle>
            {paymentPage.description && (
              <CardDescription>{paymentPage.description}</CardDescription>
            )}
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Products */}
            <div className="space-y-4">
              {paymentPage.items.map((item: any) => {
                const imageUrl = item.product.images?.[0]?.url || item.product.images?.[0];
                return (
                  <div key={item.product.id} className="flex gap-4">
                    {imageUrl && (
                      <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-sand">
                        <Image src={imageUrl} alt={item.product.name} fill className="object-cover" />
                      </div>
                    )}
                    <div className="flex-1">
                      <h3 className="font-medium">{item.product.name}</h3>
                      {item.product.description && (
                        <p className="text-sm text-muted-foreground line-clamp-2">{item.product.description}</p>
                      )}
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-sm text-muted-foreground">{t.qty}: {item.quantity}</span>
                        {item.effectivePrice < item.originalPrice ? (
                          <>
                            <span className="text-sm line-through text-muted-foreground">
                              {formatPrice(item.originalPrice, currency)}
                            </span>
                            <span className="text-sm font-medium text-green-600">
                              {formatPrice(item.effectivePrice, currency)}{getBillingLabel(item.product?.billing_cycle)}
                            </span>
                          </>
                        ) : (
                          <span className="text-sm font-medium">
                            {formatPrice(item.effectivePrice, currency)}{getBillingLabel(item.product?.billing_cycle)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <Separator />

            {/* Coupon */}
            <div className="space-y-2">
              {appliedCoupon ? (
                <div className="flex items-center justify-between rounded-md bg-green-50 border border-green-200 px-3 py-2 text-sm">
                  <span className="text-green-700">
                    {t.coupon}: <code className="font-mono font-semibold">{appliedCoupon.code}</code>
                    {" "}— -{formatPrice(appliedCoupon.discountAmount, currency)}
                  </span>
                  <button
                    type="button"
                    onClick={() => setAppliedCoupon(null)}
                    className="text-green-600 hover:text-green-800 text-xs underline ms-2"
                  >
                    {t.remove}
                  </button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <Input
                    value={couponInput}
                    onChange={(e) => { setCouponInput(e.target.value); setCouponError(null); }}
                    onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleApplyCoupon())}
                    placeholder={t.couponPlaceholder}
                    className="text-sm"
                    dir="ltr"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleApplyCoupon}
                    disabled={couponLoading || !couponInput.trim()}
                    className="shrink-0"
                  >
                    {couponLoading ? <Loader2 className="h-3 w-3 animate-spin" /> : t.applyCoupon}
                  </Button>
                </div>
              )}
              {couponError && <p className="text-xs text-red-600">{couponError}</p>}
            </div>

            {/* Price summary */}
            <div className="space-y-2">
              {hasBothTypes ? (
                /* Split view: prominent today total with per-category breakdown */
                <>
                  <Separator />
                  <div className="flex justify-between items-baseline">
                    <span className="text-lg font-bold">{isRTL ? "סה״כ להיום" : "Total today"}:</span>
                    <span className="text-2xl font-bold">{formatPrice(effectiveTotal, currency)}</span>
                  </div>
                  <div className={`flex gap-3 text-sm text-muted-foreground ${isRTL ? "justify-end" : ""}`}>
                    <span>{formatPrice(oneTimeAfterCoupon, currency)} {isRTL ? "חד פעמי" : "one-time"}</span>
                    <span>·</span>
                    <span>{formatPrice(monthlyAfterCoupon, currency)}{getBillingLabel("monthly")} {isRTL ? "מנוי" : "subscription"}</span>
                  </div>
                </>
              ) : (
                /* Single category: standard subtotal/discount/total */
                <>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{t.subtotal}:</span>
                    <span>{formatPrice(paymentPage.subtotal, currency)}{allItemsAreSubscriptions ? getBillingLabel(paymentPage.items.find((i: any) => i.product?.billing_cycle)?.product?.billing_cycle) : ""}</span>
                  </div>
                  {paymentPage.discount > 0 && (
                    <div className="flex justify-between text-sm text-green-600">
                      <span>{t.discount}:</span>
                      <span>-{formatPrice(paymentPage.discount, currency)}</span>
                    </div>
                  )}
                  {appliedCoupon && (
                    <div className="flex justify-between text-sm text-green-600">
                      <span>{t.coupon} ({appliedCoupon.code}):</span>
                      <span>-{formatPrice(appliedCoupon.discountAmount, currency)}</span>
                    </div>
                  )}
                  <Separator />
                  <div className="flex justify-between text-lg font-bold">
                    <span>{t.total}:</span>
                    <span>{formatPrice(effectiveTotal, currency)}{allItemsAreSubscriptions ? getBillingLabel(paymentPage.items.find((i: any) => i.product?.billing_cycle)?.product?.billing_cycle) : ""}</span>
                  </div>
                </>
              )}
            </div>

            {hasRestrictions && (
              <div className="text-xs text-muted-foreground space-y-1 pt-2 border-t">
                {paymentPage.restrictions.expiresAt && (
                  <p>{t.expires}: {new Date(paymentPage.restrictions.expiresAt).toLocaleDateString(isRTL ? "he-IL" : "en-US")}</p>
                )}
                {paymentPage.restrictions.usageRemaining !== null && (
                  <p>{t.limitedAvailability}: {paymentPage.restrictions.usageRemaining} {t.remaining}</p>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Right — Checkout form */}
      <div>
        <Card>
          <CardHeader>
            <CardTitle>{t.checkout}</CardTitle>
            <CardDescription>{t.completePurchase}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {(error || paymentErrorCode) && (
                <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-800">
                  <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <p>{error || paymentErrorLabel(lang, paymentErrorCode)}</p>
                </div>
              )}

              {/* Customer details */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="firstName">{t.firstName} *</Label>
                  <Input id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">{t.lastName} *</Label>
                  <Input id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="email">{t.email} *</Label>
                  <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">{t.phone} *</Label>
                  <Input id="phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="company">{t.company}</Label>
                <Input id="company" value={company} onChange={(e) => setCompany(e.target.value)} placeholder={t.companyPlaceholder} />
              </div>

              <button
                type="button"
                onClick={() => setShowAddress(!showAddress)}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors w-full py-1"
              >
                {showAddress ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                {t.addAddress}
              </button>

              {showAddress && (
                <div className="space-y-3 pt-1 border-t border-dashed">
                  <div className="space-y-2">
                    <Label htmlFor="addressLine1">{t.address}</Label>
                    <Input id="addressLine1" value={addressLine1} onChange={(e) => setAddressLine1(e.target.value)} placeholder={t.streetPlaceholder} />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <Label htmlFor="city">{t.city}</Label>
                      <Input id="city" value={city} onChange={(e) => setCity(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="postalCode">{t.postalCode}</Label>
                      <Input id="postalCode" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="country">{t.country}</Label>
                    <Input id="country" value={country} onChange={(e) => setCountry(e.target.value)} />
                  </div>
                </div>
              )}

              {/* Continue to Payment — creates the order and asks the
                  gateway-blind payment engine what to do next. Shown only
                  before we have an instruction; once /payment/begin
                  responds this gives way to either the redirect notice or
                  the SUMIT card form below. */}
              {requiresPayment && !instruction && (
                <Button
                  type="button"
                  className="w-full bg-gold hover:bg-gold-dark text-foreground font-semibold text-base h-12"
                  onClick={handleContinue}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 me-2 animate-spin" />
                      {t.processing}
                    </>
                  ) : (
                    lang === "he" ? "המשך לתשלום" : "Continue to Payment"
                  )}
                </Button>
              )}

              {/* Redirect instruction (Green Invoice's hosted page) — sends
                  the buyer off this page entirely. Rendered purely by
                  instruction.kind, never a gateway name. */}
              {instruction?.kind === "redirect" && (
                <div className="flex items-center justify-center gap-2 py-4 text-sm text-muted-foreground">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  {t.redirectingToPayment}
                </div>
              )}

              {/* SUMIT card fields — only once /payment/begin returned a
                  client_instrument(sumit) instruction. */}
              {showCardForm && (
                <>
                  <Separator />
                  <p className="text-sm font-medium flex items-center gap-2">
                    <CreditCard className="h-4 w-4" />
                    {t.cardDetails}
                  </p>

                  {paymentLoading ? (
                    <div className="flex items-center gap-2 py-4 text-sm text-muted-foreground">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      {t.loadingPayment}
                    </div>
                  ) : (
                    <form
                      ref={formRef}
                      id="sumit-payment-form"
                      data-og="form"
                      className="space-y-3"
                    >
                      {/* Card Number */}
                      <div className="space-y-1">
                        <Label>{t.cardNumber}</Label>
                        <div className="relative">
                          <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                          <input
                            type="text"
                            data-og="cardnumber"
                            placeholder="1234 5678 9012 3456"
                            maxLength={19}
                            className="flex h-10 w-full rounded-md border border-input bg-background pl-10 pr-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                            autoComplete="cc-number"
                            dir="ltr"
                          />
                        </div>
                      </div>

                      {/* Expiry + CVV */}
                      <div className={`grid gap-3 ${(sumitPublicConfig?.showCVV ?? true) ? 'grid-cols-3' : 'grid-cols-2'}`}>
                        <div className="space-y-1">
                          <Label>{t.expiryMonth}</Label>
                          <select
                            data-og="expirationmonth"
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                            autoComplete="cc-exp-month"
                          >
                            <option value="">MM</option>
                            {Array.from({ length: 12 }, (_, i) => {
                              const m = (i + 1).toString().padStart(2, "0");
                              return <option key={m} value={m}>{m}</option>;
                            })}
                          </select>
                        </div>
                        <div className="space-y-1">
                          <Label>{t.expiryYear}</Label>
                          <select
                            data-og="expirationyear"
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                            autoComplete="cc-exp-year"
                          >
                            <option value="">YY</option>
                            {Array.from({ length: 15 }, (_, i) => {
                              const y = (new Date().getFullYear() + i).toString().slice(-2);
                              return <option key={y} value={y}>{y}</option>;
                            })}
                          </select>
                        </div>
                        {(sumitPublicConfig?.showCVV ?? true) && (
                          <div className="space-y-1">
                            <Label>{t.cvv}</Label>
                            <input
                              type="text"
                              data-og="cvv"
                              placeholder="123"
                              maxLength={4}
                              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                              required={sumitPublicConfig?.requireCVV ?? false}
                              autoComplete="cc-csc"
                              dir="ltr"
                            />
                          </div>
                        )}
                      </div>

                      {/* ID Number — controlled by showCitizenID setting */}
                      {(sumitPublicConfig?.showCitizenID ?? false) && (
                        <div className="space-y-1">
                          <Label>{t.idNumber}</Label>
                          <input
                            type="text"
                            data-og="citizenid"
                            maxLength={9}
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                            required={sumitPublicConfig?.requireCitizenID ?? false}
                            autoComplete="off"
                            dir="ltr"
                          />
                          <p className="text-xs text-muted-foreground">{t.idNumberHint}</p>
                        </div>
                      )}

                      {/* SUMIT error area */}
                      <div className="og-errors text-red-600 text-sm font-medium empty:hidden"></div>
                    </form>
                  )}
                </>
              )}

              {/* Terms */}
              <div className="flex items-start gap-2">
                <Checkbox
                  id="terms"
                  checked={termsAccepted}
                  onCheckedChange={(checked) => setTermsAccepted(!!checked)}
                />
                <div className="text-sm text-muted-foreground leading-tight">
                  <span
                    className="cursor-pointer"
                    onClick={() => setTermsAccepted(!termsAccepted)}
                  >
                    {t.termsAgree}
                  </span>{" "}
                  <a href={`${websiteUrl}/terms`} target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground">
                    {t.termsLink}
                  </a>
                  {" "}{t.and}{" "}
                  <a href={`${websiteUrl}/privacy`} target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground">
                    {t.privacyLink}
                  </a>
                </div>
              </div>

              {/* Place Order — free orders only; requiresPayment orders use
                  the "Continue to Payment" button above, which itself
                  calls handleContinue. */}
              {!requiresPayment && (
                <Button
                  type="button"
                  onClick={handleContinue}
                  className="w-full bg-gold hover:bg-gold-dark text-foreground font-semibold text-base h-12"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 me-2 animate-spin" />
                      {t.processing}
                    </>
                  ) : (
                    t.placeOrder
                  )}
                </Button>
              )}

              {/* Pay — only once the SUMIT card form is mounted and bound. */}
              {showCardForm && (
                <Button
                  type="button"
                  onClick={handlePayClick}
                  className="w-full bg-gold hover:bg-gold-dark text-foreground font-semibold text-base h-12"
                  disabled={paymentProcessing || paymentLoading || !formBound}
                >
                  {paymentProcessing ? (
                    <>
                      <Loader2 className="h-4 w-4 me-2 animate-spin" />
                      {t.processingPayment}
                    </>
                  ) : (
                    <>
                      <Lock className="h-4 w-4 me-2" />
                      {t.pay} {formatPrice(effectiveTotal, currency)}{allItemsAreSubscriptions ? getBillingLabel(paymentPage.items.find((i: any) => i.product?.billing_cycle)?.product?.billing_cycle) : ""}
                    </>
                  )}
                </Button>
              )}

              <p className="text-xs text-center text-muted-foreground flex items-center justify-center gap-1">
                <Lock className="h-3 w-3" />
                {requiresPayment ? t.securePayment : t.secureCheckout}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
