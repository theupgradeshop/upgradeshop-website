"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/layout/container";
import { ProductCard } from "@/components/pricing/product-card";
import { Product, websiteAddons as staticWebsiteAddons, aiActionsPlans, subscriptionTiers } from "@/lib/products";
import { useCurrency } from "@/lib/use-currency";
import { Check, HelpCircle, ArrowRight, Globe, Zap, Bot, ChevronDown, LayoutGrid, Rocket, Wrench, ShoppingBag, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart-context";
import Link from "next/link";

interface PricingClientProps {
  modules: Product[];
  websiteAddons: Product[];
  bundle: Product;
  services: Product[];
  exchangeRates?: Record<string, number>;
}

const navItems = [
  { id: "plans", label: "Plans", icon: Layers },
  { id: "website", label: "Website", icon: Globe },
  { id: "modules", label: "Add-ons", icon: LayoutGrid },
  { id: "ai-agent", label: "AI Agent", icon: Bot },
  { id: "setup", label: "Get Set Up", icon: Rocket },
];

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function PricingClient({ modules, websiteAddons, bundle, services, exchangeRates }: PricingClientProps) {
  const { getPriceDisplay, currency } = useCurrency(exchangeRates);
  const { addItem, isInCart, openCart } = useCart();
  const [showWebsiteAddons, setShowWebsiteAddons] = useState(false);

  const founderLaunch = services.find(s => s.slug === "founder-launch");

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="pt-20 md:pt-28 pb-10 md:pb-14">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/20 px-4 py-2 rounded-full mb-6">
              <span className="text-sm font-medium text-gold">
                {currency === 'USD' ? 'Prices in US Dollars' : 'מחירים בשקלים'}
              </span>
            </div>

            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Two Plans. Everything Handled.
            </h1>
            <p className="text-xl text-foreground/70 leading-relaxed">
              Start from <span className="text-foreground font-semibold">$170/mo</span> — AI-built website, CRM, email marketing, automations, and your own personal AI agent included. Add modules as you grow.
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Anchor Navigation */}
      <section className="pb-12 md:pb-16">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-3"
          >
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="group inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-foreground/[0.04] border border-foreground/10 hover:border-gold/40 hover:bg-gold/5 transition-all duration-200"
                >
                  <Icon className="h-4 w-4 text-foreground/50 group-hover:text-gold transition-colors" />
                  <span className="text-sm font-medium text-foreground/70 group-hover:text-foreground transition-colors">
                    {item.label}
                  </span>
                </button>
              );
            })}
          </motion.div>
        </Container>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          SUBSCRIPTION PLANS
       ═══════════════════════════════════════════════════════════════════════ */}
      <section id="plans" className="pb-16 md:pb-24 scroll-mt-8">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-center mb-10"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">Choose Your Plan</h2>
            <p className="text-foreground/60 max-w-xl mx-auto">Both plans include your AI-built website, CRM, email marketing, automations, and personal AI agent. The only difference is whether the store module is included.</p>
          </motion.div>

          <p className="text-center text-sm text-foreground/50 mb-8 -mt-4">
            Need an online store with products, inventory, and checkout? → Ecommerce. Everything else? → Starter.
          </p>

          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {subscriptionTiers.map((tier, index) => (
              <motion.div
                key={tier.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                className={`relative rounded-2xl p-8 border-2 transition-all ${
                  tier.highlight
                    ? "border-gold/50 bg-gold/5"
                    : "border-foreground/10 bg-card"
                }`}
              >
                {tier.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-gold text-foreground text-xs font-bold rounded-full whitespace-nowrap">
                    {tier.badge}
                  </div>
                )}
                <h3 className="font-display text-2xl font-bold text-foreground mb-1">{tier.name}</h3>
                <p className="text-foreground/50 text-sm mb-5">{tier.tagline}</p>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-bold text-foreground">${tier.price}</span>
                  <span className="text-foreground/50">/mo</span>
                </div>
                <ul className="space-y-2.5 mb-6">
                  {tier.includes.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <Check className={`h-4 w-4 flex-shrink-0 mt-0.5 ${tier.highlight ? "text-gold" : "text-gold"}`} />
                      <span className="text-sm text-foreground/80">{item}</span>
                    </li>
                  ))}
                </ul>
                {tier.extrasLabel && (
                  <p className="text-xs text-foreground/40 border-t border-foreground/10 pt-4">{tier.extrasLabel}</p>
                )}
                <Button
                  className={`w-full mt-4 font-medium ${
                    tier.highlight
                      ? "bg-gold hover:bg-gold-dark text-foreground"
                      : "bg-foreground text-primary-foreground hover:bg-foreground/90"
                  }`}
                  onClick={() => scrollToSection("setup")}
                >
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-center text-sm text-foreground/40 mt-6"
          >
            Additional modules available as add-ons — pay only for what your business actually needs.
          </motion.p>
        </Container>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          WEBSITE — Two Tracks
       ═══════════════════════════════════════════════════════════════════════ */}
      <section id="website" className="pb-16 md:pb-24 scroll-mt-8">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-gradient-to-br from-foreground to-foreground/90 rounded-3xl overflow-hidden relative"
          >
            <div className="absolute top-0 right-0 w-96 h-96 bg-gold/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-72 h-72 bg-gold/5 rounded-full blur-2xl" />

            <div className="relative p-8 md:p-12 lg:p-16">
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 bg-gold/20 px-4 py-2 rounded-full mb-6">
                  <Globe className="h-4 w-4 text-gold" />
                  <span className="text-sm font-medium text-gold">Your Website</span>
                </div>
                <h2 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
                  Two Ways to Get Online
                </h2>
                <p className="text-primary-foreground/70 leading-relaxed max-w-2xl mx-auto">
                  Start with an AI-built site included with any subscription — or invest in a custom developer-built website. Both are managed by your AI agent ongoing.
                </p>
              </div>

              {/* Two Track Cards */}
              <div className="grid md:grid-cols-2 gap-6 mb-12">
                {/* AI-Built */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="relative bg-white/5 backdrop-blur rounded-xl p-8 border border-gold/30"
                >
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-gold text-foreground text-xs font-bold rounded-full whitespace-nowrap">
                    Included with any subscription
                  </div>
                  <h3 className="font-display text-xl font-bold text-primary-foreground mb-1">AI-Built Website</h3>
                  <p className="text-gold text-sm font-medium mb-6">Fast, professional, included</p>

                  <div className="space-y-5">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-primary-foreground/40 mb-3">For services & local businesses</p>
                      <ul className="space-y-2">
                        {["Home, About, Contact, Services pages", "Blog — AI writes & publishes", "Forms auto-connected to CRM", "Payment gateway included", "Human review before going live (72hr)"].map((f, i) => (
                          <li key={i} className="flex items-start gap-2.5">
                            <Check className="h-3.5 w-3.5 text-gold flex-shrink-0 mt-0.5" />
                            <span className="text-primary-foreground/75 text-sm">{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="border-t border-white/10 pt-5">
                      <p className="text-xs font-bold uppercase tracking-wider text-gold mb-3">For e-commerce</p>
                      <ul className="space-y-2">
                        {["Everything above", "Product pages, shop & collections", "Cart & checkout flow", "Abandoned cart recovery", "Activate the Store module to enable"].map((f, i) => (
                          <li key={i} className="flex items-start gap-2.5">
                            <Check className="h-3.5 w-3.5 text-gold flex-shrink-0 mt-0.5" />
                            <span className="text-primary-foreground/75 text-sm">{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>

                {/* Professional Build */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="bg-white/5 backdrop-blur rounded-xl p-8 border border-white/10"
                >
                  <h3 className="font-display text-xl font-bold text-primary-foreground mb-1">Professional Developer Build</h3>
                  <p className="text-primary-foreground/50 text-sm font-medium mb-6">Custom branded, database-connected — one-time service</p>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center justify-between bg-white/5 rounded-lg px-4 py-3">
                      <span className="text-sm text-primary-foreground/70">Marketing website</span>
                      <span className="font-bold text-primary-foreground">$1,700</span>
                    </div>
                    <div className="flex items-center justify-between bg-gold/10 border border-gold/20 rounded-lg px-4 py-3">
                      <div>
                        <span className="text-sm text-primary-foreground/70">E-commerce website</span>
                        <p className="text-xs text-gold mt-0.5">Includes Shopify / WooCommerce migration</p>
                      </div>
                      <span className="font-bold text-primary-foreground">$2,600</span>
                    </div>
                  </div>

                  <ul className="space-y-2 mb-5">
                    {["Custom branded design by a developer", "Brand-specific section template library", "Every section database-connected", "Unlimited pages via template system", "AI agent manages ongoing updates", "Developer access via ticket system"].map((f, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <Check className="h-3.5 w-3.5 text-gold flex-shrink-0 mt-0.5" />
                        <span className="text-primary-foreground/80 text-sm">{f}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="text-xs text-primary-foreground/30">Large catalogs or complex migrations may require a custom quote.</p>
                </motion.div>
              </div>

              {/* Website Addons Toggle */}
              {websiteAddons.length > 0 && (
                <div className="text-center">
                  <Button
                    size="lg"
                    className="bg-gold hover:bg-gold-dark text-foreground font-medium"
                    onClick={() => setShowWebsiteAddons(!showWebsiteAddons)}
                  >
                    Website Add-ons ({websiteAddons.length})
                    <ChevronDown className={`h-4 w-4 ml-2 transition-transform duration-300 ${showWebsiteAddons ? "rotate-180" : ""}`} />
                  </Button>
                </div>
              )}

              <AnimatePresence>
                {showWebsiteAddons && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="overflow-hidden"
                  >
                    <div className="pt-10">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {websiteAddons.map((addon) => (
                          <div key={addon.id} className="bg-white/5 rounded-xl p-6 border border-white/10 hover:border-gold/30 transition-all">
                            <h4 className="font-display text-lg font-normal text-primary-foreground mb-2">{addon.name}</h4>
                            <p className="text-primary-foreground/50 text-sm mb-4">{addon.shortDescription}</p>
                            <div className="flex items-baseline gap-1 mb-4">
                              <span className="text-2xl font-bold text-primary-foreground">
                                {getPriceDisplay(addon.price, addon.prices).symbol}{getPriceDisplay(addon.price, addon.prices).amount}
                              </span>
                              <span className="text-primary-foreground/50">{getPriceDisplay(addon.price, addon.prices).periodLabel}</span>
                            </div>
                            <ul className="space-y-2 mb-5">
                              {addon.features.slice(0, 3).map((f, i) => (
                                <li key={i} className="flex items-start gap-2">
                                  <Check className="h-4 w-4 text-gold flex-shrink-0 mt-0.5" />
                                  <span className="text-primary-foreground/70 text-sm">{f}</span>
                                </li>
                              ))}
                            </ul>
                            <Button
                              variant="outline"
                              size="sm"
                              className="w-full bg-transparent border-white/20 text-primary-foreground hover:bg-white/5"
                              onClick={() => { isInCart(addon.id) ? openCart() : (addItem(addon), openCart()); }}
                            >
                              <ShoppingBag className="h-4 w-4 mr-2" />
                              {isInCart(addon.id) ? "View Cart" : "Add to Cart"}
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          PLATFORM MODULES
       ═══════════════════════════════════════════════════════════════════════ */}
      <section id="modules" className="py-16 md:py-24 scroll-mt-8">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <div className="inline-flex items-center gap-2 bg-gold/10 px-4 py-2 rounded-full mb-6">
              <LayoutGrid className="h-4 w-4 text-gold" />
              <span className="text-sm font-medium text-gold">Platform Modules</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Add-on Modules
            </h2>
            <p className="text-foreground/70">
              Add capabilities beyond what's in your plan. Each module works standalone and integrates automatically with everything else.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
            {modules.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} exchangeRates={exchangeRates} />
            ))}
          </div>

          {/* CRM + Email Bundle callout */}
          {bundle && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mt-8 max-w-2xl mx-auto"
            >
              <div className="bg-gold/5 border border-gold/20 rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-4">
                <div className="flex-1 text-center sm:text-left">
                  <p className="text-lg font-normal text-foreground mb-1">{bundle.name}</p>
                  <p className="text-foreground/60 text-sm">{bundle.shortDescription}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-2xl font-bold text-foreground">
                    {getPriceDisplay(bundle.price, bundle.prices).symbol}{getPriceDisplay(bundle.price, bundle.prices).amount}
                  </span>
                  <span className="text-foreground/50 text-sm">/mo</span>
                </div>
                <Button
                  className="bg-foreground text-primary-foreground hover:bg-foreground/90"
                  onClick={() => { isInCart(bundle.id) ? openCart() : (addItem(bundle), openCart()); }}
                >
                  <ShoppingBag className="h-4 w-4 mr-2" />
                  {isInCart(bundle.id) ? "View Cart" : "Add"}
                </Button>
              </div>
            </motion.div>
          )}
        </Container>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          AI AGENT & ACTIONS
       ═══════════════════════════════════════════════════════════════════════ */}
      <section id="ai-agent" className="py-16 md:py-24 bg-gradient-to-br from-foreground to-foreground/95 scroll-mt-8">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-5xl mx-auto"
          >
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-gold/20 px-4 py-2 rounded-full mb-6">
                <Bot className="h-4 w-4 text-gold" />
                <span className="text-sm font-medium text-gold">Included with every account</span>
              </div>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
                Your Personal Business Assistant
              </h2>
              <p className="text-primary-foreground/70 text-lg max-w-2xl mx-auto leading-relaxed">
                Every subscription includes a personal AI agent — named by you, managing your platform from day one.
                Generous credits included. Top up only when you go customer-facing.
              </p>
            </div>

            {/* Included vs Paid split */}
            <div className="grid md:grid-cols-2 gap-6 mb-10">
              <div className="bg-white/5 backdrop-blur rounded-2xl p-7 border border-gold/20">
                <div className="flex items-center gap-2 mb-5">
                  <div className="h-8 w-8 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0">
                    <Check className="h-4 w-4 text-gold" />
                  </div>
                  <div>
                    <p className="font-semibold text-primary-foreground text-sm">Included — generous monthly credits</p>
                    <p className="text-primary-foreground/50 text-xs">Internal platform management</p>
                  </div>
                </div>
                <ul className="space-y-2.5">
                  {["Update website content & products", "Manage CRM contacts and deals", "Create & schedule email campaigns", "Handle tasks and project updates", "Build funnels from a brief"].map((item, i) => (
                    <li key={i} className="flex items-center gap-2.5 text-primary-foreground/80 text-sm">
                      <Check className="h-3.5 w-3.5 text-gold flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white/5 backdrop-blur rounded-2xl p-7 border border-white/10">
                <div className="flex items-center gap-2 mb-5">
                  <div className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                    <ArrowRight className="h-4 w-4 text-primary-foreground/60" />
                  </div>
                  <div>
                    <p className="font-semibold text-primary-foreground text-sm">Paid credits — when you need them</p>
                    <p className="text-primary-foreground/50 text-xs">Customer-facing use</p>
                  </div>
                </div>
                <ul className="space-y-2.5">
                  {["WhatsApp support & inquiry bot", "Abandoned cart recovery automation", "Post-purchase follow-up sequences", "Lead capture from Instagram & Facebook", "Order status & returns handling"].map((item, i) => (
                    <li key={i} className="flex items-center gap-2.5 text-primary-foreground/80 text-sm">
                      <ArrowRight className="h-3.5 w-3.5 text-gold flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* AI Actions packages */}
            <div className="bg-white/5 backdrop-blur rounded-2xl p-7 border border-white/10">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
                <div>
                  <h3 className="font-display text-lg font-normal text-primary-foreground">AI Actions Packages</h3>
                  <p className="text-primary-foreground/50 text-sm">Pay-as-you-go at $0.08/action — or save with a package</p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {aiActionsPlans.map((pkg) => (
                  <div
                    key={pkg.id}
                    className={`relative rounded-xl p-4 border transition-all ${
                      pkg.highlight ? "bg-gold/10 border-gold/40" : "bg-white/5 border-white/10"
                    }`}
                  >
                    {pkg.highlight && (
                      <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-gold text-foreground text-xs font-bold rounded-full whitespace-nowrap">
                        Popular
                      </div>
                    )}
                    <p className="font-semibold text-primary-foreground text-sm mb-0.5">{pkg.name}</p>
                    <p className="text-primary-foreground/40 text-xs mb-3">{pkg.credits.toLocaleString()} actions</p>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-bold text-primary-foreground">${pkg.price}</span>
                      <span className="text-primary-foreground/40 text-xs">/mo</span>
                    </div>
                    <p className="text-gold text-xs mt-1.5">Save {pkg.saving}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          SETUP SERVICE / FOUNDER LAUNCH
       ═══════════════════════════════════════════════════════════════════════ */}
      <section id="setup" className="py-16 md:py-24 scroll-mt-8">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-gold/10 px-4 py-2 rounded-full mb-6">
                <Rocket className="h-4 w-4 text-gold" />
                <span className="text-sm font-medium text-gold">Recommended</span>
              </div>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                Get Set Up Right
              </h2>
              <p className="text-foreground/70 max-w-2xl mx-auto">
                The recommended starting experience. A human expert configures everything,
                migrates your data, and trains your AI agent — so you don&apos;t have to figure anything out.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* AI-Assisted Setup */}
              <div className="bg-card rounded-2xl p-8 border-2 border-foreground/10">
                <h3 className="font-display text-xl font-normal text-foreground mb-2">AI-Assisted Setup</h3>
                <p className="text-gold font-medium text-sm mb-4">Included with any subscription</p>
                <p className="text-foreground/60 text-sm mb-6 leading-relaxed">
                  Max and your personal AI agent handle setup conversationally. They ask questions,
                  import your data, configure modules, and get your business running.
                </p>
                <ul className="space-y-2.5">
                  {[
                    "Conversational onboarding with Max",
                    "Data import from CSV, Google Sheets",
                    "Module configuration",
                    "AI agent training on your business",
                  ].map((f, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <Check className="h-4 w-4 text-gold flex-shrink-0 mt-0.5" />
                      <span className="text-foreground/70 text-sm">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Founder Launch */}
              <div className="bg-card rounded-2xl p-8 border-2 border-gold/30 relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-gold text-foreground text-xs font-bold rounded-full whitespace-nowrap">
                  Most Popular
                </div>
                <h3 className="font-display text-xl font-normal text-foreground mb-2">Founder Launch</h3>
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-foreground/50 text-sm">From</span>
                  <span className="text-3xl font-bold text-foreground">
                    {founderLaunch ? `${getPriceDisplay(founderLaunch.price, founderLaunch.prices).symbol}${getPriceDisplay(founderLaunch.price, founderLaunch.prices).amount}` : "$800"}
                  </span>
                  <span className="text-foreground/50 text-sm">one-time</span>
                </div>
                <p className="text-foreground/60 text-sm mb-6 leading-relaxed">
                  Full platform setup by a human expert — business discovery, module configuration, AI agent training, data migration, and handoff. Uses your included AI-built website. Not a developer website build — for that, see Professional Website above.
                </p>
                <ul className="space-y-2.5 mb-6">
                  {[
                    "Deep-dive business discovery",
                    "Full module configuration",
                    "AI agent pre-trained on your business",
                    "Data migration from existing tools",
                    "First automations built & tested",
                    "Complete handoff walkthrough",
                  ].map((f, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <Check className="h-4 w-4 text-gold flex-shrink-0 mt-0.5" />
                      <span className="text-foreground/70 text-sm">{f}</span>
                    </li>
                  ))}
                </ul>
                {founderLaunch && (
                  <Button
                    size="lg"
                    className="w-full bg-foreground text-primary-foreground hover:bg-foreground/90 font-medium"
                    onClick={() => { isInCart(founderLaunch.id) ? openCart() : (addItem(founderLaunch), openCart()); }}
                  >
                    <Rocket className="h-4 w-4 mr-2" />
                    {isInCart(founderLaunch.id) ? "View Cart" : "Get Set Up"}
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          WHAT'S INCLUDED
       ═══════════════════════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-24 bg-foreground/[0.02]">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Every Subscription Includes
            </h2>
            <p className="text-foreground/70 max-w-2xl mx-auto">
              No matter which modules you choose, you always get these.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Personal AI Agent", description: "Named by you, managing your platform from day one across all modules." },
              { title: "AI-Built Website", description: "A professional website built conversationally, included with any subscription." },
              { title: "Free CRM & Email", description: "Basic CRM and 1,000 email sends/month included. Upgrade when you're ready." },
              { title: "No Lock-in Contracts", description: "Cancel anytime. We'll even help you export your data." },
              { title: "24/7 Support", description: "Chat with Max or your AI agent anytime. Human team available via ticket." },
              { title: "Seamless Integration", description: "All modules share data and trigger actions automatically. No setup required." },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex gap-4"
              >
                <div className="h-6 w-6 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="h-3.5 w-3.5 text-gold" />
                </div>
                <div>
                  <h3 className="font-display font-normal text-foreground mb-1">{item.title}</h3>
                  <p className="text-foreground/60 text-sm leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          FAQ
       ═══════════════════════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-24">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Common Questions
            </h2>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                question: "What's included with every subscription?",
                answer: "Every subscription includes a personal AI agent, an AI-built website, basic CRM (unlimited contacts), and 1,000 email sends/month. You're never starting from zero.",
              },
              {
                question: "What's the difference between AI-Built and Professional websites?",
                answer: "The AI-Built website is generated conversationally and included free. It's great for getting started fast. The Professional Build is a custom site created by a human developer with a brand-specific template system — a genuinely premium web product. Both are managed by your AI agent ongoing.",
              },
              {
                question: "What are AI Actions?",
                answer: "Every task your AI agent performs counts as an AI Action. Your subscription includes generous monthly credits — enough for normal platform management. Additional packages are available for businesses running heavy customer-facing AI operations (WhatsApp bots, abandoned cart recovery, etc.).",
              },
              {
                question: "What happens after I subscribe?",
                answer: "Max, our AI agent, greets you on WhatsApp and guides you through onboarding. Your personal AI agent is set up, modules are configured, and you reach your first win within 24 hours.",
              },
              {
                question: "What is Founder Launch?",
                answer: "Founder Launch is our full-service setup for businesses that want a human expert to handle everything — data migration, module configuration, AI agent training, first automations, and a complete handoff. It's the recommended starting experience.",
              },
              {
                question: "What's the difference between Founder Launch and a Professional Website?",
                answer: "Founder Launch ($800) is full platform setup — a human expert configures everything, migrates your data, trains your AI agent, and hands off a ready-to-use platform. Your website is the included AI-built one. Professional Website ($1,700–$2,600) is a separate service where a developer builds a custom branded website. You can do both — many customers start with Founder Launch and add a Professional Website later.",
              },
              {
                question: "Can I cancel anytime?",
                answer: "Yes. No contracts, no lock-in. Cancel through your dashboard or message Max. We'll help you export your data if needed.",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-card rounded-xl p-6"
              >
                <div className="flex gap-4">
                  <HelpCircle className="h-5 w-5 text-gold flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-display font-normal text-foreground mb-2">{item.question}</h3>
                    <p className="text-foreground/70 leading-relaxed">{item.answer}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          FINAL CTA
       ═══════════════════════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-24 bg-foreground">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-primary-foreground/70 mb-8 max-w-xl mx-auto">
              Add the modules you need and we&apos;ll have you up and running
              in no time. Or let our team handle everything with Founder Launch.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gold hover:bg-gold-dark text-foreground font-medium"
                onClick={() => scrollToSection("setup")}
              >
                <Rocket className="h-5 w-5 mr-2" />
                Get Set Up
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent border-white/20 text-primary-foreground hover:bg-white/5"
                onClick={() => scrollToSection("modules")}
              >
                Browse Modules
              </Button>
            </div>
            <p className="text-gold font-medium mt-6">
              Questions? Chat with Max anytime.
            </p>
          </motion.div>
        </Container>
      </section>
    </div>
  );
}
