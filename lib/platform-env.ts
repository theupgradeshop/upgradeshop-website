/**
 * Shared platform URL + site domain resolution for API clients that call the dashboard's
 * public API. Same resolution as lib/pages-api.ts.
 */
export const PLATFORM_URL =
  process.env.NEXT_PUBLIC_UPGRADESHOP_API_URL ||
  process.env.NEXT_PUBLIC_PLATFORM_URL ||
  "https://app.upgradeshop.ai";
export const DOMAIN =
  process.env.NEXT_PUBLIC_SITE_DOMAIN ||
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/^https?:\/\//, "") ||
  "";

/**
 * This site's own origin(s), for `@baraddmarketing/redirects`'s
 * `classifyReferrer(referer, ownOrigins)` (broken-link provenance: internal vs
 * external referer). Derived only from env this site already has; no guessed
 * apex/www variants (a wrong guess misclassifies; `null` = "unknown" is honest).
 * A site also served under an alias domain must add that alias explicitly.
 */
export const OWN_ORIGINS: readonly string[] = Array.from(
  new Set(
    [process.env.NEXT_PUBLIC_SITE_DOMAIN, process.env.NEXT_PUBLIC_SITE_URL].filter(
      (value): value is string => !!value,
    ),
  ),
);
