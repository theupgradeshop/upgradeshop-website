"use client";

import { motion } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import {
  PageSection,
  getEditableText,
  getEditableButton,
  getFieldId,
  getSection,
} from "@/lib/pages-api";
import { WaitlistBenefits } from "@/components/waitlist/waitlist-benefits";
import { WaitlistForm } from "@/components/waitlist/waitlist-form";

interface HeroSectionProps {
  sections: PageSection[];
}

export function HeroSection({ sections }: HeroSectionProps) {
  const primaryCta = getEditableButton(
    sections,
    "hero",
    "Get Priority Access",
    "#waitlist",
    0
  );
  const secondaryCta = getEditableButton(
    sections,
    "hero",
    "See How It Works",
    "#how-it-works",
    1
  );

  // Get section ID for data attribute
  const heroSection = getSection(sections, "hero");
  const sectionId = heroSection?.id;
  const sectionKey = heroSection?.sectionKey;

  return (
    <section
      className="relative min-h-[90vh] flex items-center bg-background overflow-hidden"
      data-section-id={sectionId}
      data-section-key={sectionKey}
    >
      {/* Subtle warm gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-sand/50 via-background to-background" />

      {/* Decorative gold accent - subtle top-right glow */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gold/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />

      {/* Decorative bottom-left shape */}
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-sand-dark/30 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4" />

      <Container className="relative z-10 py-20 md:py-24">
        <div className="max-w-4xl mx-auto text-center">
          {/* Eyebrow text */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-base md:text-lg font-medium text-gold-dark tracking-wide uppercase mb-6"
            data-field-id={getFieldId(sections, "hero", "p", 0) || undefined}
          >
            {getEditableText(
              sections,
              "hero",
              "p",
              "You Didn't Start a Business to Be an Admin Worker",
              0
            )}
          </motion.p>

          {/* Main headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal text-foreground leading-[1.1] tracking-wide mb-6 uppercase"
          >
            <span data-field-id={getFieldId(sections, "hero", "h1", 0) || undefined}>
              {getEditableText(
                sections,
                "hero",
                "h1",
                "Stop doing admin work.",
                0
              )}
            </span>
            <br />
            <span className="text-gold" data-field-id={getFieldId(sections, "hero", "h2", 0) || undefined}>
              {getEditableText(sections, "hero", "h2", "Start growing.", 0)}
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
            data-field-id={getFieldId(sections, "hero", "p", 1) || undefined}
          >
            {getEditableText(
              sections,
              "hero",
              "p",
              "One platform. One assistant. Website, CRM, email, WhatsApp, automations — all managed by your own AI agent. Stop juggling tools. Start growing.",
              1
            )}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button
              asChild
              size="lg"
              className="bg-gold hover:bg-gold-dark text-foreground font-medium px-8 py-6 text-base rounded-xl shadow-lg shadow-gold/20 hover:shadow-xl hover:shadow-gold/30 transition-all duration-300"
            >
              <Link href={primaryCta.url}>
                {primaryCta.text}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-2 border-border hover:border-foreground/30 px-8 py-6 text-base rounded-xl transition-all duration-300"
            >
              <Link href={secondaryCta.url}>{secondaryCta.text}</Link>
            </Button>
          </motion.div>

          {/* Trust indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-12 flex items-center justify-center gap-2 text-sm text-foreground"
          >
            <MessageCircle className="h-4 w-4" />
            <span data-field-id={getFieldId(sections, "hero", "p", 2) || undefined}>
              {getEditableText(sections, "hero", "p", "Questions? Chat with us anytime.", 2)}
            </span>
          </motion.div>

          {/* Waitlist capture block */}
          <motion.div
            id="waitlist"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-16 pt-12 border-t border-border/30"
          >
            <WaitlistBenefits />
            <WaitlistForm />
          </motion.div>
        </div>
      </Container>

    </section>
  );
}
