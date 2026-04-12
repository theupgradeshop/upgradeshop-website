"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { ChevronDown, MessageCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/layout/container";
import { PageSection, getEditableText, getFieldId, getSection } from "@/lib/pages-api";
import { cn } from "@/lib/utils";

interface FAQSectionProps {
  sections: PageSection[];
}

export function FAQSection({ sections }: FAQSectionProps) {
  const t = useTranslations("faq");
  const faqSection = getSection(sections, "faq");
  const sectionId = faqSection?.id;
  const sectionKey = faqSection?.sectionKey;
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqItems = t.raw("items") as Array<{ q: string; a: string }>;
  const faqs = faqItems.map((item) => ({ question: item.q, answer: item.a }));

  return (
    <section className="py-24 md:py-24 bg-background relative overflow-hidden" data-section-id={sectionId} data-section-key={sectionKey}>
      <Container className="relative z-10">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left: Header */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="sticky top-24">
              <div className="inline-block px-3 py-1 bg-gold/10 text-gold-dark text-sm font-medium rounded-full mb-6" data-field-id={getFieldId(sections, "faq", "p", 1) || undefined}>
                {getEditableText(sections, "faq", "p", t("badge"), 1)}
              </div>

              <h2 className="font-display text-3xl md:text-4xl font-normal text-foreground mb-6" data-field-id={getFieldId(sections, "faq", "h2", 0) || undefined}>
                {getEditableText(
                  sections,
                  "faq",
                  "h2",
                  t("heading"),
                  0
                )}
              </h2>
              <p className="text-lg text-foreground mb-8" data-field-id={getFieldId(sections, "faq", "p", 0) || undefined}>
                {getEditableText(
                  sections,
                  "faq",
                  "p",
                  t("body"),
                  0
                )}
              </p>

              <div className="flex items-center gap-3 p-4 bg-sand rounded-xl">
                <div className="p-2 bg-gold/20 rounded-lg">
                  <MessageCircle className="h-5 w-5 text-gold-dark" />
                </div>
                <div>
                  <p className="font-medium text-foreground" data-field-id={getFieldId(sections, "faq", "p", 2) || undefined}>
                    {getEditableText(sections, "faq", "p", t("supportNote"), 2)}
                  </p>
                  <p className="text-sm text-foreground" data-field-id={getFieldId(sections, "faq", "p", 3) || undefined}>
                    {getEditableText(sections, "faq", "p", t("supportNote"), 3)}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: FAQ list */}
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <button
                  onClick={() =>
                    setOpenIndex(openIndex === index ? null : index)
                  }
                  className="w-full text-left"
                >
                  <div
                    className={cn(
                      "bg-card rounded-xl p-6 border transition-all duration-300",
                      openIndex === index
                        ? "border-gold/30 shadow-md"
                        : "border-border hover:border-gold/20"
                    )}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <h3 className="font-display text-lg font-normal text-foreground" data-field-id={getFieldId(sections, "faq", "h3", index) || undefined}>
                        {getEditableText(sections, "faq", "h3", faq.question, index)}
                      </h3>
                      <ChevronDown
                        className={cn(
                          "h-5 w-5 text-foreground transition-transform duration-300 flex-shrink-0",
                          openIndex === index && "rotate-180"
                        )}
                      />
                    </div>

                    <div
                      className={cn(
                        "overflow-hidden transition-all duration-300",
                        openIndex === index
                          ? "max-h-96 opacity-100 mt-4"
                          : "max-h-0 opacity-0"
                      )}
                    >
                      <p className="text-foreground leading-relaxed" data-field-id={getFieldId(sections, "faq", "p", index + 4) || undefined}>
                        {getEditableText(sections, "faq", "p", faq.answer, index + 4)}
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
  );
}
