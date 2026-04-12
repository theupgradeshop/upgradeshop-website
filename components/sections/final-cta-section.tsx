"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/layout/container";
import { WaitlistForm } from "@/components/waitlist/waitlist-form";
import {
  PageSection,
  getEditableText,
  getFieldId,
  getSection,
} from "@/lib/pages-api";

interface FinalCTASectionProps {
  sections: PageSection[];
}

export function FinalCTASection({ sections }: FinalCTASectionProps) {
  const t = useTranslations("finalCta");
  const finalCtaSection = getSection(sections, "final-cta");
  const sectionId = finalCtaSection?.id;
  const sectionKey = finalCtaSection?.sectionKey;

  const trustIndicators = t.raw("trustIndicators") as string[];

  return (
    <section className="py-24 md:py-24 bg-foreground text-primary-foreground relative overflow-hidden" data-section-id={sectionId} data-section-key={sectionKey}>
      {/* Gold accent stripe */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-gold via-gold-light to-gold" />

      {/* Decorative elements */}
      <div className="absolute top-20 right-10 w-80 h-80 bg-gold/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-64 h-64 bg-gold/5 rounded-full blur-3xl" />

      <Container className="relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Main headline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-normal mb-6 leading-tight" data-field-id={getFieldId(sections, "final-cta", "h2", 0) || undefined}>
              {getEditableText(
                sections,
                "final-cta",
                "h2",
                t("heading"),
                0
              )}
            </h2>
            <p className="text-xl text-primary-foreground/80 mb-10 max-w-2xl mx-auto" data-field-id={getFieldId(sections, "final-cta", "p", 0) || undefined}>
              {getEditableText(
                sections,
                "final-cta",
                "p",
                t("body"),
                0
              )}
            </p>
          </motion.div>

          {/* Waitlist Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-10"
          >
            <WaitlistForm variant="dark" />
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap items-center justify-center gap-6"
          >
            {trustIndicators.map((indicator, index) => (
              <div key={index} className="flex items-center gap-2">
                <Check className="h-4 w-4 text-gold" />
                <span className="text-sm text-primary-foreground/70" data-field-id={getFieldId(sections, "final-cta", "ul", index) || undefined}>
                  {getEditableText(sections, "final-cta", "ul", indicator, index)}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
