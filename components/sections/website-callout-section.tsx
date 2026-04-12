"use client";

import { motion } from "framer-motion";
import { Check, ArrowRight, X } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { PageSection, getSection } from "@/lib/pages-api";

interface WebsiteCalloutSectionProps {
  sections: PageSection[];
}

export function WebsiteCalloutSection({ sections }: WebsiteCalloutSectionProps) {
  const section = getSection(sections, "websites-callout");

  const neverDo = [
    "Forced to touch a website editor",
    "Watch tutorial videos",
    "Hire a freelancer for every change",
    "Debug why something broke",
  ];

  const included = [
    "Home, About, Contact, Services pages",
    "Forms connected to CRM automatically",
    "Blog — AI writes & publishes",
    "Payment gateway included",
    "SSL, mobile-optimized, responsive",
    "Human review before going live",
  ];

  const ecommerceIncluded = [
    "Product pages, shop & collections",
    "Cart & checkout flow",
    "Abandoned cart recovery",
    "Activate the Store module to enable",
  ];

  return (
    <section
      className="py-24 bg-foreground text-primary-foreground relative overflow-hidden"
      data-section-id={section?.id}
      data-section-key={section?.sectionKey}
    >
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-gold via-gold-light to-gold" />
      <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-gold/8 rounded-full blur-3xl translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gold/5 rounded-full blur-3xl -translate-x-1/4 translate-y-1/4" />

      <Container className="relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-normal mb-4 leading-tight">
            Your website,{" "}
            <span className="text-gold">handled.</span>
          </h2>
          <p className="text-xl text-primary-foreground/70 max-w-2xl mx-auto">
            Every subscription includes an AI-built website. Your agent manages ongoing updates. You never touch an editor — ever.
          </p>
        </motion.div>

        {/* Two tracks */}
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-14">
          {/* AI-Built */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-white/5 border border-white/10 rounded-2xl p-8"
          >
            <div className="mb-5">
              <span className="text-xs font-bold uppercase tracking-wider text-gold">Included with any subscription</span>
              <h3 className="font-display text-2xl font-normal text-primary-foreground mt-2 mb-1">AI-Built Website</h3>
              <p className="text-primary-foreground/50 text-sm">Describe your business. The agent builds it.</p>
            </div>
            <ul className="space-y-2.5 mb-5">
              {included.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <Check className="h-4 w-4 text-gold flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-primary-foreground/80">{item}</span>
                </li>
              ))}
            </ul>
            <div className="border-t border-white/10 pt-4">
              <p className="text-xs font-bold uppercase tracking-wider text-gold mb-2.5">E-commerce</p>
              <ul className="space-y-2.5">
                {ecommerceIncluded.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="h-4 w-4 text-gold flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-primary-foreground/80">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Professional Build */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-gold/10 border border-gold/30 rounded-2xl p-8"
          >
            <div className="mb-5">
              <span className="text-xs font-bold uppercase tracking-wider text-gold">One-time service</span>
              <h3 className="font-display text-2xl font-normal text-primary-foreground mt-2 mb-1">Professional Developer Build</h3>
              <p className="text-primary-foreground/50 text-sm">Custom branded, database-connected</p>
            </div>
            <div className="space-y-2.5 mb-5">
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
            <ul className="space-y-2.5">
              {[
                "Custom branded design by a developer",
                "Brand-specific section template library",
                "Every section database-connected",
                "Unlimited pages via template system",
                "Developer access via ticket system",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <Check className="h-4 w-4 text-gold flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-primary-foreground/80">{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-xs text-primary-foreground/30 mt-4">Large catalogs or complex migrations may require a custom quote.</p>
          </motion.div>
        </div>

        {/* What you never do + CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="max-w-2xl mx-auto text-center"
        >
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {neverDo.map((item, i) => (
              <div key={i} className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2">
                <X className="h-3 w-3 text-primary-foreground/30 flex-shrink-0" />
                <span className="text-sm text-primary-foreground/40 line-through decoration-primary-foreground/20">{item}</span>
              </div>
            ))}
          </div>

          <Button
            asChild
            className="bg-gold hover:bg-gold-dark text-foreground font-medium"
          >
            <Link href="#waitlist">
              Get Priority Access
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </Container>
    </section>
  );
}
