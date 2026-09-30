import Link from "next/link";
import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import { Container } from "./container";
import { localePath } from "@/lib/site-url";

export async function Footer() {
  const currentYear = new Date().getFullYear();
  const locale = await getLocale();
  const t = await getTranslations("footer");

  return (
    <footer className="bg-foreground text-primary-foreground py-12">
      <Container>
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col items-center md:items-start gap-3">
            <Link href={localePath(locale, "/")} className="flex items-center">
              <Image
                src="/images/brand/logo/logo_webp/upgradeshop-logo_cream_on_dark_version_-_no_bg.webp"
                alt="The Upgrade Shop"
                width={1083}
                height={502}
                className="h-[80px] w-auto"
              />
            </Link>
            {t("tagline") ? (
              <p className="text-sand text-sm font-medium">{t("tagline")}</p>
            ) : null}
          </div>
          <div className="flex items-center gap-6">
            <Link
              href={localePath(locale, "/privacy-policy")}
              className="text-primary-foreground hover:text-sand transition-colors text-sm"
            >
              Privacy Policy
            </Link>
            <Link
              href={localePath(locale, "/terms-of-use")}
              className="text-primary-foreground hover:text-sand transition-colors text-sm"
            >
              Terms of Use
            </Link>
          </div>
        </div>
        <div className="border-t border-white/10 mt-8 pt-6 text-center md:text-start">
          <p className="text-primary-foreground text-sm">
            {t("copyright", { year: currentYear })}
          </p>
        </div>
      </Container>
    </footer>
  );
}
