"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Container } from "@/components/layout/container";
import { CheckoutForm } from "@/components/checkout/checkout-form";
import { useCart } from "@/lib/cart-context";
import { useCurrency } from "@/lib/use-currency";
import { ShieldCheck, Lock } from "lucide-react";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, isHydrated } = useCart();
  const { currency } = useCurrency();
  const [isProcessingOrder, setIsProcessingOrder] = useState(false);

  // Check if we're processing an order from sessionStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const processing = sessionStorage.getItem("checkout-processing");
      if (processing === "true") {
        setIsProcessingOrder(true);
      }
    }
  }, []);

  // Redirect to pricing if cart is empty (but only after hydration and not if processing order)
  useEffect(() => {
    if (isHydrated && items.length === 0 && !isProcessingOrder) {
      router.push("/pricing");
    }
  }, [items, isHydrated, isProcessingOrder, router]);

  // Show loading while hydrating or redirecting
  if (!isHydrated || items.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-foreground/60">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12 md:py-20">
      <Container>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            {currency === 'ILS' ? 'תשלום' : 'Checkout'}
          </h1>
          <p className="text-foreground/60 max-w-lg mx-auto">
            {currency === 'ILS'
              ? 'השלם את ההזמנה שלך ונתחיל להגדיר אותך מיד'
              : "Complete your order and we'll get you set up right away."}
          </p>
        </motion.div>

        {/* Checkout Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <CheckoutForm />
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16 flex flex-wrap justify-center gap-8 text-foreground/40"
        >
          <div className="flex items-center gap-2 text-sm">
            <Lock className="h-4 w-4" />
            <span>{currency === 'ILS' ? 'תשלום מאובטח' : 'Secure Checkout'}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <ShieldCheck className="h-4 w-4" />
            <span>{currency === 'ILS' ? 'ביטול בכל עת' : 'Cancel Anytime'}</span>
          </div>
        </motion.div>
      </Container>
    </div>
  );
}
