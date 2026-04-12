"use client";

import { motion } from "framer-motion";
import {
  Globe,
  Users,
  Mail,
  MessageCircle,
  MessagesSquare,
  FolderKanban,
  BarChart3,
  Zap,
  Badge,
  Bot,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/layout/container";
import { PageSection, getEditableText, getFieldId, getSection } from "@/lib/pages-api";

interface CapabilitiesSectionProps {
  sections: PageSection[];
}

export function CapabilitiesSection({ sections }: CapabilitiesSectionProps) {
  const t = useTranslations("capabilities");
  const capabilitiesSection = getSection(sections, "capabilities");
  const sectionId = capabilitiesSection?.id;
  const sectionKey = capabilitiesSection?.sectionKey;

  const capabilities = [
    {
      icon: Bot,
      title: t("aiAgent.title"),
      description: t("aiAgent.description"),
      highlight: true,
      badge: t("aiAgent.badge"),
    },
    {
      icon: Globe,
      title: t("website.title"),
      description: t("website.description"),
      highlight: false,
    },
    {
      icon: Users,
      title: t("crm.title"),
      description: t("crm.description"),
      highlight: false,
    },
    {
      icon: Mail,
      title: t("email.title"),
      description: t("email.description"),
      highlight: false,
    },
    {
      icon: MessageCircle,
      title: t("whatsapp.title"),
      description: t("whatsapp.description"),
      highlight: false,
    },
    {
      icon: MessagesSquare,
      title: t("social.title"),
      description: t("social.description"),
      highlight: false,
    },
    {
      icon: FolderKanban,
      title: t("projects.title"),
      description: t("projects.description"),
      highlight: false,
    },
    {
      icon: BarChart3,
      title: t("seo.title"),
      description: t("seo.description"),
      highlight: false,
    },
    {
      icon: Zap,
      title: t("automations.title"),
      description: t("automations.description"),
      highlight: false,
    },
  ];

  return (
    <section className="py-24 md:py-24 bg-background relative overflow-hidden" data-section-id={sectionId} data-section-key={sectionKey}>
      {/* Subtle decorative elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-sand-dark/50 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4" />

      <Container className="relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-block px-3 py-1 bg-gold/10 text-gold-dark text-sm font-medium rounded-full mb-6" data-field-id={getFieldId(sections, "capabilities", "p", 2) || undefined}>
            {getEditableText(sections, "capabilities", "p", t("badge"), 2)}
          </div>

          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-normal text-foreground mb-6" data-field-id={getFieldId(sections, "capabilities", "h2", 0) || undefined}>
            {getEditableText(
              sections,
              "capabilities",
              "h2",
              t("heading"),
              0
            )}{" "}
            <span className="text-gold" data-field-id={getFieldId(sections, "capabilities", "h2", 1) || undefined}>
              {getEditableText(sections, "capabilities", "h2", t("headingGold"), 1)}
            </span>
          </h2>
          <p className="text-lg text-foreground" data-field-id={getFieldId(sections, "capabilities", "p", 0) || undefined}>
            {getEditableText(
              sections,
              "capabilities",
              "p",
              t("body"),
              0
            )}
          </p>
        </motion.div>

        {/* Capabilities grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {capabilities.map((capability, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className={`group relative bg-card rounded-2xl p-6 border transition-all duration-300 ${
                capability.highlight
                  ? "border-gold/30 shadow-lg shadow-gold/10 hover:shadow-xl hover:shadow-gold/15"
                  : "border-border hover:border-gold/20 hover:shadow-lg hover:shadow-gold/5"
              }`}
            >
              {/* Badge for highlighted items */}
              {capability.badge && (
                <div className="absolute -top-3 left-6 inline-flex items-center gap-1 px-3 py-1 bg-gold text-foreground text-xs font-semibold rounded-full">
                  <Badge className="h-3 w-3" />
                  <span data-field-id={getFieldId(sections, "capabilities", "p", 3) || undefined}>
                    {getEditableText(sections, "capabilities", "p", capability.badge!, 3)}
                  </span>
                </div>
              )}

              <div
                className={`p-3 rounded-xl w-fit mb-4 transition-colors ${
                  capability.highlight
                    ? "bg-gold/20 group-hover:bg-gold/30"
                    : "bg-muted group-hover:bg-gold/10"
                }`}
              >
                <capability.icon
                  className={`h-6 w-6 ${
                    capability.highlight ? "text-gold-dark" : "text-foreground"
                  }`}
                />
              </div>

              <h3 className="font-display text-lg font-normal text-foreground mb-2" data-field-id={getFieldId(sections, "capabilities", "h3", index) || undefined}>
                {getEditableText(sections, "capabilities", "h3", capability.title, index)}
              </h3>

              <p className="text-sm text-foreground leading-relaxed" data-field-id={getFieldId(sections, "capabilities", "p", index + 4) || undefined}>
                {getEditableText(sections, "capabilities", "p", capability.description, index + 4)}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Bottom message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <p className="text-foreground" data-field-id={getFieldId(sections, "capabilities", "p", 1) || undefined}>
            {getEditableText(
              sections,
              "capabilities",
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
