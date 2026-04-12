"use client";

import { motion } from "framer-motion";
import { Clock, DollarSign, Puzzle, Wrench } from "lucide-react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/layout/container";
import { PageSection, getEditableText, getFieldId, getSection } from "@/lib/pages-api";

interface ProblemSectionProps {
  sections: PageSection[];
}

export function ProblemSection({ sections }: ProblemSectionProps) {
  const t = useTranslations("problem");
  const problemSection = getSection(sections, "problem");
  const sectionId = problemSection?.id;
  const sectionKey = problemSection?.sectionKey;

  const diyItems = t.raw("diyItems") as string[];
  const enterpriseItems = t.raw("enterpriseItems") as string[];

  const diyProblems = [
    { icon: Wrench, text: diyItems[0] },
    { icon: Clock, text: diyItems[1] },
    { icon: Puzzle, text: diyItems[2] },
  ];

  const enterpriseProblems = [
    { icon: DollarSign, text: enterpriseItems[0] },
    { icon: Puzzle, text: enterpriseItems[1] },
    { icon: Wrench, text: enterpriseItems[2] },
  ];

  return (
    <section className="py-24 md:py-24 bg-background relative overflow-hidden" data-section-id={sectionId} data-section-key={sectionKey}>
      {/* Subtle texture */}
      <div className="absolute inset-0 bg-noise opacity-50" />

      <Container className="relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-normal text-foreground mb-6" data-field-id={getFieldId(sections, "problem", "h2", 0) || undefined}>
            {getEditableText(
              sections,
              "problem",
              "h2",
              t("heading"),
              0
            )}
          </h2>
          <p className="text-lg text-foreground" data-field-id={getFieldId(sections, "problem", "p", 0) || undefined}>
            {getEditableText(
              sections,
              "problem",
              "p",
              t("body"),
              0
            )}
          </p>
        </motion.div>

        {/* Two options comparison */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* DIY Option */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-card rounded-2xl p-8 border border-border shadow-sm"
          >
            <div className="inline-block px-3 py-1 bg-muted text-foreground text-sm font-medium rounded-full mb-4">
              Option 1
            </div>
            <h3 className="font-display text-2xl font-normal text-foreground mb-2" data-field-id={getFieldId(sections, "problem", "h3", 0) || undefined}>
              {getEditableText(
                sections,
                "problem",
                "h3",
                t("diyTitle"),
                0
              )}
            </h3>
            <p className="text-foreground mb-6" data-field-id={getFieldId(sections, "problem", "p", 1) || undefined}>
              {getEditableText(
                sections,
                "problem",
                "p",
                t("diySubtitle"),
                1
              )}
            </p>

            <ul className="space-y-4">
              {diyProblems.map((problem, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="mt-0.5 p-1.5 bg-destructive/10 rounded-lg">
                    <problem.icon className="h-4 w-4 text-destructive" />
                  </div>
                  <span className="text-foreground" data-field-id={getFieldId(sections, "problem", "ul", index) || undefined}>
                    {getEditableText(sections, "problem", "ul", problem.text, index)}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-6 pt-6 border-t border-border">
              <p className="text-sm text-foreground italic" data-field-id={getFieldId(sections, "problem", "quote", 0) || undefined}>
                {getEditableText(
                  sections,
                  "problem",
                  "quote",
                  t("diyNote"),
                  0
                )}
              </p>
            </div>
          </motion.div>

          {/* Enterprise Option */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-card rounded-2xl p-8 border border-border shadow-sm"
          >
            <div className="inline-block px-3 py-1 bg-muted text-foreground text-sm font-medium rounded-full mb-4">
              Option 2
            </div>
            <h3 className="font-display text-2xl font-normal text-foreground mb-2" data-field-id={getFieldId(sections, "problem", "h3", 1) || undefined}>
              {getEditableText(
                sections,
                "problem",
                "h3",
                t("enterpriseTitle"),
                1
              )}
            </h3>
            <p className="text-foreground mb-6" data-field-id={getFieldId(sections, "problem", "p", 3) || undefined}>
              {getEditableText(
                sections,
                "problem",
                "p",
                t("enterpriseSubtitle"),
                3
              )}
            </p>

            <ul className="space-y-4">
              {enterpriseProblems.map((problem, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="mt-0.5 p-1.5 bg-destructive/10 rounded-lg">
                    <problem.icon className="h-4 w-4 text-destructive" />
                  </div>
                  <span className="text-foreground" data-field-id={getFieldId(sections, "problem", "ul", index + 3) || undefined}>
                    {getEditableText(sections, "problem", "ul", problem.text, index + 3)}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-6 pt-6 border-t border-border">
              <p className="text-sm text-foreground italic" data-field-id={getFieldId(sections, "problem", "quote", 1) || undefined}>
                {getEditableText(
                  sections,
                  "problem",
                  "quote",
                  t("enterpriseNote"),
                  1
                )}
              </p>
            </div>
          </motion.div>
        </div>

        {/* Key insight */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <p className="font-display text-xl md:text-2xl text-foreground max-w-2xl mx-auto" data-field-id={getFieldId(sections, "problem", "p", 1) || undefined}>
            {getEditableText(
              sections,
              "problem",
              "p",
              t("closing"),
              1
            )}
          </p>
        </motion.div>
      </Container>
    </section>
  );
}
