"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import * as LucideIcons from "lucide-react";
import {
  ArrowRight,
  Check,
  ChevronDown,
  MessageCircle,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { ContactModal } from "@/components/modals/contact-modal";
import { useCurrency } from "@/lib/use-currency";
import { Product } from "@/lib/products";
type WebsiteVariant = { id: string; title: string; sku: string; price: number; prices: Record<string, number> | null };
import {
  problemCards,
  howItWorksSteps,
  maxConversations,
  includedFeatures,
  improvementExamples,
  audienceCards,
  websiteFAQs,
} from "@/lib/website-page-content";
import { cn } from "@/lib/utils";

function getIcon(name: string): LucideIcons.LucideIcon {
  const icon = (LucideIcons as Record<string, unknown>)[name];
  if (typeof icon === "object" && icon !== null) {
    return icon as LucideIcons.LucideIcon;
  }
  return LucideIcons.HelpCircle;
}

interface WebsiteProductPageProps {
  addonProducts: Product[];
  websiteVariants: WebsiteVariant[];
}

export default function WebsiteProductPage({
  addonProducts,
  websiteVariants,
}: WebsiteProductPageProps) {
  const { getPriceDisplay } = useCurrency();
  const [contactOpen, setContactOpen] = useState(false);
  const [activeConversation, setActiveConversation] = useState(0);
  const [conversationPaused, setConversationPaused] = useState(false);
  const [faqOpenIndex, setFaqOpenIndex] = useState<number | null>(0);

  // Auto-rotate Meet Max conversations
  useEffect(() => {
    if (conversationPaused) return;
    const timer = setInterval(() => {
      setActiveConversation((prev) => (prev + 1) % maxConversations.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [conversationPaused]);

  const scrollToPricing = useCallback(() => {
    document.getElementById("website-pricing")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  // Determine which tier to highlight as recommended
  const recommendedIndex = websiteVariants.length >= 2 ? 1 : 0;

  // Show top 6 addons by relevance (booking, courses, stores, events, blog, community)
  const featuredAddonSlugs = [
    "booking-system",
    "digital-course-platform",
    "simple-store",
    "full-ecommerce",
    "events-management",
    "blog",
  ];
  const featuredAddons = featuredAddonSlugs
    .map((slug) => addonProducts.find((p) => p.slug === slug))
    .filter(Boolean) as Product[];

  return (
    <div className="min-h-screen bg-background">
      {/* ───────────────────── S1: Hero ───────────────────── */}
      <section className="relative pt-20 pb-24 md:pt-28 md:pb-32 overflow-hidden">
        {/* Decorative blurs */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gold/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-sand-dark/30 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4" />

        <Container className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl"
          >
            <div className="inline-block px-3 py-1 bg-gold/10 text-gold-dark text-sm font-medium rounded-full mb-6">
              Fully Managed Website Service
            </div>

            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight mb-6">
              Your website is{" "}
              <span className="text-gold">handled.</span>
            </h1>

            <p className="text-xl md:text-2xl text-foreground/70 leading-relaxed mb-10 max-w-2xl">
              We build it. Max manages it. You never touch an editor.
              A professional website that keeps getting better — without the DIY
              frustration or agency budget.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button
                onClick={scrollToPricing}
                size="lg"
                className="px-8 py-6 text-base font-medium rounded-xl bg-gold hover:bg-gold-dark text-foreground shadow-lg shadow-gold/20 hover:shadow-xl hover:shadow-gold/30"
              >
                See Plans & Pricing
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
              <Button
                onClick={() => setContactOpen(true)}
                variant="outline"
                size="lg"
                className="px-8 py-6 text-base font-medium rounded-xl border-2 border-border hover:border-foreground/30"
              >
                Talk to Us
              </Button>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* ───────────────────── S2: The Problem ───────────────────── */}
      <section className="py-24 md:py-32 bg-sand/50 relative overflow-hidden">
        <Container className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <div className="inline-block px-3 py-1 bg-gold/10 text-gold-dark text-sm font-medium rounded-full mb-6">
              The Problem
            </div>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-normal text-foreground mb-6">
              Every option feels like a{" "}
              <span className="text-gold">compromise</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {problemCards.map((card, i) => {
              const Icon = getIcon(card.icon);
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="bg-card rounded-2xl p-8 border border-transparent hover:border-gold/20 transition-all"
                >
                  <div className="h-12 w-12 rounded-xl bg-gold/10 flex items-center justify-center mb-5">
                    <Icon className="h-6 w-6 text-gold" />
                  </div>
                  <h3 className="font-display text-xl font-normal text-foreground mb-3">
                    {card.title}
                  </h3>
                  <p className="text-foreground/70 leading-relaxed">
                    {card.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ───────────────────── S3: How It Works ───────────────────── */}
      <section className="py-24 md:py-32 bg-background relative overflow-hidden">
        {/* Connecting line */}
        <div className="hidden lg:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2/3 h-0.5 bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

        <Container className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <div className="inline-block px-3 py-1 bg-gold/10 text-gold-dark text-sm font-medium rounded-full mb-6">
              Simple Process
            </div>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-normal text-foreground mb-6">
              Three steps to a website that{" "}
              <span className="text-gold">works</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {howItWorksSteps.map((step, i) => {
              const StepIcon = getIcon(step.icon);
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                  className="relative"
                >
                  <div className="bg-card rounded-2xl p-8 border border-border hover:border-gold/30 hover:shadow-lg transition-all duration-300 h-full">
                    {/* Step number */}
                    <div className="absolute -top-4 left-8">
                      <span className="inline-block px-3 py-1 bg-gold text-foreground text-sm font-bold rounded-full">
                        {step.number}
                      </span>
                    </div>
                    {/* Icon */}
                    <div className="p-4 bg-sand rounded-xl w-fit mb-6 mt-2">
                      <StepIcon className="h-8 w-8 text-gold-dark" />
                    </div>
                    <h3 className="font-display text-xl font-normal text-foreground mb-3">
                      {step.title}
                    </h3>
                    <p className="text-foreground/70 leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  {/* Arrow connector */}
                  {i < howItWorksSteps.length - 1 && (
                    <div className="hidden md:block absolute top-1/2 -right-4 lg:-right-6 transform -translate-y-1/2">
                      <svg
                        className="w-8 h-8 text-gold/40"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ───────────────────── S4: Meet Max ───────────────────── */}
      <section className="py-24 md:py-32 bg-foreground text-primary-foreground relative overflow-hidden">
        <Container className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto mb-14"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-gold/20 text-gold text-sm font-medium rounded-full mb-6">
              <Sparkles className="h-4 w-4" />
              Meet Max
            </div>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-normal mb-6">
              Tell Max what you need.{" "}
              <span className="text-gold">Consider it done.</span>
            </h2>
            <p className="text-lg text-primary-foreground/60">
              Max is your dedicated partner for managing your website. No tickets,
              no waiting, no editors. Just a conversation.
            </p>
          </motion.div>

          {/* Conversation tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-2xl mx-auto"
            onMouseEnter={() => setConversationPaused(true)}
            onMouseLeave={() => setConversationPaused(false)}
          >
            {/* Tab buttons */}
            <div className="flex flex-wrap gap-2 mb-6 justify-center">
              {maxConversations.map((conv, i) => (
                <button
                  key={i}
                  onClick={() => setActiveConversation(i)}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-medium transition-all",
                    activeConversation === i
                      ? "bg-gold text-foreground"
                      : "bg-white/10 text-primary-foreground/60 hover:bg-white/20"
                  )}
                >
                  {conv.label}
                </button>
              ))}
            </div>

            {/* Chat UI */}
            <div className="bg-white/5 backdrop-blur rounded-2xl p-6 md:p-8 border border-white/10">
              {/* User message */}
              <div className="flex justify-end mb-4">
                <div className="bg-gold/20 text-primary-foreground rounded-2xl rounded-br-md px-5 py-3 max-w-[80%]">
                  <p className="text-sm">
                    {maxConversations[activeConversation].userMessage}
                  </p>
                </div>
              </div>

              {/* Max response */}
              <div className="flex items-start gap-3">
                <div className="h-8 w-8 rounded-full bg-gold flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="h-4 w-4 text-foreground" />
                </div>
                <div className="bg-white/10 text-primary-foreground rounded-2xl rounded-bl-md px-5 py-3 max-w-[85%]">
                  <p className="text-sm font-medium text-gold mb-1">Max</p>
                  <p className="text-sm text-primary-foreground/80">
                    {maxConversations[activeConversation].maxResponse}
                  </p>
                </div>
              </div>

              {/* Progress indicator */}
              <div className="flex justify-center gap-1.5 mt-6">
                {maxConversations.map((_, i) => (
                  <div
                    key={i}
                    className={cn(
                      "h-1.5 rounded-full transition-all duration-300",
                      activeConversation === i
                        ? "w-6 bg-gold"
                        : "w-1.5 bg-white/20"
                    )}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* ───────────────────── S5: What's Included ───────────────────── */}
      <section className="py-24 md:py-32 bg-background">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto mb-14"
          >
            <div className="inline-block px-3 py-1 bg-gold/10 text-gold-dark text-sm font-medium rounded-full mb-6">
              Everything Included
            </div>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-normal text-foreground mb-6">
              More than a website.{" "}
              <span className="text-gold">Complete infrastructure.</span>
            </h2>
            <p className="text-lg text-foreground/70">
              Every plan includes everything you need to run a professional web
              presence. No hidden fees, no surprise add-on costs for basics.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {includedFeatures.map((feature, i) => {
              const FeatureIcon = getIcon(feature.icon);
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className="bg-card rounded-2xl p-6 border border-transparent hover:border-gold/20 transition-all"
                >
                  <div className="h-10 w-10 rounded-xl bg-gold/10 flex items-center justify-center mb-4">
                    <FeatureIcon className="h-5 w-5 text-gold" />
                  </div>
                  <h3 className="font-display text-base font-normal text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-foreground/60 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ───────────────────── S6: Pricing Tiers ───────────────────── */}
      <section
        id="website-pricing"
        className="py-24 md:py-32 bg-foreground/[0.02] scroll-mt-20"
      >
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto mb-14"
          >
            <div className="inline-block px-3 py-1 bg-gold/10 text-gold-dark text-sm font-medium rounded-full mb-6">
              Plans & Pricing
            </div>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-normal text-foreground mb-6">
              Choose your <span className="text-gold">plan</span>
            </h2>
            <p className="text-lg text-foreground/70">
              Every plan includes custom development, Max content management,
              and our full support infrastructure.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {websiteVariants.map((variant, i) => {
              const isRecommended = i === recommendedIndex;
              const price = variant.price;
              return (
                <motion.div
                  key={variant.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className={cn(
                    "bg-card rounded-2xl p-6 border-2 transition-all relative",
                    isRecommended
                      ? "border-gold/50 shadow-lg shadow-gold/10"
                      : "border-transparent hover:border-gold/30"
                  )}
                >
                  {isRecommended && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="bg-gold text-foreground text-xs font-semibold px-3 py-1 rounded-full">
                        Recommended
                      </span>
                    </div>
                  )}
                  <h3 className="font-display text-xl font-normal mb-1">
                    {variant.title}
                  </h3>
                  <p className="text-sm text-foreground/60 mb-4">
                    {variant.sku}
                  </p>
                  {price > 0 ? (
                    <div className="flex items-baseline gap-1 mb-6">
                      <span className="text-3xl font-display font-bold">
                        {getPriceDisplay(price, variant.prices).symbol}
                        {getPriceDisplay(price, variant.prices).amount}
                      </span>
                      <span className="text-foreground/60">
                        {getPriceDisplay(price, variant.prices).periodLabel}
                      </span>
                    </div>
                  ) : (
                    <p className="text-3xl font-display font-bold mb-6">
                      Custom
                    </p>
                  )}
                  <Button
                    onClick={() => setContactOpen(true)}
                    className={cn(
                      "w-full rounded-xl",
                      isRecommended
                        ? "bg-gold hover:bg-gold-dark text-foreground shadow-lg shadow-gold/20"
                        : "bg-foreground/10 text-foreground hover:bg-foreground/20"
                    )}
                  >
                    Get Started
                  </Button>
                </motion.div>
              );
            })}

            {/* Custom tier */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: websiteVariants.length * 0.1 }}
              className="bg-card rounded-2xl p-6 border-2 border-transparent hover:border-gold/30 transition-all"
            >
              <h3 className="font-display text-xl font-normal mb-1">
                Custom
              </h3>
              <p className="text-sm text-foreground/60 mb-4">
                Complex sites, custom pricing
              </p>
              <p className="text-3xl font-display font-bold mb-6">
                Let&apos;s talk
              </p>
              <Button
                onClick={() => setContactOpen(true)}
                className="w-full rounded-xl bg-foreground/10 text-foreground hover:bg-foreground/20"
              >
                Contact Us
              </Button>
            </motion.div>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-center text-foreground/50 text-sm mt-8"
          >
            All tiers include Max content management and ongoing maintenance.
          </motion.p>
        </Container>
      </section>

      {/* ───────────────────── S7: Addon Ecosystem ───────────────────── */}
      {featuredAddons.length > 0 && (
        <section className="py-24 md:py-32 bg-background">
          <Container>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center max-w-3xl mx-auto mb-14"
            >
              <div className="inline-block px-3 py-1 bg-gold/10 text-gold-dark text-sm font-medium rounded-full mb-6">
                Addon Ecosystem
              </div>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-normal text-foreground mb-6">
                Your website grows with{" "}
                <span className="text-gold">your business</span>
              </h2>
              <p className="text-lg text-foreground/70">
                All addons are built into your website at no extra development
                cost. Just subscribe and it&apos;s live.
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {featuredAddons.map((addon, i) => (
                <motion.div
                  key={addon.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className="bg-card rounded-2xl p-6 border border-transparent hover:border-gold/20 transition-all"
                >
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="font-display text-lg font-normal text-foreground">
                      {addon.name}
                    </h3>
                    <span className="text-gold font-display font-bold whitespace-nowrap ml-3">
                      {getPriceDisplay(addon.price, addon.prices).symbol}
                      {getPriceDisplay(addon.price, addon.prices).amount}
                      <span className="text-foreground/40 text-sm font-normal">
                        {getPriceDisplay(addon.price, addon.prices).periodLabel}
                      </span>
                    </span>
                  </div>
                  <p className="text-foreground/60 text-sm mb-4 leading-relaxed">
                    {addon.shortDescription}
                  </p>
                  <Link
                    href={`/products/${addon.slug}`}
                    className="text-sm text-gold hover:text-gold-dark font-medium inline-flex items-center gap-1 transition-colors"
                  >
                    Learn more
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-center mt-8"
            >
              <Link href="/pricing">
                <Button
                  variant="outline"
                  className="rounded-xl border-2 px-6"
                >
                  View all addons
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </motion.div>
          </Container>
        </section>
      )}

      {/* ───────────────────── S8: Continuous Improvement ───────────────────── */}
      <section className="py-24 md:py-32 bg-foreground/[0.02]">
        <Container>
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-block px-3 py-1 bg-gold/10 text-gold-dark text-sm font-medium rounded-full mb-6">
                Continuous Improvement
              </div>
              <h2 className="font-display text-3xl md:text-4xl font-normal text-foreground mb-6">
                Most websites are finished the day they launch.{" "}
                <span className="text-gold">Yours is just getting started.</span>
              </h2>
              <p className="text-lg text-foreground/70 mb-6 leading-relaxed">
                As a subscriber, when you need something new — a feature, a
                section, a workflow — we build it. No quotes, no extra invoices.
                Your website evolves with your business.
              </p>
              <p className="text-foreground/50">
                Here are real features we&apos;ve built for existing subscribers:
              </p>
            </motion.div>

            <div className="space-y-4">
              {improvementExamples.map((example, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="bg-card rounded-xl p-6 border border-transparent hover:border-gold/20 transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div className="mt-0.5 h-6 w-6 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0">
                      <Check className="h-3.5 w-3.5 text-gold" />
                    </div>
                    <div>
                      <h3 className="font-display text-base font-normal text-foreground mb-1">
                        {example.title}
                      </h3>
                      <p className="text-foreground/60 text-sm leading-relaxed">
                        {example.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ───────────────────── S9: Who It's For ───────────────────── */}
      <section className="py-24 md:py-32 bg-background">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto mb-14"
          >
            <div className="inline-block px-3 py-1 bg-gold/10 text-gold-dark text-sm font-medium rounded-full mb-6">
              Who It&apos;s For
            </div>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-normal text-foreground mb-6">
              Built for businesses that{" "}
              <span className="text-gold">do the work</span>
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {audienceCards.map((card, i) => {
              const CardIcon = getIcon(card.icon);
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="bg-card rounded-2xl p-6 border border-transparent hover:border-gold/20 transition-all"
                >
                  <div className="h-10 w-10 rounded-xl bg-gold/10 flex items-center justify-center mb-4">
                    <CardIcon className="h-5 w-5 text-gold" />
                  </div>
                  <h3 className="font-display text-base font-normal text-foreground mb-2">
                    {card.title}
                  </h3>
                  <p className="text-foreground/60 text-sm leading-relaxed">
                    {card.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ───────────────────── S10: FAQ ───────────────────── */}
      <section className="py-24 md:py-32 bg-foreground/[0.02]">
        <Container>
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Left: Header (sticky) */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="sticky top-24">
                <div className="inline-block px-3 py-1 bg-gold/10 text-gold-dark text-sm font-medium rounded-full mb-6">
                  FAQ
                </div>
                <h2 className="font-display text-3xl md:text-4xl font-normal text-foreground mb-6">
                  Common questions
                </h2>
                <p className="text-lg text-foreground/70 mb-8">
                  Everything you need to know about our website service.
                </p>

                <div className="flex items-center gap-3 p-4 bg-sand rounded-xl">
                  <div className="p-2 bg-gold/20 rounded-lg">
                    <MessageCircle className="h-5 w-5 text-gold-dark" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">
                      Still have questions?
                    </p>
                    <button
                      onClick={() => setContactOpen(true)}
                      className="text-sm text-gold hover:text-gold-dark font-medium transition-colors"
                    >
                      Talk to us anytime
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right: FAQ accordion */}
            <div className="space-y-4">
              {websiteFAQs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <button
                    onClick={() =>
                      setFaqOpenIndex(faqOpenIndex === index ? null : index)
                    }
                    className="w-full text-left"
                  >
                    <div
                      className={cn(
                        "bg-card rounded-xl p-6 border transition-all duration-300",
                        faqOpenIndex === index
                          ? "border-gold/30 shadow-md"
                          : "border-border hover:border-gold/20"
                      )}
                    >
                      <div className="flex items-center justify-between gap-4">
                        <h3 className="font-display text-lg font-normal text-foreground">
                          {faq.question}
                        </h3>
                        <ChevronDown
                          className={cn(
                            "h-5 w-5 text-foreground/60 transition-transform duration-300 flex-shrink-0",
                            faqOpenIndex === index && "rotate-180"
                          )}
                        />
                      </div>

                      <div
                        className={cn(
                          "overflow-hidden transition-all duration-300",
                          faqOpenIndex === index
                            ? "max-h-96 opacity-100 mt-4"
                            : "max-h-0 opacity-0"
                        )}
                      >
                        <p className="text-foreground/70 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ───────────────────── S11: Final CTA ───────────────────── */}
      <section className="py-24 md:py-32 bg-background">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto"
          >
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-normal text-foreground mb-6">
              Ready to stop worrying about your{" "}
              <span className="text-gold">website?</span>
            </h2>

            <p className="text-lg text-foreground/60 mb-10">
              No contracts. Cancel anytime. Your content is always yours.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                onClick={scrollToPricing}
                size="lg"
                className="px-8 py-6 text-base font-medium rounded-xl bg-gold hover:bg-gold-dark text-foreground shadow-lg shadow-gold/20 hover:shadow-xl hover:shadow-gold/30"
              >
                See Plans & Pricing
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
              <Button
                onClick={() => setContactOpen(true)}
                variant="outline"
                size="lg"
                className="px-8 py-6 text-base font-medium rounded-xl border-2 border-border hover:border-foreground/30"
              >
                Talk to Us
              </Button>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Contact Modal */}
      <ContactModal
        isOpen={contactOpen}
        onClose={() => setContactOpen(false)}
      />
    </div>
  );
}
