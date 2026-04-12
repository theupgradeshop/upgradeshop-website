"use client";

import { motion } from "framer-motion";
import { ArrowRight, Bot } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { PageSection, getSection } from "@/lib/pages-api";
import { modules } from "@/lib/products";

interface PricingPreviewSectionProps {
  sections: PageSection[];
}

export function PricingPreviewSection({ sections }: PricingPreviewSectionProps) {
  const t = useTranslations("pricingPreview");
  const section = getSection(sections, "pricing-preview");

  return (
    <section
      className="py-24 bg-background relative overflow-hidden"
      data-section-id={section?.id}
      data-section-key={section?.sectionKey}
    >
      <div className="absolute inset-0 bg-noise opacity-30" />

      <Container className="relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <div className="inline-block px-3 py-1 bg-gold/10 text-gold-dark text-sm font-medium rounded-full mb-6">
            {t("badge")}
          </div>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-normal text-foreground mb-6">
            {t("heading")}{" "}
            <span className="text-gold">{t("headingGold")}</span>
          </h2>
          <p className="text-lg text-foreground">
            {t("body")}
          </p>
        </motion.div>

        {/* AI Agent callout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto mb-8"
        >
          <div className="bg-foreground text-primary-foreground rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex-shrink-0 h-11 w-11 rounded-xl bg-gold/20 flex items-center justify-center">
              <Bot className="h-5 w-5 text-gold" />
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-gold text-xs font-bold uppercase tracking-wider">
                {t("aiAgentBanner.label")}
              </span>
              <p className="font-semibold text-primary-foreground mt-0.5">
                {t("aiAgentBanner.title")}
              </p>
              <p className="text-sm text-primary-foreground/55 mt-0.5">
                {t("aiAgentBanner.body")}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Module grid */}
        <div className="max-w-4xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-10">
          {modules.map((mod, i) => (
            <motion.div
              key={mod.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="rounded-xl p-5 border bg-card border-border hover:border-gold/20 transition-all duration-300"
            >
              <p className="font-semibold text-foreground">{mod.name}</p>
              <p className="text-2xl font-bold text-foreground mt-1">
                ${mod.price}
                <span className="text-sm font-normal text-foreground/50">/mo</span>
              </p>
              <p className="text-xs text-foreground/45 mt-1">{mod.shortDescription}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center"
        >
          <p className="text-foreground/50 text-sm mb-5">
            {t("note")}
          </p>
          <Button
            asChild
            className="bg-gold hover:bg-gold-dark text-foreground font-medium"
          >
            <Link href="/#waitlist">
              {t("cta")}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </Container>
    </section>
  );
}
