"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";

export function AnnouncementBar() {
  const t = useTranslations("announcement");

  return (
    <div className="bg-gold text-foreground py-2.5 px-4 text-center relative z-50">
      <Link
        href="#waitlist"
        className="text-sm md:text-base font-medium hover:underline underline-offset-2"
      >
        {t("text")}
      </Link>
    </div>
  );
}
