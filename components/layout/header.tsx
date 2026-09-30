"use client";

import Link from "next/link";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { Container } from "./container";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "./language-switcher";
import { ArrowRight } from "lucide-react";
import { localePath } from "@/lib/site-url";

export function Header() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const home = localePath(locale, "/");

  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border">
      <Container>
        <nav className="flex justify-between items-center py-4">
          <Link href={home} className="flex items-center">
            <Image
              src="/images/brand/logo/logo_webp/upgrade_shop_logo_black_on_cream-_no_bg.webp"
              alt="The Upgrade Shop"
              width={844}
              height={378}
              className="h-14 w-auto"
              priority
            />
          </Link>

          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <Button
              asChild
              className="bg-gold hover:bg-gold-dark text-foreground font-medium rounded-xl"
            >
              <Link href={`${home === "/" ? "" : home}/#waitlist`}>
                {t("joinWaitlist")}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </nav>
      </Container>
    </header>
  );
}
