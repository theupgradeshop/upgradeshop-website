/** Canonical production origin. Same value in staging and production builds (see docker-compose.override.yml). */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://upgradeshop.ai"
).replace(/\/$/, "");

export const LOCALES = ["en", "he"] as const;

/** Locale-aware path: English has no prefix (localePrefix: "as-needed"), Hebrew is /he. */
export function localePath(locale: string, path: string): string {
  const clean = path === "/" ? "" : path;
  return locale === "he" ? `/he${clean}` || "/he" : clean || "/";
}
