import type { MetadataRoute } from "next";
import { SITE_URL, localePath } from "@/lib/site-url";

// Holding-page sitemap (2026-09-30): only the pages we keep. /pricing is not listed (301 to /).
const PATHS = ["/", "/privacy-policy", "/terms-of-use"];

export default function sitemap(): MetadataRoute.Sitemap {
  return PATHS.flatMap((path) =>
    (["en", "he"] as const).map((locale) => ({
      url: `${SITE_URL}${localePath(locale, path)}`,
      changeFrequency: "monthly" as const,
      priority: path === "/" ? 1 : 0.3,
      alternates: {
        languages: {
          en: `${SITE_URL}${localePath("en", path)}`,
          he: `${SITE_URL}${localePath("he", path)}`,
        },
      },
    }))
  );
}
