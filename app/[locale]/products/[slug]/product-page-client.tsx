"use client";

import { motion } from "framer-motion";
import * as LucideIcons from "lucide-react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ShoppingBag,
  HelpCircle,
} from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProductCard } from "@/components/pricing/product-card";
import { useCart } from "@/lib/cart-context";
import { useCurrency } from "@/lib/use-currency";
import { Product } from "@/lib/products";
type WebsiteTier = { key: string; name: string; maxPages: number | null; monthlyPrice: number; description: string };
import { ProductPageContent } from "@/lib/product-content";

function getIcon(name: string): LucideIcons.LucideIcon {
  const icon = (LucideIcons as Record<string, unknown>)[name];
  if (typeof icon === "object" && icon !== null) {
    return icon as LucideIcons.LucideIcon;
  }
  return HelpCircle;
}

interface ProductPageClientProps {
  product: Product | null;
  content: ProductPageContent;
  relatedProducts: Product[];
  isWebsiteService?: boolean;
  serviceName?: string;
  websiteTiers?: WebsiteTier[];
  websiteFeatures?: string[];
}

export default function ProductPageClient({
  product,
  content,
  relatedProducts,
  isWebsiteService,
  serviceName,
  websiteTiers,
  websiteFeatures,
}: ProductPageClientProps) {
  const { addItem, isInCart, openCart } = useCart();
  const { getPriceDisplay, currency } = useCurrency();

  const inCart = product ? isInCart(product.id) : false;

  const handleAddToCart = () => {
    if (!product) return;
    if (inCart) {
      openCart();
    } else {
      addItem(product);
      openCart();
    }
  };

  const Icon = getIcon(content.icon);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative pt-12 pb-20 md:pt-16 md:pb-28 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-sand-dark/30 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4" />

        <Container className="relative z-10">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 text-sm text-foreground/60 hover:text-foreground transition-colors mb-8"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Pricing
            </Link>
          </motion.div>

          <div className="max-w-4xl">
            {/* Category badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Badge
                variant="outline"
                className="mb-4 border-gold/30 text-gold-dark"
              >
                {product?.category === "website-addon"
                  ? "Website Add-on"
                  : isWebsiteService
                  ? "Managed Service"
                  : "Platform Module"}
              </Badge>
            </motion.div>

            {/* Icon + Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex items-start gap-5 mb-6"
            >
              <div className="h-16 w-16 rounded-2xl bg-gold/10 border border-gold/20 flex items-center justify-center flex-shrink-0">
                <Icon className="h-8 w-8 text-gold" />
              </div>
              <div>
                <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                  {product?.name || serviceName || content.slug}
                </h1>
                <p className="text-xl md:text-2xl text-foreground/60 mt-2">
                  {content.tagline}
                </p>
              </div>
            </motion.div>

            {/* Price + CTA */}
            {product && !isWebsiteService && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex flex-wrap items-center gap-6 mt-8"
              >
                <div>
                  {product.pricePrefix && (
                    <p className="text-sm text-foreground/60 mb-1">
                      {product.pricePrefix}
                    </p>
                  )}
                  <div className="flex items-baseline gap-1">
                    <span className="text-5xl font-display font-bold text-foreground">
                      {getPriceDisplay(product.price, product.prices).symbol}
                      {getPriceDisplay(product.price, product.prices).amount}
                    </span>
                    <span className="text-foreground/60 text-lg">
                      {getPriceDisplay(product.price, product.prices).periodLabel}
                    </span>
                  </div>
                </div>
                <Button
                  onClick={handleAddToCart}
                  size="lg"
                  className={`px-8 py-6 text-base font-medium rounded-xl ${
                    inCart
                      ? "bg-foreground/10 text-foreground hover:bg-foreground/20"
                      : "bg-gold hover:bg-gold-dark text-foreground shadow-lg shadow-gold/20 hover:shadow-xl hover:shadow-gold/30"
                  }`}
                >
                  <ShoppingBag className="h-5 w-5 mr-2" />
                  {inCart ? "View Cart" : "Add to Cart"}
                </Button>
              </motion.div>
            )}

            {/* Website service - link to pricing tiers */}
            {isWebsiteService && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mt-8"
              >
                <Link href="/pricing#website-service">
                  <Button
                    size="lg"
                    className="px-8 py-6 text-base font-medium rounded-xl bg-gold hover:bg-gold-dark text-foreground shadow-lg shadow-gold/20 hover:shadow-xl hover:shadow-gold/30"
                  >
                    View Plans & Pricing
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </Button>
                </Link>
              </motion.div>
            )}
          </div>
        </Container>
      </section>

      {/* Overview Section */}
      <section className="py-20 md:py-28 bg-foreground/[0.02]">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-8">
              {content.overviewTitle}
            </h2>
            <div className="space-y-5">
              {content.overviewParagraphs.map((paragraph, i) => (
                <p
                  key={i}
                  className="text-lg text-foreground/70 leading-relaxed"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Website Tiers (only for website service) */}
      {isWebsiteService && websiteTiers && (
        <section className="py-20 md:py-28">
          <Container>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                Choose Your Plan
              </h2>
              <p className="text-foreground/60 text-lg max-w-2xl mx-auto">
                Every plan includes custom development, Max AI content management,
                and our full support infrastructure.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {websiteTiers.map((tier, i) => (
                <motion.div
                  key={tier.key}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="bg-card rounded-2xl p-6 border-2 transition-all border-transparent hover:border-gold/30"
                >
                  <h3 className="font-display text-xl font-normal mb-1">
                    {tier.name}
                  </h3>
                  <p className="text-sm text-foreground/60 mb-4">
                    {tier.description}
                  </p>
                  {tier.monthlyPrice > 0 ? (
                    <div className="flex items-baseline gap-1 mb-4">
                      <span className="text-3xl font-display font-bold">
                        {getPriceDisplay(tier.monthlyPrice).symbol}
                        {getPriceDisplay(tier.monthlyPrice).amount}
                      </span>
                      <span className="text-foreground/60">
                        {getPriceDisplay(tier.monthlyPrice).periodLabel}
                      </span>
                    </div>
                  ) : (
                    <p className="text-3xl font-display font-bold mb-4">
                      Custom
                    </p>
                  )}
                  <p className="text-sm text-foreground/60">
                    {tier.maxPages
                      ? `Up to ${tier.maxPages} pages`
                      : "Unlimited pages"}
                  </p>
                </motion.div>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Features Section */}
      <section className={`py-20 md:py-28 ${isWebsiteService ? "bg-foreground/[0.02]" : ""}`}>
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Features & Capabilities
            </h2>
            <p className="text-foreground/60 text-lg max-w-2xl mx-auto">
              Everything included with {product?.name || serviceName || "this service"}.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {content.detailedFeatures.map((feature, i) => {
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
                  <h3 className="font-display text-lg font-normal text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-foreground/60 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>

          {/* Website service features list */}
          {websiteFeatures && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-16 max-w-3xl mx-auto"
            >
              <h3 className="font-display text-2xl font-normal text-foreground mb-6 text-center">
                Every Website Includes
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {websiteFeatures.map((feature, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="mt-0.5 h-5 w-5 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0">
                      <Check className="h-3 w-3 text-gold" />
                    </div>
                    <span className="text-foreground/80">{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </Container>
      </section>

      {/* Who It's For Section */}
      <section className="py-20 md:py-28 bg-foreground text-primary-foreground">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Who It&apos;s For
            </h2>
            <p className="text-primary-foreground/60 text-lg max-w-2xl mx-auto">
              See how businesses like yours use{" "}
              {product?.name || serviceName || "this service"}.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {content.useCases.map((useCase, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white/5 backdrop-blur rounded-2xl p-8 border border-white/10"
              >
                <h3 className="font-display text-xl font-normal mb-3">
                  {useCase.title}
                </h3>
                <p className="text-primary-foreground/70 leading-relaxed">
                  {useCase.description}
                </p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Pricing CTA Section */}
      <section className="py-20 md:py-28">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
              Ready to Get Started?
            </h2>

            {product && !isWebsiteService && (
              <>
                <div className="flex items-baseline justify-center gap-2 mb-6">
                  {product.pricePrefix && (
                    <span className="text-foreground/60">
                      {product.pricePrefix}
                    </span>
                  )}
                  <span className="text-5xl font-display font-bold text-foreground">
                    {getPriceDisplay(product.price, product.prices).symbol}
                    {getPriceDisplay(product.price, product.prices).amount}
                  </span>
                  <span className="text-foreground/60 text-lg">
                    {getPriceDisplay(product.price, product.prices).periodLabel}
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Button
                    onClick={handleAddToCart}
                    size="lg"
                    className={`px-8 py-6 text-base font-medium rounded-xl ${
                      inCart
                        ? "bg-foreground/10 text-foreground hover:bg-foreground/20"
                        : "bg-gold hover:bg-gold-dark text-foreground shadow-lg shadow-gold/20 hover:shadow-xl hover:shadow-gold/30"
                    }`}
                  >
                    <ShoppingBag className="h-5 w-5 mr-2" />
                    {inCart ? "View Cart" : "Add to Cart"}
                  </Button>
                  <Link href="/pricing">
                    <Button
                      variant="outline"
                      size="lg"
                      className="px-8 py-6 text-base rounded-xl border-2"
                    >
                      View All Products
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </>
            )}

            {isWebsiteService && (
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/pricing#website-service">
                  <Button
                    size="lg"
                    className="px-8 py-6 text-base font-medium rounded-xl bg-gold hover:bg-gold-dark text-foreground shadow-lg shadow-gold/20"
                  >
                    View Plans & Pricing
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </Button>
                </Link>
                <Link href="/pricing">
                  <Button
                    variant="outline"
                    size="lg"
                    className="px-8 py-6 text-base rounded-xl border-2"
                  >
                    View All Products
                  </Button>
                </Link>
              </div>
            )}

            {product?.category === "website-addon" && (
              <p className="text-foreground/50 text-sm mt-4">
                Requires a{" "}
                <Link href="/products/website" className="text-gold hover:text-gold-dark underline">
                  Website plan
                </Link>
              </p>
            )}
          </motion.div>
        </Container>
      </section>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <section className="py-20 md:py-28 bg-foreground/[0.02]">
          <Container>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                You Might Also Need
              </h2>
              <p className="text-foreground/60 text-lg">
                Products that work great with {product?.name || serviceName || "this service"}.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {relatedProducts.map((related, i) => (
                <ProductCard key={related.id} product={related} index={i} />
              ))}
            </div>
          </Container>
        </section>
      )}
    </div>
  );
}
