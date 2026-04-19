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
  },
};

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

  // SUMIT SDK
  const [sumitConfig, setSumitConfig] = useState<any>(null);
  const [sdkLoaded, setSdkLoaded] = useState(false);
  const [formBound, setFormBound] = useState(false);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [showPaymentFields, setShowPaymentFields] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const boundRef = useRef(false);
  // Holds order ID between submit and SUMIT callback
  const pendingOrderRef = useRef<any>(null);

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

  // Load SUMIT SDK once the user reveals the card fields
  useEffect(() => {
    if (!showPaymentFields || !requiresPayment) return;

    setPaymentLoading(true);

    const loadSumitConfig = async () => {
      try {
        const res = await fetch(`${PLATFORM_URL}/api/public/sumit-config`);
        if (!res.ok) { setError("Payment system not configured"); setPaymentLoading(false); return; }
        const config = await res.json();
        setSumitConfig(config);
      } catch {
        setError("Failed to load payment configuration");
        setPaymentLoading(false);
      }
    };

    const loadJQuery = () => {
      if (window.jQuery) { loadSumitConfig(); return; }
      const script = document.createElement("script");
      script.src = "https://code.jquery.com/jquery-3.7.1.min.js";
      script.async = true;
      script.onload = () => loadSumitConfig();
      script.onerror = () => { setError("Failed to load payment dependencies"); setPaymentLoading(false); };
      document.head.appendChild(script);
    };

    loadJQuery();
  }, [showPaymentFields, requiresPayment]);

  // Load SUMIT SDK scripts once config is ready
  useEffect(() => {
    if (!sumitConfig) return;
    if (window.OfficeGuy?.Payments) { setSdkLoaded(true); setPaymentLoading(false); return; }
    const script = document.createElement("script");
    script.src = "https://app.sumit.co.il/scripts/payments.js";
    script.async = true;
    script.onload = () => { setSdkLoaded(true); setPaymentLoading(false); };
    script.onerror = () => { setError("Failed to load payment system"); setPaymentLoading(false); };
    document.head.appendChild(script);
  }, [sumitConfig]);

  // Bind SUMIT form once SDK is loaded
  useEffect(() => {
    if (!sdkLoaded || !formRef.current || boundRef.current || !sumitConfig) return;
    if (!window.OfficeGuy?.Payments) return;

    boundRef.current = true;
    try {
      window.OfficeGuy.Payments.InitEditors("#sumit-payment-form");
      window.OfficeGuy.Payments.BindFormSubmit({
        CompanyID: sumitConfig.companyId,
        APIPublicKey: sumitConfig.apiPublicKey,
        FormSelector: "#sumit-payment-form",
        Environment: "api",
        ErrorsClass: ".og-errors",
        ResponseLanguage: lang === "he" ? "he" : "en",
        ResponseCallback: handleTokenResponse,
      });
      setFormBound(true);
    } catch (err) {
      console.error("SUMIT init error:", err);
      setError("Failed to initialize payment form");
    }
  }, [sdkLoaded, sumitConfig]);

  // SUMIT token callback — fires after jQuery form submit
  const handleTokenResponse = async (response: any) => {
    if (response.Status !== 0) {
      setError(response.UserErrorMessage || response.TechnicalErrorDetails || t.paymentError);
      setLoading(false);
      return;
    }

    const token = response.Data?.SingleUseToken;
    if (!token) {
      setError("Failed to process card. Please try again.");
      setLoading(false);
      return;
    }

    const order = pendingOrderRef.current;
    if (!order) {
      setError("Order not found. Please try again.");
      setLoading(false);
      return;
    }

    try {
      const chargeRes = await fetch(`${PLATFORM_URL}/api/public/sumit/charge`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token,
          orderId: order.id,
          orderNumber: order.orderNumber,
          amount: Number(order.total),
          currency: order.currency,
          customer: {
            name: `${firstName} ${lastName}`.trim(),
            email,
            phone,
          },
          items: paymentPage.items.map((item: any) => ({
            name: item.product.name,
            price: item.effectivePrice,
            quantity: item.quantity,
          })),
        }),
      });

      const chargeResult = await chargeRes.json();
      if (!chargeRes.ok || !chargeResult.success) {
        throw new Error(chargeResult.error || t.paymentError);
      }

      await fetch(`${PLATFORM_URL}/api/public/sumit/post-payment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId: order.id,
          paymentId: chargeResult.paymentId,
          authNumber: chargeResult.authNumber,
          documentId: chargeResult.documentId,
          documentNumber: chargeResult.documentNumber,
          documentDownloadURL: chargeResult.documentDownloadURL,
        }),
      });

      setSuccess(true);
      if (order.redirectUrl) {
        setTimeout(() => { window.location.href = order.redirectUrl; }, 2000);
      }
    } catch (err: any) {
      setError(err.message || t.paymentError);
      setLoading(false);
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

  // Main pay button handler (not a form submit — avoids nested form issues)
  const handlePayClick = async () => {
    setError(null);

    if (!firstName || !lastName || !email || !phone) {
      setError(lang === "he" ? "יש למלא את כל השדות החובה" : "Please fill in all required fields");
      return;
    }
    if (!termsAccepted) { setError(t.acceptTerms); return; }
    if (requiresPayment && (!formBound || paymentLoading)) {
      setError(lang === "he" ? "טופס התשלום עדיין נטען, נסו שוב" : "Payment form is still loading, please try again");
      return;
    }

    setLoading(true);

    try {
      // 1. Create order
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
        // Free order — done immediately
        setSuccess(true);
        if (result.redirectUrl) {
          setTimeout(() => { window.location.href = result.redirectUrl; }, 2000);
        }
        setLoading(false);
        return;
      }

      // 2. Store order for SUMIT callback, then trigger card tokenization
      pendingOrderRef.current = { ...result.order, redirectUrl: result.redirectUrl };

      if (!window.jQuery || !formRef.current) {
        throw new Error("Payment form not ready. Please refresh the page.");
      }
      // SUMIT intercepts this submit, tokenizes the card, then calls handleTokenResponse
      window.jQuery(formRef.current).trigger("submit");

      // Safety timeout — handleTokenResponse or an error must clear loading
      setTimeout(() => {
        setLoading((cur) => {
          if (cur) setError("Payment timed out. Please try again.");
          return false;
        });
      }, 30000);
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  const websiteUrl = typeof window !== "undefined"
    ? `${window.location.protocol}//${window.location.host}`
    : SITE_URL;

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
                /* Split view: separate monthly and one-time lines */
                <>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{isRTL ? "חודשי" : "Monthly"}:</span>
                    <span>{formatPrice(monthlyEffectiveTotal, currency)}{getBillingLabel("monthly")}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{isRTL ? "חד פעמי" : "One-time"}:</span>
                    <span>{formatPrice(oneTimeEffectiveTotal, currency)}</span>
                  </div>
                  {appliedCoupon && (
                    <div className="flex justify-between text-sm text-green-600">
                      <span>{t.coupon} ({appliedCoupon.code}):</span>
                      <span>-{formatPrice(appliedCoupon.discountAmount, currency)}</span>
                    </div>
                  )}
                  <Separator />
                  <div className="flex justify-between text-lg font-bold">
                    <span>{isRTL ? "סה״כ להיום" : "Total today"}:</span>
                    <span>{formatPrice(effectiveTotal, currency)}</span>
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
              {error && (
                <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-800">
                  <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <p>{error}</p>
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

              {/* SUMIT card fields — revealed after details are filled */}
              {requiresPayment && !showPaymentFields && (
                <Button
                  type="button"
                  className="w-full bg-gold hover:bg-gold-dark text-foreground font-semibold text-base h-12"
                  onClick={() => {
                    if (!firstName || !lastName || !email || !phone) {
                      setError(lang === "he" ? "יש למלא את כל השדות החובה" : "Please fill in all required fields");
                      return;
                    }
                    setError(null);
                    setShowPaymentFields(true);
                  }}
                >
                  {lang === "he" ? "המשך לתשלום" : "Continue to Payment"}
                </Button>
              )}

              {requiresPayment && showPaymentFields && (
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
                      <div className={`grid gap-3 ${(sumitConfig?.showCVV ?? true) ? 'grid-cols-3' : 'grid-cols-2'}`}>
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
                        {(sumitConfig?.showCVV ?? true) && (
                          <div className="space-y-1">
                            <Label>{t.cvv}</Label>
                            <input
                              type="text"
                              data-og="cvv"
                              placeholder="123"
                              maxLength={4}
                              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                              required={sumitConfig?.requireCVV ?? false}
                              autoComplete="cc-csc"
                              dir="ltr"
                            />
                          </div>
                        )}
                      </div>

                      {/* ID Number — controlled by showCitizenID setting */}
                      {(sumitConfig?.showCitizenID ?? false) && (
                        <div className="space-y-1">
                          <Label>{t.idNumber}</Label>
                          <input
                            type="text"
                            data-og="citizenid"
                            maxLength={9}
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                            required={sumitConfig?.requireCitizenID ?? false}
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

              {/* Submit — only shown for free orders or after card fields are revealed */}
              {(!requiresPayment || showPaymentFields) && <Button
                type="button"
                onClick={handlePayClick}
                className="w-full bg-gold hover:bg-gold-dark text-foreground font-semibold text-base h-12"
                disabled={loading || (requiresPayment && showPaymentFields && (!formBound || paymentLoading))}
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 me-2 animate-spin" />
                    {requiresPayment ? t.processingPayment : t.processing}
                  </>
                ) : requiresPayment ? (
                  <>
                    <Lock className="h-4 w-4 me-2" />
                    {t.pay} {formatPrice(effectiveTotal, currency)}{allItemsAreSubscriptions ? getBillingLabel(paymentPage.items.find((i: any) => i.product?.billing_cycle)?.product?.billing_cycle) : ""}
                  </>
                ) : (
                  t.placeOrder
                )}
              </Button>}

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
