"use client";

import { useState, useEffect } from "react";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  User,
  MapPin,
  FileCheck,
  CreditCard,
  ArrowRight,
  ArrowLeft,
  Loader2,
  Check,
} from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { useCurrency } from "@/lib/use-currency";
import { SumitPayment } from "@/components/checkout/sumit-payment";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

// Form schema
const checkoutSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(6, "Phone number is required"),
  company: z.string().optional(),
  country: z.string().min(1, "Country is required"),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

// Countries list
const countries = [
  { code: "US", name: "United States" },
  { code: "IL", name: "Israel" },
  { code: "GB", name: "United Kingdom" },
  { code: "CA", name: "Canada" },
  { code: "AU", name: "Australia" },
  { code: "DE", name: "Germany" },
  { code: "FR", name: "France" },
  { code: "ES", name: "Spain" },
  { code: "IT", name: "Italy" },
  { code: "NL", name: "Netherlands" },
  { code: "BR", name: "Brazil" },
  { code: "MX", name: "Mexico" },
  { code: "IN", name: "India" },
  { code: "JP", name: "Japan" },
  { code: "SG", name: "Singapore" },
  { code: "AE", name: "United Arab Emirates" },
  { code: "ZA", name: "South Africa" },
  { code: "OTHER", name: "Other" },
];

// Steps
const steps = [
  { id: "contact", label: "Contact", icon: User },
  { id: "location", label: "Location", icon: MapPin },
  { id: "review", label: "Review", icon: FileCheck },
  { id: "payment", label: "Payment", icon: CreditCard },
];

export function CheckoutForm() {
  const router = useRouter();
  const locale = useLocale();
  const { items, total, clearCart } = useCart();
  const { getPriceDisplay, currency } = useCurrency();
  const [currentStep, setCurrentStep] = useState(0);

  // Calculate total in the correct currency
  const displayTotal = items.reduce((sum, item) => {
    const { amount } = getPriceDisplay(item.product.price, item.product.prices);
    return sum + (amount * item.quantity);
  }, 0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [orderNumber, setOrderNumber] = useState<string | null>(null);
  const [hasSubscriptions, setHasSubscriptions] = useState(false);
  const [sumitConfig, setSumitConfig] = useState<{
    companyId: number;
    apiPublicKey: string;
    isTest: boolean;
    showCVV?: boolean;
    requireCVV?: boolean;
    showCitizenID?: boolean;
    requireCitizenID?: boolean;
  } | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);

  const form = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      company: "",
      country: "",
    },
  });

  // Load saved form data from localStorage on mount
  useEffect(() => {
    try {
      const savedData = localStorage.getItem("checkout-form-data");
      const savedStep = localStorage.getItem("checkout-current-step");

      if (savedData) {
        const parsed = JSON.parse(savedData);
        form.reset(parsed);
      }

      if (savedStep) {
        const step = parseInt(savedStep, 10);
        // Cap at step 2 (review) - payment step requires order creation
        // which is not persisted in localStorage
        setCurrentStep(Math.min(step, 2));
      }
    } catch (error) {
      console.error("[Checkout] Failed to load saved data:", error);
    }
    setIsHydrated(true);
  }, [form]);

  // Save form data to localStorage whenever it changes
  useEffect(() => {
    if (!isHydrated) return;

    const subscription = form.watch((value) => {
      try {
        localStorage.setItem("checkout-form-data", JSON.stringify(value));
      } catch (error) {
        console.error("[Checkout] Failed to save form data:", error);
      }
    });

    return () => subscription.unsubscribe();
  }, [form, isHydrated]);

  // Save current step to localStorage
  useEffect(() => {
    if (!isHydrated) return;
    localStorage.setItem("checkout-current-step", String(currentStep));
  }, [currentStep, isHydrated]);

  // Clear saved data when order is created successfully
  const clearSavedCheckoutData = () => {
    localStorage.removeItem("checkout-form-data");
    localStorage.removeItem("checkout-current-step");
  };

  const goToNextStep = async () => {
    // Validate current step fields
    let fieldsToValidate: (keyof CheckoutFormData)[] = [];

    if (currentStep === 0) {
      fieldsToValidate = ["firstName", "lastName", "email", "phone"];
    } else if (currentStep === 1) {
      fieldsToValidate = ["country"];
    }

    const isValid = await form.trigger(fieldsToValidate);
    if (isValid) {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
    }
  };

  const goToPreviousStep = () => {
    console.log("[Checkout] goToPreviousStep called from step", currentStep);
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const onSubmit = async (data: CheckoutFormData) => {
    console.log("[Checkout] onSubmit called, currentStep:", currentStep);

    // Only create order on step 2 (review step)
    // For earlier steps, prevent submission (user should use Continue button)
    if (currentStep !== 2) {
      console.log("[Checkout] Form submitted on step", currentStep, "- ignoring (must be on step 2)");
      return;
    }

    console.log("[Checkout] Processing order on review step");
    setIsSubmitting(true);
    setError(null);

    try {
      // Step 1: Create order
      const orderResponse = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          buyer: {
            email: data.email,
            first_name: data.firstName,
            last_name: data.lastName,
            phone: data.phone,
            company: data.company || undefined,
            country: data.country,
          },
          items: items.map((item) => {
            const { amount } = getPriceDisplay(item.product.price, item.product.prices);
            return {
              product_id: item.product.id,
              quantity: 1,
              display_price: amount,
            };
          }),
          currency,
          display_total: displayTotal,
          language: locale,
        }),
      });

      const orderResult = await orderResponse.json();

      if (!orderResponse.ok || !orderResult.success) {
        throw new Error(orderResult.error || "Failed to create order");
      }

      console.log("[Checkout] Order created:", orderResult.order_id);
      console.log("[Checkout] Has subscriptions:", orderResult.hasSubscriptions);

      // Store subscription flag
      setHasSubscriptions(orderResult.hasSubscriptions || false);

      // Mark that we're processing an order to prevent redirect
      if (typeof window !== "undefined") {
        sessionStorage.setItem("checkout-processing", "true");
      }

      // Step 2: Fetch SUMIT configuration
      const configResponse = await fetch("/api/sumit-config");
      const configResult = await configResponse.json();

      if (!configResponse.ok || !configResult.enabled) {
        const errorMsg = configResult.error || "Payment system not available";
        console.warn("[Checkout] SUMIT not configured:", errorMsg);

        // For now, show error but allow order to be created
        setError(`Payment gateway not configured: ${errorMsg}. Your order has been created and we'll send you a payment link.`);
        setIsSubmitting(false);

        // Store order info for display
        setOrderId(orderResult.order_id);
        setOrderNumber(orderResult.order_number);

        // Instead of throwing, redirect to success page without payment
        setTimeout(() => {
          clearCart();
          clearSavedCheckoutData();
          // Clear the processing flag
          if (typeof window !== "undefined") {
            sessionStorage.removeItem("checkout-processing");
          }
          router.push(`/checkout/success?orderId=${orderResult.order_id}&orderNumber=${orderResult.order_number}&pendingPayment=true`);
        }, 3000);
        return;
      }

      console.log("[Checkout] SUMIT config loaded");

      // Step 3: Save order info and move to payment step
      setOrderId(orderResult.order_id);
      setOrderNumber(orderResult.order_number);
      setSumitConfig({
        companyId: configResult.companyId,
        apiPublicKey: configResult.apiPublicKey,
        isTest: configResult.isTest || false,
      });

      setCurrentStep(3); // Move to payment step
      setIsSubmitting(false);
    } catch (err) {
      console.error("Checkout error:", err);
      setError(err instanceof Error ? err.message : "Something went wrong");
      setIsSubmitting(false);
      // Clear the processing flag on error
      if (typeof window !== "undefined") {
        sessionStorage.removeItem("checkout-processing");
      }
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress Steps */}
      <div className="mb-12">
        <div className="flex items-center justify-center">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = index === currentStep;
            const isCompleted = index < currentStep;
            // Allow clicking on completed steps or current step (but not future steps)
            // Don't allow clicking TO payment step from earlier (must go through review first)
            const isClickable = (isCompleted || isActive) && index !== 3;

            return (
              <div key={step.id} className="flex items-center">
                {/* Step Circle */}
                <button
                  type="button"
                  onClick={() => {
                    if (isClickable) {
                      console.log("[Checkout] Step indicator clicked:", index, "from step", currentStep);
                      setCurrentStep(index);
                    }
                  }}
                  disabled={!isClickable}
                  className={`
                    flex items-center justify-center w-10 h-10 rounded-full
                    transition-all duration-300
                    ${isActive
                      ? "bg-gold text-foreground"
                      : isCompleted
                        ? "bg-foreground text-primary-foreground"
                        : "bg-foreground/10 text-foreground/40"
                    }
                    ${isClickable ? "cursor-pointer hover:scale-110" : "cursor-default"}
                  `}
                >
                  {isCompleted ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    <Icon className="h-5 w-5" />
                  )}
                </button>

                {/* Step Label */}
                <span
                  onClick={() => {
                    if (isClickable) {
                      console.log("[Checkout] Step label clicked:", index, "from step", currentStep);
                      setCurrentStep(index);
                    }
                  }}
                  className={`
                    ml-2 font-medium hidden sm:block
                    ${isActive ? "text-foreground" : "text-foreground/40"}
                    ${isClickable ? "cursor-pointer hover:text-foreground" : ""}
                  `}
                >
                  {step.label}
                </span>

                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div
                    className={`
                      w-12 sm:w-24 h-0.5 mx-4
                      ${isCompleted ? "bg-foreground" : "bg-foreground/10"}
                    `}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Form - Only for steps 0-2 (not payment step which has its own form) */}
      {currentStep < 3 && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            onKeyDown={(e) => {
              // Prevent Enter key from submitting form on ALL steps
              // User must explicitly click "Confirm Order" button on review step
              if (e.key === 'Enter') {
                e.preventDefault();
              }
            }}
          >
            <AnimatePresence mode="wait">
              {/* Step 1: Contact Info */}
              {currentStep === 0 && (
              <motion.div
                key="contact"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="text-center mb-8">
                  <h2 className="font-display text-2xl font-bold text-foreground mb-2">
                    Contact Information
                  </h2>
                  <p className="text-foreground/60">
                    How can we reach you?
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="john@example.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input
                          type="tel"
                          placeholder="+1 234 567 8900"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="company"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="Acme Inc" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </motion.div>
            )}

            {/* Step 2: Location */}
            {currentStep === 1 && (
              <motion.div
                key="location"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="text-center mb-8">
                  <h2 className="font-display text-2xl font-bold text-foreground mb-2">
                    Your Location
                  </h2>
                  <p className="text-foreground/60">
                    This helps us set up the right payment options for you.
                  </p>
                </div>

                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Country</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your country" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {countries.map((country) => (
                            <SelectItem key={country.code} value={country.code}>
                              {country.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="bg-card rounded-xl p-4 mt-6">
                  <p className="text-foreground/60 text-sm">
                    <strong className="text-foreground">Note:</strong> Your
                    location helps us set up the correct currency and tax settings
                    for your account.
                  </p>
                </div>
              </motion.div>
            )}

            {/* Step 3: Review */}
            {currentStep === 2 && (
              <motion.div
                key="review"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="text-center mb-8">
                  <h2 className="font-display text-2xl font-bold text-foreground mb-2">
                    {currency === 'ILS' ? 'סקור את ההזמנה שלך' : 'Review Your Order'}
                  </h2>
                  <p className="text-foreground/60">
                    {currency === 'ILS' ? 'כמעט שם! אנא בדוק את הפרטים שלך' : 'Almost there! Please review your details.'}
                  </p>
                </div>

                {/* Contact Summary */}
                <div className="bg-card rounded-xl p-6">
                  <h3 className="font-display font-normal text-foreground mb-4">
                    {currency === 'ILS' ? 'פרטי יצירת קשר' : 'Contact Details'}
                  </h3>
                  <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                    <div>
                      <dt className="text-foreground/60">Name</dt>
                      <dd className="text-foreground font-medium">
                        {form.watch("firstName")} {form.watch("lastName")}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-foreground/60">Email</dt>
                      <dd className="text-foreground font-medium">
                        {form.watch("email")}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-foreground/60">Phone</dt>
                      <dd className="text-foreground font-medium">
                        {form.watch("phone")}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-foreground/60">Country</dt>
                      <dd className="text-foreground font-medium">
                        {countries.find((c) => c.code === form.watch("country"))
                          ?.name || form.watch("country")}
                      </dd>
                    </div>
                    {form.watch("company") && (
                      <div className="sm:col-span-2">
                        <dt className="text-foreground/60">Company</dt>
                        <dd className="text-foreground font-medium">
                          {form.watch("company")}
                        </dd>
                      </div>
                    )}
                  </dl>
                </div>

                {/* Order Summary */}
                <div className="bg-card rounded-xl p-6">
                  <h3 className="font-display font-normal text-foreground mb-4">
                    {currency === 'ILS' ? 'סיכום הזמנה' : 'Order Summary'}
                  </h3>
                  <ul className="space-y-3 mb-4">
                    {items.map((item) => (
                      <li
                        key={item.product.id}
                        className="flex justify-between text-sm"
                      >
                        <span className="text-foreground">
                          {item.product.name}
                        </span>
                        <span className="text-foreground font-medium">
                          {getPriceDisplay(item.product.price, item.product.prices).fullPrice}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <div className="border-t border-foreground/10 pt-4 flex justify-between">
                    <span className="font-display font-normal text-foreground">
                      {currency === 'ILS' ? 'סכום חודשי' : 'Monthly Total'}
                    </span>
                    <span className="font-display text-xl font-bold text-gold">
                      {currency === 'ILS' ? `₪${displayTotal}/חודש` : `$${displayTotal}/mo`}
                    </span>
                  </div>
                </div>

                {/* Error message */}
                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-600 text-sm">
                    {error}
                  </div>
                )}
              </motion.div>
            )}
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-6 border-t border-foreground/10">
            {currentStep > 0 ? (
              <Button
                type="button"
                variant="ghost"
                onClick={goToPreviousStep}
                className="text-foreground"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            ) : (
              <div />
            )}

            {currentStep < 2 && (
              <Button
                type="button"
                onClick={goToNextStep}
                className="bg-gold hover:bg-gold-dark text-foreground"
              >
                Continue
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            )}

            {currentStep === 2 && (
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-gold hover:bg-gold-dark text-foreground min-w-[180px]"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    Confirm Order
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </>
                )}
              </Button>
            )}
            </div>
          </form>
        </Form>
      )}

      {/* Step 4: Payment - Outside main form to avoid nested forms */}
      {currentStep === 3 && orderId && sumitConfig && (
        <div onKeyDown={(e) => {
          // Prevent Enter from navigating away
          if (e.key === 'Enter' && e.target instanceof HTMLInputElement) {
            e.preventDefault();
          }
        }}>
          <motion.div
            key="payment"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <h2 className="font-display text-2xl font-bold text-foreground mb-2">
                Secure Payment
              </h2>
              <p className="text-foreground/60">
                Complete your purchase
              </p>
            </div>

            <SumitPayment
              companyId={sumitConfig.companyId}
              apiPublicKey={sumitConfig.apiPublicKey}
              orderId={orderId}
              orderNumber={orderNumber!}
              isSubscription={hasSubscriptions}
              customer={{
                name: `${form.watch("firstName")} ${form.watch("lastName")}`,
                email: form.watch("email"),
                phone: form.watch("phone"),
              }}
              items={items.map(item => {
                const { amount } = getPriceDisplay(item.product.price, item.product.prices);
                return {
                  name: item.product.name,
                  price: amount,
                  quantity: 1,
                };
              })}
              total={displayTotal}
              currency={currency}
              country={form.watch("country")}
              onSuccess={(response) => {
                console.log("[Checkout] Payment successful:", response);
                // Navigate FIRST, then clear cart - otherwise the empty cart
                // triggers the checkout page's redirect to /pricing
                router.push(`/checkout/success?orderId=${orderId}&orderNumber=${orderNumber}`);
                // Clear after navigation is initiated
                setTimeout(() => {
                  clearCart();
                  clearSavedCheckoutData();
                  if (typeof window !== "undefined") {
                    sessionStorage.removeItem("checkout-processing");
                  }
                }, 500);
              }}
              onCancel={() => {
                setError("Payment was cancelled. Please try again.");
              }}
              onError={(error) => {
                setError(error);
              }}
              isTest={sumitConfig.isTest}
              showCVV={sumitConfig.showCVV ?? true}
              requireCVV={sumitConfig.requireCVV ?? false}
              showCitizenID={sumitConfig.showCitizenID ?? false}
              requireCitizenID={sumitConfig.requireCitizenID ?? false}
            />
          </motion.div>

          {/* Back button for payment step */}
          <div className="flex justify-between mt-8 pt-6 border-t border-foreground/10">
            <Button
              type="button"
              variant="ghost"
              onClick={goToPreviousStep}
              className="text-foreground"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <div />
          </div>
        </div>
      )}
    </div>
  );
}
