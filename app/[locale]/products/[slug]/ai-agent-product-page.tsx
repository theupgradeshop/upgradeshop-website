"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import * as LucideIcons from "lucide-react";
import {
  ArrowRight,
  Bot,
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
import {
  aiAgentProblemCards,
  aiAgentHowItWorksSteps,
  agentConversations,
  aiAgentIncludedFeatures,
  compatibleModules,
  maxVsAgent,
  aiAgentFAQs,
  creditPackages,
} from "@/lib/ai-agent-page-content";
import { cn } from "@/lib/utils";

function getIcon(name: string): LucideIcons.LucideIcon {
  const icon = (LucideIcons as Record<string, unknown>)[name];
  if (typeof icon === "object" && icon !== null) {
    return icon as LucideIcons.LucideIcon;
  }
  return LucideIcons.HelpCircle;
}

interface AiAgentProductPageProps {
  aiAgentProduct: Product | null;
}

export default function AiAgentProductPage({
  aiAgentProduct,
}: AiAgentProductPageProps) {
  const { getPriceDisplay } = useCurrency();
  const [contactOpen, setContactOpen] = useState(false);
  const [activeConversation, setActiveConversation] = useState(0);
  const [conversationPaused, setConversationPaused] = useState(false);
  const [faqOpenIndex, setFaqOpenIndex] = useState<number | null>(0);

  // Auto-rotate conversation tabs
  useEffect(() => {
    if (conversationPaused) return;
    const timer = setInterval(() => {
      setActiveConversation((prev) => (prev + 1) % agentConversations.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [conversationPaused]);

  const scrollToPricing = useCallback(() => {
    document
      .getElementById("ai-agent-pricing")
      ?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* ───────────────────── S1: Hero ───────────────────── */}
      <section className="relative pt-20 pb-24 md:pt-28 md:pb-32 overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gold/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-sand-dark/30 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4" />

        <Container className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-gold/10 text-gold-dark text-sm font-medium rounded-full mb-6">
              <Bot className="h-4 w-4" />
              AI Agent
            </div>

            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight mb-6">
              Your own AI agent.{" "}
              <span className="text-gold">Included from day one.</span>
            </h1>

            <p className="text-xl md:text-2xl text-foreground/70 leading-relaxed mb-4 max-w-2xl">
              Every account comes with a personal AI agent — named by you,
              built for your business. It manages your platform and serves
              your customers. No extra purchase. No setup fees.
            </p>

            <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/20 px-4 py-2 rounded-full mb-10">
              <Check className="h-4 w-4 text-gold" />
              <span className="text-sm font-medium text-gold-dark">200 credits/month included with every subscription</span>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button
                onClick={scrollToPricing}
                size="lg"
                className="px-8 py-6 text-base font-medium rounded-xl bg-gold hover:bg-gold-dark text-foreground shadow-lg shadow-gold/20 hover:shadow-xl hover:shadow-gold/30"
              >
                See Pricing
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
              Your customers are talking.{" "}
              <span className="text-gold">Is anyone listening?</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {aiAgentProblemCards.map((card, i) => {
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
              From signup to{" "}
              <span className="text-gold">fully operational.</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {aiAgentHowItWorksSteps.map((step, i) => {
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
                    <div className="absolute -top-4 left-8">
                      <span className="inline-block px-3 py-1 bg-gold text-foreground text-sm font-bold rounded-full">
                        {step.number}
                      </span>
                    </div>
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

                  {i < aiAgentHowItWorksSteps.length - 1 && (
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

      {/* ───────────────────── S4: See It In Action ───────────────────── */}
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
              See It In Action
            </div>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-normal mb-6">
              Real conversations.{" "}
              <span className="text-gold">Real results.</span>
            </h2>
            <p className="text-lg text-primary-foreground/60">
              Your AI agent handles different types of interactions depending on
              which modules you have active.
            </p>
          </motion.div>

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
              {agentConversations.map((conv, i) => (
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

            {/* Module label */}
            <div className="text-center mb-4">
              <span className="text-xs text-primary-foreground/40 uppercase tracking-wider">
                Module: {agentConversations[activeConversation].module}
              </span>
            </div>

            {/* Chat UI */}
            <div className="bg-white/5 backdrop-blur rounded-2xl p-6 md:p-8 border border-white/10">
              {/* Contact message */}
              <div className="flex justify-end mb-4">
                <div className="bg-white/10 text-primary-foreground rounded-2xl rounded-br-md px-5 py-3 max-w-[80%]">
                  <p className="text-sm">
                    {agentConversations[activeConversation].contactMessage}
                  </p>
                </div>
              </div>

              {/* Agent response */}
              <div className="flex items-start gap-3">
                <div className="h-8 w-8 rounded-full bg-gold flex items-center justify-center flex-shrink-0">
                  <Bot className="h-4 w-4 text-foreground" />
                </div>
                <div className="bg-gold/20 text-primary-foreground rounded-2xl rounded-bl-md px-5 py-3 max-w-[85%]">
                  <p className="text-sm font-medium text-gold mb-1">
                    AI Agent
                  </p>
                  <p className="text-sm text-primary-foreground/80">
                    {agentConversations[activeConversation].agentResponse}
                  </p>
                </div>
              </div>

              {/* Progress indicator */}
              <div className="flex justify-center gap-1.5 mt-6">
                {agentConversations.map((_, i) => (
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
              Not a chatbot.{" "}
              <span className="text-gold">A real partner for your customers.</span>
            </h2>
            <p className="text-lg text-foreground/70">
              Trained on your business, speaking your voice, available on every
              channel.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {aiAgentIncludedFeatures.map((feature, i) => {
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

      {/* ───────────────────── S6: Compatible Modules ───────────────────── */}
      <section className="py-24 md:py-32 bg-foreground/[0.02]">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto mb-14"
          >
            <div className="inline-block px-3 py-1 bg-gold/10 text-gold-dark text-sm font-medium rounded-full mb-6">
              Module Integration
            </div>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-normal text-foreground mb-6">
              One AI agent.{" "}
              <span className="text-gold">Every module.</span>
            </h2>
            <p className="text-lg text-foreground/70">
              Activate the AI agent on any module you subscribe to. It reads the
              data, talks to your contacts, and updates your account
              automatically.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {compatibleModules.map((mod, i) => {
              const ModIcon = getIcon(mod.icon);
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className="bg-card rounded-2xl p-6 border border-transparent hover:border-gold/20 transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-xl bg-gold/10 flex items-center justify-center flex-shrink-0">
                      <ModIcon className="h-5 w-5 text-gold" />
                    </div>
                    <div>
                      <h3 className="font-display text-base font-normal text-foreground mb-1">
                        {mod.name}
                      </h3>
                      <p className="text-foreground/60 text-sm leading-relaxed">
                        {mod.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ───────────────────── S7: Credits ───────────────────── */}
      <section
        id="ai-agent-pricing"
        className="py-24 md:py-32 bg-background scroll-mt-20"
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
              Credits
            </div>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-normal text-foreground mb-6">
              Included base credits.{" "}
              <span className="text-gold">More when you need them.</span>
            </h2>
            <p className="text-lg text-foreground/70">
              Your agent is included free. 200 credits/month covers platform management for most
              accounts. Only top up when you go customer-facing.
            </p>
          </motion.div>

          {/* Included banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="max-w-4xl mx-auto mb-12"
          >
            <div className="bg-foreground rounded-2xl p-8 md:p-10">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <div className="inline-flex items-center gap-2 bg-gold/20 px-3 py-1 rounded-full mb-4">
                    <Check className="h-3.5 w-3.5 text-gold" />
                    <span className="text-gold text-sm font-medium">Included with every subscription</span>
                  </div>
                  <h3 className="font-display text-xl font-bold text-primary-foreground mb-2">
                    Internal platform management
                  </h3>
                  <p className="text-primary-foreground/60 text-sm leading-relaxed mb-4">
                    Covered by your 200 base credits/month. More than enough for most accounts.
                  </p>
                  <ul className="space-y-2">
                    {["Update website content", "Manage CRM contacts & deals", "Create & schedule email campaigns", "Add & edit products", "Update tasks and projects"].map((item, i) => (
                      <li key={i} className="flex items-center gap-2.5 text-primary-foreground/80 text-sm">
                        <Check className="h-4 w-4 text-gold flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="inline-flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full mb-4">
                    <Sparkles className="h-3.5 w-3.5 text-primary-foreground/60" />
                    <span className="text-primary-foreground/60 text-sm font-medium">Requires paid credits</span>
                  </div>
                  <h3 className="font-display text-xl font-bold text-primary-foreground mb-2">
                    Customer-facing use
                  </h3>
                  <p className="text-primary-foreground/60 text-sm leading-relaxed mb-4">
                    When your agent talks to YOUR customers. High-value, drives revenue.
                  </p>
                  <ul className="space-y-2">
                    {["WhatsApp support & inquiry bot", "Abandoned cart recovery", "Post-purchase follow-up sequences", "Lead capture from social ads", "Order status & returns automation"].map((item, i) => (
                      <li key={i} className="flex items-center gap-2.5 text-primary-foreground/80 text-sm">
                        <ArrowRight className="h-4 w-4 text-gold flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Credit packages */}
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <p className="text-foreground/60 text-sm">
                Pay-as-you-go at <span className="font-semibold text-foreground">$0.08/credit</span> — or save with a monthly package
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {creditPackages.map((pkg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className={cn(
                    "relative rounded-2xl p-6 border transition-all",
                    pkg.highlighted
                      ? "bg-card border-gold/40 shadow-lg shadow-gold/10"
                      : "bg-card border-border hover:border-gold/20"
                  )}
                >
                  {pkg.highlighted && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 px-3 py-1 bg-gold text-foreground text-xs font-semibold rounded-full whitespace-nowrap">
                      Most Popular
                    </div>
                  )}
                  <p className="font-display text-base font-normal text-foreground mb-1">{pkg.name}</p>
                  <p className="text-foreground/50 text-sm mb-4">{pkg.credits.toLocaleString()} credits</p>
                  <div className="flex items-baseline gap-1 mb-1">
                    <span className="font-display text-3xl font-bold text-foreground">${pkg.price}</span>
                    <span className="text-foreground/50 text-sm">/mo</span>
                  </div>
                  <p className="text-xs text-foreground/40 mb-4">{pkg.pricePerCredit}/credit</p>
                  <div className="inline-flex items-center gap-1 bg-gold/10 px-2 py-1 rounded-full">
                    <span className="text-gold-dark text-xs font-medium">Save {pkg.saving} vs PAYG</span>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-center mt-10"
            >
              <Button
                onClick={() => setContactOpen(true)}
                size="lg"
                className="px-8 py-6 text-base font-medium rounded-xl bg-gold hover:bg-gold-dark text-foreground shadow-lg shadow-gold/20"
              >
                Get Started — Agent Included
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
              <p className="text-foreground/40 text-xs mt-4">
                Credit packages available once your account is active
              </p>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* ───────────────────── S8: Max vs AI Agent ───────────────────── */}
      <section className="py-24 md:py-32 bg-foreground/[0.02]">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto mb-14"
          >
            <div className="inline-block px-3 py-1 bg-gold/10 text-gold-dark text-sm font-medium rounded-full mb-6">
              How They Work Together
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-normal text-foreground mb-6">
              Two agents.{" "}
              <span className="text-gold">Two jobs.</span>
            </h2>
            <p className="text-foreground/60 text-lg">
              Max is ours. Yours is named by you.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* AI Agent card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-card rounded-2xl p-8 border-2 border-gold/30"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-xl bg-gold/10 flex items-center justify-center">
                  <Bot className="h-5 w-5 text-gold" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-normal text-foreground">
                    {maxVsAgent.agent.title}
                  </h3>
                  <p className="text-sm text-foreground/60">
                    {maxVsAgent.agent.subtitle}
                  </p>
                </div>
              </div>
              <ul className="space-y-3">
                {maxVsAgent.agent.points.map((point, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <div className="mt-0.5 h-5 w-5 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0">
                      <Check className="h-3 w-3 text-gold" />
                    </div>
                    <span className="text-foreground/70 text-sm">
                      {point}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Max card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-card rounded-2xl p-8 border border-border"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-xl bg-gold/10 flex items-center justify-center">
                  <MessageCircle className="h-5 w-5 text-gold" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-normal text-foreground">
                    {maxVsAgent.max.title}
                  </h3>
                  <p className="text-sm text-foreground/60">
                    {maxVsAgent.max.subtitle}
                  </p>
                </div>
              </div>
              <ul className="space-y-3">
                {maxVsAgent.max.points.map((point, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <div className="mt-0.5 h-5 w-5 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0">
                      <Check className="h-3 w-3 text-gold" />
                    </div>
                    <span className="text-foreground/70 text-sm">
                      {point}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-center text-foreground/60 text-lg mt-10 max-w-2xl mx-auto"
          >
            {maxVsAgent.tagline}
          </motion.p>
        </Container>
      </section>

      {/* ───────────────────── S9: FAQ ───────────────────── */}
      <section className="py-24 md:py-32 bg-background">
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
                  Everything you need to know about our AI Agent.
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
              {aiAgentFAQs.map((faq, index) => (
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

      {/* ───────────────────── S10: Final CTA ───────────────────── */}
      <section className="py-24 md:py-32 bg-foreground/[0.02]">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto"
          >
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-normal text-foreground mb-6">
              Every account starts with{" "}
              <span className="text-gold">its own agent.</span>
            </h2>

            <p className="text-lg text-foreground/60 mb-10">
              Name it, train it, extend it. No extra purchase. No technical setup.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                onClick={scrollToPricing}
                size="lg"
                className="px-8 py-6 text-base font-medium rounded-xl bg-gold hover:bg-gold-dark text-foreground shadow-lg shadow-gold/20 hover:shadow-xl hover:shadow-gold/30"
              >
                See Credit Packages
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
