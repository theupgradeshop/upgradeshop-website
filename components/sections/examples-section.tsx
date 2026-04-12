"use client";

import { motion } from "framer-motion";
import { ExternalLink, Globe } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { PageSection, getEditableText, getFieldId, getSection } from "@/lib/pages-api";

interface ExamplesSectionProps {
  sections: PageSection[];
}

export function ExamplesSection({ sections }: ExamplesSectionProps) {
  const examplesSection = getSection(sections, "examples");
  const sectionId = examplesSection?.id;
  const sectionKey = examplesSection?.sectionKey;
  // Placeholder examples - will be replaced with real customer websites
  const examples = [
    {
      title: "Therapy Practice Website",
      industry: "Healthcare",
      description:
        "A warm, professional website for a therapy practice. Built to establish trust and make booking easy.",
      image: null, // Placeholder
      url: "#",
    },
    {
      title: "Consulting Firm Landing Page",
      industry: "Professional Services",
      description:
        "Clean, conversion-focused landing page that clearly communicates value and drives inquiries.",
      image: null,
      url: "#",
    },
    {
      title: "Coaching Business Site",
      industry: "Coaching",
      description:
        "Personal brand website that captures the coach's unique approach and methodology.",
      image: null,
      url: "#",
    },
  ];

  return (
    <section className="py-24 md:py-24 bg-background relative overflow-hidden" data-section-id={sectionId} data-section-key={sectionKey}>
      {/* Subtle texture */}
      <div className="absolute inset-0 bg-noise opacity-30" />

      <Container className="relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-block px-3 py-1 bg-gold/10 text-gold-dark text-sm font-medium rounded-full mb-6" data-field-id={getFieldId(sections, "examples", "p", 1) || undefined}>
            {getEditableText(sections, "examples", "p", "Our Work", 1)}
          </div>

          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-normal text-foreground mb-6" data-field-id={getFieldId(sections, "examples", "h2", 0) || undefined}>
            {getEditableText(
              sections,
              "examples",
              "h2",
              "See what we build",
              0
            )}
          </h2>
          <p className="text-lg text-foreground" data-field-id={getFieldId(sections, "examples", "p", 0) || undefined}>
            {getEditableText(
              sections,
              "examples",
              "p",
              "Real websites for real businesses. Professional quality, managed for you.",
              0
            )}
          </p>
        </motion.div>

        {/* Examples grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {examples.map((example, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-card rounded-2xl overflow-hidden border border-border hover:border-gold/30 hover:shadow-lg transition-all duration-300"
            >
              {/* Image placeholder */}
              <div className="relative aspect-[4/3] bg-foreground/5 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <Globe className="h-12 w-12 text-foreground/30 mx-auto mb-2" />
                    <p className="text-sm text-foreground/50" data-field-id={getFieldId(sections, "examples", "p", 2) || undefined}>
                      {getEditableText(sections, "examples", "p", "Screenshot coming soon", 2)}
                    </p>
                  </div>
                </div>
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-foreground/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    <span data-field-id={getFieldId(sections, "examples", "button", 0) || undefined}>
                      {getEditableText(sections, "examples", "button", "View Site", 0)}
                    </span>
                  </Button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="inline-block px-2 py-1 bg-sand text-xs font-medium text-foreground rounded mb-3" data-field-id={getFieldId(sections, "examples", "p", index + 3) || undefined}>
                  {getEditableText(sections, "examples", "p", example.industry, index + 3)}
                </div>
                <h3 className="font-display text-lg font-normal text-foreground mb-2" data-field-id={getFieldId(sections, "examples", "h3", index) || undefined}>
                  {getEditableText(sections, "examples", "h3", example.title, index)}
                </h3>
                <p className="text-sm text-foreground leading-relaxed" data-field-id={getFieldId(sections, "examples", "p", index + 6) || undefined}>
                  {getEditableText(sections, "examples", "p", example.description, index + 6)}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center"
        >
          <Button
            asChild
            variant="outline"
            className="border-2 border-foreground/20 hover:border-foreground/40"
          >
            <Link href="#waitlist">
              <span data-field-id={getFieldId(sections, "examples", "button", 1) || undefined}>
                {getEditableText(sections, "examples", "button", "Get Priority Access", 1)}
              </span>
              <ExternalLink className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </Container>
    </section>
  );
}
