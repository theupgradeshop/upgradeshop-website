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
import { formatPriceSimple as formatPrice, formatQuoteAmount } from "@/lib/currency";
import {
  quoteModeOf,
  currencyOf,
  isQuotableEmail,
  selectionsKey,
  createRequoter,
  payHold,
  buildCheckoutBody,
  interpretCheckoutFailure,
  summaryRows,
  type PaymentQuote,
  type RequoteInput,
  type CatalogueBundle,
  type BundleSelections,
  quoteFractionDigitsOf,
  beginFailureHandling,
  chooseOrderAction,
  parseBeginInstruction,
  type BeginInstruction,
  type CouponReason,
} from "@/lib/payment-quote";


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
    unavailableTitle: "This payment page is unavailable",
    unavailableBody: "This page cannot be priced right now. Please contact us.",
    chooseOption: "Choose an option",
    addOns: "Add-ons",
    couponCode: "Coupon code",
    couponApplied: "Coupon applied",
    couponPendingEmail: "Enter your email to apply your coupon",
    couponDropped: "The page's coupon could not be applied",
    couponRefused: "This code was not applied",
    reason_not_valid: "This code is not valid.",
    reason_not_for_this_purchase: "This code does not apply to this purchase.",
    reason_not_for_this_email: "This code cannot be used with this email.",
    reason_limit_reached: "This code has reached its usage limit.",
    reason_minimum_not_met: "This purchase is below the minimum for this code.",
    reason_maximum_exceeded: "This purchase is above the maximum for this code.",
    itemDiscount: "Item discount",
    globalDiscount: "Discount",
    couponDiscount: "Coupon discount",
    shipping: "Shipping",
    recurringLabel: "Then",
    perWeek: "/wk",
    perDay: "/day",
    perPeriod: "/billing period",
    updatingPrice: "Updating price...",
    requoteFailed: "We could not refresh the price. The price shown is the last one we have.",
    retry: "Try again",
    priceUpdated: "The price has changed. Please review the new total and confirm again.",
    selectionsHeld: "Please wait for the price to update before paying.",
    enterEmailToPay: "Enter your email so we can confirm your final price.",
    pricingErrorFallback: "This page could not be priced. Please refresh the page and try again.",
    orderHeldHint: "Your details are locked while we confirm this order. You can try again, or reload the page or contact us.",
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
    unavailableTitle: "דף התשלום אינו זמין",
    unavailableBody: "לא ניתן לחשב את המחיר של הדף כרגע. אנא צרו קשר.",
    chooseOption: "בחרו אפשרות",
    addOns: "תוספות",
    couponCode: "קוד קופון",
    couponApplied: "הקופון הופעל",
    couponPendingEmail: "הזינו אימייל כדי להפעיל את הקופון",
    couponDropped: "קופון הדף לא הופעל",
    couponRefused: "הקוד לא הופעל",
    reason_not_valid: "הקוד אינו תקף.",
    reason_not_for_this_purchase: "הקוד אינו חל על רכישה זו.",
    reason_not_for_this_email: "לא ניתן להשתמש בקוד עם אימייל זה.",
    reason_limit_reached: "הקוד הגיע למגבלת השימוש.",
    reason_minimum_not_met: "הרכישה נמוכה מהמינימום הנדרש לקוד.",
    reason_maximum_exceeded: "הרכישה גבוהה מהמקסימום המותר לקוד.",
    itemDiscount: "הנחת פריט",
    globalDiscount: "הנחה",
    couponDiscount: "הנחת קופון",
    shipping: "משלוח",
    recurringLabel: "לאחר מכן",
    perWeek: "/שבוע",
    perDay: "/יום",
    perPeriod: "/תקופת חיוב",
    updatingPrice: "מעדכן מחיר...",
    requoteFailed: "לא הצלחנו לרענן את המחיר. המחיר המוצג הוא האחרון שיש לנו.",
    retry: "נסו שוב",
    priceUpdated: "המחיר השתנה. נא לבדוק את הסכום החדש ולאשר שוב.",
    selectionsHeld: "נא להמתין לעדכון המחיר לפני התשלום.",
    enterEmailToPay: "הזינו אימייל כדי שנאשר את המחיר הסופי.",
    pricingErrorFallback: "לא ניתן לחשב את המחיר של הדף. נא לרענן את הדף ולנסות שוב.",
    orderHeldHint: "הפרטים נעולים בזמן שאנו מאשרים את ההזמנה. אפשר לנסות שוב, לרענן את הדף או ליצור איתנו קשר.",
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
    payment_confirming: "Your payment is being confirmed. Please don't pay again; we'll email you a receipt shortly. If you don't hear from us within a few hours, please contact us.",
    payment_paid_not_applied: "Your payment was received and is being applied to your order. Please don't pay again; we'll email you shortly.",
    payment_begin_ambiguous: "We couldn't confirm whether your payment session started. Please try the same order again, or reload the page and check your email before paying again.",
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
    payment_confirming: "התשלום שלכם בבדיקה. נא לא לשלם שוב; נשלח קבלה במייל בקרוב. אם לא תקבלו עדכון תוך מספר שעות, אנא צרו קשר איתנו.",
    payment_paid_not_applied: "התשלום התקבל ומוחל על ההזמנה. נא לא לשלם שוב; נעדכן אתכם במייל בקרוב.",
    payment_begin_ambiguous: "לא הצלחנו לוודא אם הליך התשלום התחיל. נא לנסות שוב את אותה הזמנה, או לרענן את הדף ולבדוק את המייל לפני תשלום חוזר.",
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
  /** The route's locale; the page's own language wins when the page names one. */
  locale?: string;
}

export function PaymentPageCheckout({ paymentPage, slug, locale }: PaymentPageCheckoutProps) {
  const lang = paymentPage.language || locale || "en";
  const t = translations[lang] || translations.en;
  const isRTL = lang === "he";
  const dir = isRTL ? "rtl" : "ltr";
  const legacyCurrency = paymentPage.currency || "ILS";
  // A quote page never guesses a currency: the quote's, else the page's, else none (amounts show without a symbol).
  const quoteCurrencyOf = (q: PaymentQuote): string | null => currencyOf(paymentPage, q, "") || null;

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

  // Quote mode (payment-pages.md endpoints 9/9a): every price shown is a number the dashboard's quote carries.
  // `legacy` (the response carried no quote key) keeps the page's own totals; a coupon is then only the page's
  // pre-assigned one, because the dashboard's validate-coupon route no longer exists.
  const mode = quoteModeOf(paymentPage);
  const initialQuote = mode.kind === "quote" ? mode.quote : null;
  const quoteActive = initialQuote !== null;
  const [quote, setQuote] = useState<PaymentQuote | null>(initialQuote);
  // The tiers and add-ons the first view offered; the requote answer never carries them.
  const [catalogue] = useState<CatalogueBundle[]>(initialQuote?.catalogue ?? []);
  const [selections, setSelections] = useState<BundleSelections>(initialQuote?.selections.bundleSelections ?? {});
  const [couponInput, setCouponInput] = useState("");
  const [quoteCode, setQuoteCode] = useState("");
  const [quotePending, setQuotePending] = useState(false);
  const [requoteFailed, setRequoteFailed] = useState(false);
  const [requoteUnavailable, setRequoteUnavailable] = useState(false);
  const [priceNotice, setPriceNotice] = useState(false);
  const quotedInputRef = useRef<RequoteInput>({
    selections: initialQuote?.selections.bundleSelections ?? {},
    couponCode: "",
    email: "",
  });
  const requoterRef = useRef<ReturnType<typeof createRequoter> | null>(null);
  const lastRequoteKeyRef = useRef<string>("");
  // The choices the buyer has right now, for a requote asked from a handler or the retry control.
  const currentInputRef = useRef<RequoteInput>({ selections: {}, couponCode: "", email: "" });
  const requiresPayment = quote ? quote.total > 0 : paymentPage.total > 0;

  // Auto-apply pre-assigned coupon from payment page config (legacy pages only)
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
  } | null>(quoteActive ? null : getPreAppliedCoupon);

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
  // The order a failed /payment/begin left behind, with what it was placed for (choices, total, buyer details).
  const placedRef = useRef<{ key: string; total: number; token: string; order: any } | null>(null);
  // The order a begin failure that may have started or taken payment is holding: every later click begins THIS order
  // again, whatever the buyer edits (state mirror: the buyer's details are disabled while it is held).
  const heldRef = useRef<{ token: string; order: any } | null>(null);
  const [orderHeld, setOrderHeld] = useState(false);

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

  useEffect(() => {
    if (!quoteActive) return;
    const requoter = createRequoter({
      fetchFn: (input, init) => fetch(input, init),
      url: `${PLATFORM_URL}/api/public/payment-pages/${slug}/quote`,
      domain: new URL(SITE_URL).hostname,
      language: lang,
      onPending: () => setQuotePending(true),
      onOutcome: (outcome, input) => {
        setQuotePending(false);
        if (outcome.kind === "quote") {
          quotedInputRef.current = input;
          setQuote(outcome.quote);
          setRequoteFailed(false);
          setSelections(outcome.quote.selections.bundleSelections);
        } else if (outcome.kind === "unavailable") {
          setRequoteUnavailable(true);
        } else {
          // 429 or any failure: keep the last quote on screen with a retry control.
          setRequoteFailed(true);
        }
      },
    });
    requoterRef.current = requoter;
    // The page was served from the dashboard at some earlier moment: price it once now.
    requoter.retryNow(currentInputRef.current);
    return () => requoter.cancel();
  }, [slug, quoteActive, lang]);

  // Requote when the tier, add-ons, coupon code or a valid email change (debounced). Locked once an order exists
  // or the checkout is submitted.
  const quoteLocked = loading || ownershipToken !== null || instruction !== null;
  const quotableEmail = isQuotableEmail(email) ? email.trim() : "";
  currentInputRef.current = { selections, couponCode: quoteCode, email: quotableEmail };
  const requoteKey = JSON.stringify([selectionsKey(selections), quoteCode, quotableEmail]);
  // The "price updated" notice is about the choices the buyer had; changing any of them dismisses it.
  // The key the door's own quote_changed answer put the choices at is not a buyer change and keeps the notice.
  const noticeKeyRef = useRef<string>("");
  useEffect(() => {
    if (noticeKeyRef.current === requoteKey) return;
    setPriceNotice(false);
  }, [requoteKey]);
  useEffect(() => {
    if (!quoteActive || quoteLocked) return;
    if (!lastRequoteKeyRef.current) {
      lastRequoteKeyRef.current = requoteKey;
      return;
    }
    if (lastRequoteKeyRef.current === requoteKey) return;
    lastRequoteKeyRef.current = requoteKey;
    requoterRef.current?.schedule({ selections, couponCode: quoteCode, email: quotableEmail });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requoteKey, quoteActive, quoteLocked]);

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

  const chooseTier = (bundle: CatalogueBundle, variantId: string) => {
    setSelections((prev) => ({
      ...prev,
      [bundle.productId]: {
        selectedVariantId: variantId,
        selectedAddonProductIds: prev[bundle.productId]?.selectedAddonProductIds ?? bundle.defaultSelection.selectedAddonProductIds ?? [],
      },
    }));
  };

  const toggleAddon = (bundle: CatalogueBundle, addonId: string, on: boolean) => {
    setSelections((prev) => {
      const current = prev[bundle.productId] ?? bundle.defaultSelection;
      const ids = new Set(current.selectedAddonProductIds ?? []);
      if (on) ids.add(addonId);
      else ids.delete(addonId);
      return {
        ...prev,
        [bundle.productId]: { selectedVariantId: current.selectedVariantId ?? null, selectedAddonProductIds: Array.from(ids) },
      };
    });
  };

  const couponReasonLabel = (reason: CouponReason | undefined): string => (reason ? t[`reason_${reason}`] || t.couponRefused : "");
  const cycleSuffix = (cycle: string | null | undefined): string => {
    if (!cycle) return "";
    const known: Record<string, string> = {
      monthly: t.perMonth,
      quarterly: t.perQuarter,
      yearly: t.perYear,
      annual: t.perYear,
      weekly: t.perWeek,
      daily: t.perDay,
    };
    return known[cycle] || t.perPeriod;
  };
  const shownCurrency: string | null = quote ? quoteCurrencyOf(quote) : legacyCurrency;
  const quoteFractionDigits = quote ? quoteFractionDigitsOf(quote, catalogue) : undefined;
  const money = (amount: number, cur: string | null = shownCurrency) => formatQuoteAmount(amount, cur, lang, quoteFractionDigits);
  // Pay is held while a price is being asked for, until the email is quoted for a coupon that needs it, and while
  // the chosen tier or add-ons differ from the ones the shown quote was priced with.
  const hold = quote
    ? payHold({
        quote,
        pending: quotePending,
        failed: requoteFailed,
        selections,
        quotedInput: quotedInputRef.current,
        current: { couponCode: quoteCode, email: quotableEmail },
      })
    : null;

  // Asks the gateway-blind engine what to do for a placed order. A failure here leaves a pending order behind: the
  // quote is unlocked so the buyer can still change tier, add-ons or code, and an unchanged retry begins the SAME
  // order again (the ownership token stays valid for repeated begins) instead of creating a second one.
  const runBegin = async (order: any, token: string) => {
    setOwnershipToken(token);
    orderRef.current = order;

    // A begin that may have started a session or been paid keeps the lock and the order (beginFailureHandling): the
    // buyer can only retry the same order or reload. A thrown fetch is such a case.
    const failBegin = (code: string | null) => {
      const handling = beginFailureHandling(code, { holdingOrder: heldRef.current !== null });
      if (handling.unlock) setOwnershipToken(null);
      if (!handling.keepOrder) placedRef.current = null;
      heldRef.current = handling.unlock ? null : { token, order };
      setOrderHeld(!handling.unlock);
      setPaymentErrorCode(code ?? "network_error");
      setLoading(false);
    };

    let beginRes: Response;
    let beginBody: any;
    try {
      beginRes = await fetch(`${PLATFORM_URL}/api/public/orders/${order.id}/payment/begin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ownershipToken: token }),
      });
      beginBody = await beginRes.json().catch(() => ({}));
    } catch {
      failBegin(null);
      return;
    }

    if (!beginRes.ok) {
      failBegin(typeof beginBody?.code === "string" ? beginBody.code : null);
      return;
    }

    // A 200 body this page cannot follow may still have started a session: it keeps the lock like any unknown answer.
    const nextInstruction: BeginInstruction | null = parseBeginInstruction(beginBody);
    if (!nextInstruction) {
      failBegin(null);
      return;
    }
    heldRef.current = null;
    setOrderHeld(false);

    if (nextInstruction.kind === "none") {
      setSuccess(true);
      if (order.redirectUrl) {
        setTimeout(() => { window.location.href = order.redirectUrl; }, 2000);
      }
      setLoading(false);
      return;
    }

    // A client_instrument for a provider this buyer surface doesn't
    // know how to mount (only "sumit" is implemented today) must not
    // silently render a blank state — showCardForm below only matches
    // provider "sumit", so anything else needs its own explicit error.
    if (nextInstruction.kind === "client_instrument" && nextInstruction.provider !== "sumit") {
      failBegin("unsupported_provider");
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
      const customerData = {
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
      };
      const placedKey = JSON.stringify([requoteKey, customerData]);
      const placed = placedRef.current;
      const held = heldRef.current;
      const action = chooseOrderAction({ held: held !== null, placed, key: placedKey, total: quote ? quote.total : null });
      if (action === "reuse_held" && held) {
        await runBegin(held.order, held.token);
        return;
      }
      if (action === "reuse_placed" && placed) {
        await runBegin(placed.order, placed.token);
        return;
      }
      placedRef.current = null;
      const checkoutBody =
        quote !== null
          ? buildCheckoutBody({ domain, customerData, viewId, language: lang, quote, quotedInput: quotedInputRef.current })
          : { domain, customerData, viewId, couponCode: appliedCoupon?.code || null };
      const res = await fetch(`${PLATFORM_URL}/api/public/payment-pages/${slug}/checkout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(checkoutBody),
      });

      if (!res.ok) {
        if (quote === null) {
          const err = await res.json();
          throw new Error(err.error || "Checkout failed");
        }
        const errBody = await res.json().catch(() => ({}));
        const failure = interpretCheckoutFailure(res.status, errBody);
        if (failure.kind === "quote_changed") {
          // The door priced differently: show its quote and ask the buyer to confirm again.
          quotedInputRef.current = { ...quotedInputRef.current, selections: failure.quote.selections.bundleSelections };
          setQuote(failure.quote);
          setSelections(failure.quote.selections.bundleSelections);
          setRequoteFailed(false);
          noticeKeyRef.current = JSON.stringify([selectionsKey(failure.quote.selections.bundleSelections), quoteCode, quotableEmail]);
          setPriceNotice(true);
          setLoading(false);
          return;
        }
        if (failure.kind === "quote_required") {
          requoterRef.current?.retryNow(currentInputRef.current);
          setError(t.pricingErrorFallback);
          setLoading(false);
          return;
        }
        if (failure.kind === "coupon_refused") {
          quotedInputRef.current = { ...quotedInputRef.current, couponCode: "" };
          setQuoteCode("");
          setCouponInput("");
          setError(failure.reason ? couponReasonLabel(failure.reason) : t.couponRefused);
          setLoading(false);
          return;
        }
        throw new Error(
          failure.message ||
            (failure.code && failure.code !== "internal_error" ? t.pricingErrorFallback : "Checkout failed")
        );
      }
      setPriceNotice(false);

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

      if (quote !== null) {
        placedRef.current = { key: placedKey, total: quote.total, token, order: { ...result.order, redirectUrl: result.redirectUrl } };
      }
      await runBegin({ ...result.order, redirectUrl: result.redirectUrl }, token);
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

  if (mode.kind === "unavailable" || requoteUnavailable) {
    return (
      <Card dir={dir}>
        <CardContent className="py-12 text-center space-y-3">
          <AlertCircle className="h-10 w-10 mx-auto text-muted-foreground" />
          <h2 className="text-xl font-semibold">{t.unavailableTitle}</h2>
          <p className="text-muted-foreground">{t.unavailableBody}</p>
        </CardContent>
      </Card>
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
            {quote ? (
              <div className="space-y-4" dir={dir}>
                {paymentPage.items.map((item: any, itemIndex: number) => {
                  const imageUrl = item.product.images?.[0]?.url || item.product.images?.[0];
                  if (!imageUrl && !item.product.description) return null;
                  return (
                    <div key={`${item.product.id}-${itemIndex}`} className="flex gap-4">
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
                      </div>
                    </div>
                  );
                })}

                {catalogue.map((bundle) => {
                  const current = selections[bundle.productId] ?? bundle.defaultSelection;
                  const chosenTier = current.selectedVariantId ?? bundle.defaultSelection.selectedVariantId ?? null;
                  const chosenAddons = new Set(current.selectedAddonProductIds ?? []);
                  const tiers = bundle.lockedVariantId
                    ? []
                    : bundle.tiers.filter((tier) => tier.available).sort((a, b) => a.position - b.position);
                  if (tiers.length === 0 && bundle.addons.length === 0) return null;
                  return (
                    <fieldset key={bundle.productId} disabled={quoteLocked} className="space-y-3 rounded-lg border p-3">
                      {tiers.length > 0 && (
                        <div className="space-y-2">
                          <legend className="text-sm font-medium">{t.chooseOption}</legend>
                          {tiers.map((tier) => (
                            <label key={tier.id} className="flex items-center justify-between gap-2 text-sm cursor-pointer">
                              <span className="flex items-center gap-2">
                                <input
                                  type="radio"
                                  name={`tier-${bundle.productId}`}
                                  checked={chosenTier === tier.id}
                                  onChange={() => chooseTier(bundle, tier.id)}
                                />
                                {tier.title}
                              </span>
                              <span>
                                {money(tier.price)}
                                {cycleSuffix(tier.billingCycle)}
                              </span>
                            </label>
                          ))}
                        </div>
                      )}
                      {bundle.addons.length > 0 && (
                        <div className="space-y-2">
                          <p className="text-sm font-medium">{t.addOns}</p>
                          {bundle.addons.map((addon) => (
                            <label key={addon.id} className="flex items-center justify-between gap-2 text-sm cursor-pointer">
                              <span className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  checked={chosenAddons.has(addon.id)}
                                  onChange={(e) => toggleAddon(bundle, addon.id, e.target.checked)}
                                />
                                {addon.name}
                              </span>
                              <span>
                                {money(addon.price)}
                                {cycleSuffix(addon.billingCycle)}
                              </span>
                            </label>
                          ))}
                        </div>
                      )}
                    </fieldset>
                  );
                })}

                <Separator />

                {/* Coupon — typed here, priced by the quote (POST /quote with couponCode). */}
                <div className="space-y-2">
                  <Label htmlFor="couponCode">{t.couponCode}</Label>
                  <div className="flex gap-2">
                    <Input
                      id="couponCode"
                      value={couponInput}
                      disabled={quoteLocked}
                      onChange={(e) => setCouponInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          setQuoteCode(couponInput.trim());
                        }
                      }}
                      className="text-sm"
                      dir="ltr"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      disabled={quoteLocked}
                      onClick={() => setQuoteCode(couponInput.trim())}
                      className="shrink-0"
                    >
                      {t.applyCoupon}
                    </Button>
                  </div>
                  {quote.coupon?.status === "applied" && (
                    <p className="text-sm text-green-700">
                      {t.couponApplied}
                      {quote.coupon.code ? `: ${quote.coupon.code}` : ""}
                      {quoteCode && !quoteLocked && (
                        <button
                          type="button"
                          onClick={() => { setQuoteCode(""); setCouponInput(""); }}
                          className="text-green-600 hover:text-green-800 text-xs underline ms-2"
                        >
                          {t.remove}
                        </button>
                      )}
                    </p>
                  )}
                  {quote.coupon?.status === "pending_email" && (
                    <p className="text-sm text-muted-foreground">{t.couponPendingEmail}</p>
                  )}
                  {quote.coupon?.status === "dropped" && (
                    <p className="text-sm text-amber-600">
                      {t.couponDropped}
                      {quote.coupon.reason ? `: ${couponReasonLabel(quote.coupon.reason)}` : ""}
                    </p>
                  )}
                  {quote.coupon?.status === "refused" && (
                    <p className="text-sm text-red-600">
                      {t.couponRefused}
                      {quote.coupon.reason ? `: ${couponReasonLabel(quote.coupon.reason)}` : ""}
                    </p>
                  )}
                </div>

                <Separator />

                {/* Summary — every figure is the quote's own, so the rows add up to its total. */}
                <div className="space-y-2" dir={dir}>
                  {summaryRows(quote).map((row) => {
                    if (row.type === "line") {
                      return (
                        <div key={row.key} className="flex justify-between gap-2 text-sm">
                          <span>
                            {row.label}
                            {row.quantity && row.quantity > 1 ? ` × ${row.quantity}` : ""}
                            {cycleSuffix(row.billingCycle)}
                          </span>
                          <span>{money(row.amount)}</span>
                        </div>
                      );
                    }
                    if (row.type === "discount") {
                      return (
                        <div key={row.key} className="flex justify-between text-sm text-green-600">
                          <span>{t[row.label]}:</span>
                          <span>{money(-row.amount)}</span>
                        </div>
                      );
                    }
                    if (row.type === "shipping") {
                      return (
                        <div key={row.key} className="flex justify-between text-sm">
                          <span className="text-muted-foreground">{t.shipping}:</span>
                          <span>{money(row.amount)}</span>
                        </div>
                      );
                    }
                    if (row.type === "total") {
                      return (
                        <div key={row.key} className="space-y-2">
                          <Separator />
                          <div className="flex justify-between text-lg font-bold">
                            <span>{t.total}:</span>
                            <span>{money(row.amount)}</span>
                          </div>
                        </div>
                      );
                    }
                    return (
                      <div key={row.key} className="flex justify-between text-sm text-muted-foreground">
                        <span>
                          {t.recurringLabel}
                          {cycleSuffix(row.billingCycle)}
                        </span>
                        <span>{money(row.amount)}</span>
                      </div>
                    );
                  })}
                </div>

                {quotePending && <p className="text-xs text-muted-foreground">{t.updatingPrice}</p>}
                {requoteFailed && !quotePending && (
                  <div className="flex items-center justify-between gap-2 text-xs text-amber-700">
                    <span>{t.requoteFailed}</span>
                    <Button type="button" variant="outline" size="sm" disabled={quoteLocked} onClick={() => requoterRef.current?.retryNow(currentInputRef.current)}>
                      {t.retry}
                    </Button>
                  </div>
                )}
                {priceNotice && (
                  <div className="flex items-start gap-2 p-3 bg-amber-50 border border-amber-200 rounded-lg text-sm text-amber-900">
                    <AlertTriangle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <p>{t.priceUpdated}</p>
                  </div>
                )}
              </div>
            ) : (
              <>
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
                              {formatPrice(item.originalPrice, legacyCurrency)}
                            </span>
                            <span className="text-sm font-medium text-green-600">
                              {formatPrice(item.effectivePrice, legacyCurrency)}{getBillingLabel(item.product?.billing_cycle)}
                            </span>
                          </>
                        ) : (
                          <span className="text-sm font-medium">
                            {formatPrice(item.effectivePrice, legacyCurrency)}{getBillingLabel(item.product?.billing_cycle)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <Separator />

            {/* Coupon — the page's pre-assigned one only. The dashboard's validate-coupon route is gone, so a
                legacy page (no quote) offers no code box; a code is typed on a quote page, where it is priced by
                the quote. */}
            {appliedCoupon && (
              <div className="space-y-2">
                <div className="flex items-center justify-between rounded-md bg-green-50 border border-green-200 px-3 py-2 text-sm">
                  <span className="text-green-700">
                    {t.coupon}: <code className="font-mono font-semibold">{appliedCoupon.code}</code>
                    {" "}— -{formatPrice(appliedCoupon.discountAmount, legacyCurrency)}
                  </span>
                  <button
                    type="button"
                    onClick={() => setAppliedCoupon(null)}
                    className="text-green-600 hover:text-green-800 text-xs underline ms-2"
                  >
                    {t.remove}
                  </button>
                </div>
              </div>
            )}

            {/* Price summary */}
            <div className="space-y-2">
              {hasBothTypes ? (
                /* Split view: prominent today total with per-category breakdown */
                <>
                  <Separator />
                  <div className="flex justify-between items-baseline">
                    <span className="text-lg font-bold">{isRTL ? "סה״כ להיום" : "Total today"}:</span>
                    <span className="text-2xl font-bold">{formatPrice(effectiveTotal, legacyCurrency)}</span>
                  </div>
                  <div className={`flex gap-3 text-sm text-muted-foreground ${isRTL ? "justify-end" : ""}`}>
                    <span>{formatPrice(oneTimeAfterCoupon, legacyCurrency)} {isRTL ? "חד פעמי" : "one-time"}</span>
                    <span>·</span>
                    <span>{formatPrice(monthlyAfterCoupon, legacyCurrency)}{getBillingLabel("monthly")} {isRTL ? "מנוי" : "subscription"}</span>
                  </div>
                </>
              ) : (
                /* Single category: standard subtotal/discount/total */
                <>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{t.subtotal}:</span>
                    <span>{formatPrice(paymentPage.subtotal, legacyCurrency)}{allItemsAreSubscriptions ? getBillingLabel(paymentPage.items.find((i: any) => i.product?.billing_cycle)?.product?.billing_cycle) : ""}</span>
                  </div>
                  {paymentPage.discount > 0 && (
                    <div className="flex justify-between text-sm text-green-600">
                      <span>{t.discount}:</span>
                      <span>-{formatPrice(paymentPage.discount, legacyCurrency)}</span>
                    </div>
                  )}
                  {appliedCoupon && (
                    <div className="flex justify-between text-sm text-green-600">
                      <span>{t.coupon} ({appliedCoupon.code}):</span>
                      <span>-{formatPrice(appliedCoupon.discountAmount, legacyCurrency)}</span>
                    </div>
                  )}
                  <Separator />
                  <div className="flex justify-between text-lg font-bold">
                    <span>{t.total}:</span>
                    <span>{formatPrice(effectiveTotal, legacyCurrency)}{allItemsAreSubscriptions ? getBillingLabel(paymentPage.items.find((i: any) => i.product?.billing_cycle)?.product?.billing_cycle) : ""}</span>
                  </div>
                </>
              )}
            </div>

              </>
            )}

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

              {orderHeld && <p className="text-xs text-muted-foreground">{t.orderHeldHint}</p>}

              {/* Customer details */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="firstName">{t.firstName} *</Label>
                  <Input id="firstName" disabled={orderHeld} value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">{t.lastName} *</Label>
                  <Input id="lastName" disabled={orderHeld} value={lastName} onChange={(e) => setLastName(e.target.value)} required />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="email">{t.email} *</Label>
                  <Input id="email" disabled={orderHeld} type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">{t.phone} *</Label>
                  <Input id="phone" disabled={orderHeld} type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="company">{t.company}</Label>
                <Input id="company" disabled={orderHeld} value={company} onChange={(e) => setCompany(e.target.value)} placeholder={t.companyPlaceholder} />
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
                    <Input id="addressLine1" disabled={orderHeld} value={addressLine1} onChange={(e) => setAddressLine1(e.target.value)} placeholder={t.streetPlaceholder} />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <Label htmlFor="city">{t.city}</Label>
                      <Input id="city" disabled={orderHeld} value={city} onChange={(e) => setCity(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="postalCode">{t.postalCode}</Label>
                      <Input id="postalCode" disabled={orderHeld} value={postalCode} onChange={(e) => setPostalCode(e.target.value)} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="country">{t.country}</Label>
                    <Input id="country" disabled={orderHeld} value={country} onChange={(e) => setCountry(e.target.value)} />
                  </div>
                </div>
              )}

              {/* Continue to Payment — creates the order and asks the
                  gateway-blind payment engine what to do next. Shown only
                  before we have an instruction; once /payment/begin
                  responds this gives way to either the redirect notice or
                  the SUMIT card form below. */}
              {hold === "pending_email" && (
                <p className="text-xs text-muted-foreground">{t.enterEmailToPay}</p>
              )}
              {hold === "selections_changed" && (
                <p className="text-xs text-muted-foreground">{t.selectionsHeld}</p>
              )}

              {requiresPayment && !instruction && (
                <Button
                  type="button"
                  className="w-full bg-gold hover:bg-gold-dark text-foreground font-semibold text-base h-12"
                  onClick={handleContinue}
                  disabled={loading || hold !== null}
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
                  disabled={loading || hold !== null}
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
                      {t.pay}{" "}
                      {quote
                        ? money(Number(orderRef.current?.total ?? quote.total), orderRef.current?.currency ?? shownCurrency)
                        : <>{formatPrice(effectiveTotal, legacyCurrency)}{allItemsAreSubscriptions ? getBillingLabel(paymentPage.items.find((i: any) => i.product?.billing_cycle)?.product?.billing_cycle) : ""}</>}
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
