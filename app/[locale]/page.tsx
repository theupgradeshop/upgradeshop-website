import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/layout/container";
import { WaitlistForm } from "@/components/waitlist/waitlist-form";
import { SITE_URL, localePath } from "@/lib/site-url";

// Holding page since 2026-09-30: what The Upgrade Shop is, plus the waitlist form.
// Content comes from messages/*.json only (no CMS fetch), so no stale CMS copy can render.

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  const url = `${SITE_URL}${localePath(locale, "/")}`;
  const description = t("description");
  return {
    title: t("title"),
    description: description || undefined,
    alternates: {
      canonical: url,
      languages: {
        en: `${SITE_URL}/`,
        he: `${SITE_URL}/he`,
        "x-default": `${SITE_URL}/`,
      },
    },
    openGraph: {
      title: t("title"),
      description: description || undefined,
      url,
      siteName: "The Upgrade Shop",
      type: "website",
      locale: locale === "he" ? "he_IL" : "en_US",
    },
  };
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "hero" });
  const w = await getTranslations({ locale, namespace: "waitlist" });
  const subheadline = t("subheadline");

  return (
    <section className="relative min-h-[70vh] flex items-center bg-background overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-sand/50 via-background to-background" />
      <Container className="relative z-10 py-20 md:py-28">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-normal text-foreground leading-[1.1] tracking-wide mb-6 uppercase">
            {t("headline")}
          </h1>
          {subheadline ? (
            <p className="text-lg md:text-xl text-foreground max-w-2xl mx-auto leading-relaxed">
              {subheadline}
            </p>
          ) : null}

          <div id="waitlist" className="mt-14 pt-12 border-t border-border/30 scroll-mt-24">
            <h2 className="font-display text-2xl md:text-3xl font-normal text-foreground mb-8">
              {w("title")}
            </h2>
            <WaitlistForm />
          </div>
        </div>
      </Container>
    </section>
  );
}
