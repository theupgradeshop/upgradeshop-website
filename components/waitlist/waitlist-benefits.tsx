"use client";

import { useTranslations } from "next-intl";
import { Star, Clock, Eye } from "lucide-react";

export function WaitlistBenefits() {
  const t = useTranslations("waitlist.benefits");

  const benefits = [
    { icon: Clock, text: t("priorityAccess") },
    { icon: Star, text: t("founderPricing") },
    { icon: Eye, text: t("insideAccess") },
  ];

  return (
    <div className="flex flex-col gap-3 mb-8">
      {benefits.map((benefit, i) => (
        <div key={i} className="flex items-start gap-3">
          <benefit.icon className="h-5 w-5 text-gold shrink-0 mt-0.5" />
          <span className="text-sm text-foreground/80">{benefit.text}</span>
        </div>
      ))}
    </div>
  );
}
