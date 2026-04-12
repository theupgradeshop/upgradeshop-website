"use client";

import { motion } from "framer-motion";
import { Sparkles, Plus, ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/layout/container";
import { PageSection, getEditableText, getFieldId, getSection } from "@/lib/pages-api";

interface ImprovementSectionProps {
  sections: PageSection[];
}

export function ImprovementSection({ sections }: ImprovementSectionProps) {
  const t = useTranslations("improvement");
  const improvementSection = getSection(sections, "improvement");
  const sectionId = improvementSection?.id;
  const sectionKey = improvementSection?.sectionKey;
  const examples = [
    {
      request: t("card1.question"),
      result: t("card1.answer"),
    },
    {
      request: t("card2.question"),
      result: t("card2.answer"),
    },
    {
      request: t("card3.question"),
      result: t("card3.answer"),
    },
    {
      request: t("card4.question"),
      result: t("card4.answer"),
    },
  ];

  return (
    <section className="py-24 md:py-24 bg-background relative overflow-hidden" data-section-id={sectionId} data-section-key={sectionKey}>
      {/* Subtle texture */}
      <div className="absolute inset-0 bg-noise opacity-30" />

      {/* Decorative sparkles */}
      <div className="absolute top-20 left-10 text-gold/20">
        <Sparkles className="h-24 w-24" />
      </div>
      <div className="absolute bottom-20 right-10 text-gold/20">
        <Sparkles className="h-16 w-16" />
      </div>

      <Container className="relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex justify-center mb-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gold/20 rounded-full">
              <Plus className="h-4 w-4 text-gold-dark" />
              <span className="text-sm font-medium text-gold-dark" data-field-id={getFieldId(sections, "improvement", "p", 2) || undefined}>
                {getEditableText(sections, "improvement", "p", t("badge"), 2)}
              </span>
            </div>
          </motion.div>

          {/* Main headline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-normal text-foreground mb-6 leading-tight" data-field-id={getFieldId(sections, "improvement", "h2", 0) || undefined}>
              {getEditableText(
                sections,
                "improvement",
                "h2",
                t("heading"),
                0
              )}
              <br />
              <span className="text-gold" data-field-id={getFieldId(sections, "improvement", "h2", 1) || undefined}>
                {getEditableText(
                  sections,
                  "improvement",
                  "h2",
                  t("headingGold"),
                  1
                )}
              </span>
            </h2>
            <p className="text-xl text-foreground max-w-2xl mx-auto" data-field-id={getFieldId(sections, "improvement", "p", 0) || undefined}>
              {getEditableText(
                sections,
                "improvement",
                "p",
                t("body"),
                0
              )}
            </p>
          </motion.div>

          {/* Examples grid */}
          <div className="grid sm:grid-cols-2 gap-4 mb-12">
            {examples.map((example, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                className="group bg-card rounded-xl p-5 border border-border hover:border-gold/30 hover:shadow-md transition-all duration-300"
              >
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0 p-2 bg-muted rounded-lg group-hover:bg-gold/10 transition-colors">
                    <ArrowRight className="h-4 w-4 text-foreground group-hover:text-gold-dark transition-colors" />
                  </div>
                  <div>
                    <p className="text-foreground font-medium" data-field-id={getFieldId(sections, "improvement", "p", index + 3) || undefined}>
                      {getEditableText(sections, "improvement", "p", example.request, index + 3)}
                    </p>
                    <p className="text-gold-dark font-semibold" data-field-id={getFieldId(sections, "improvement", "p", index + 7) || undefined}>
                      {getEditableText(sections, "improvement", "p", example.result, index + 7)}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom emphasis */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="text-center"
          >
            <div className="inline-block bg-foreground text-primary-foreground px-8 py-4 rounded-2xl">
              <p className="font-display text-lg md:text-xl font-medium" data-field-id={getFieldId(sections, "improvement", "p", 1) || undefined}>
                {getEditableText(
                  sections,
                  "improvement",
                  "p",
                  t("closing"),
                  1
                )}
              </p>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
