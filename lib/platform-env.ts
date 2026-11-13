/**
 * Shared platform URL + site domain resolution for API clients that call the dashboard's
 * public API. Same resolution as lib/pages-api.ts.
 */
export const PLATFORM_URL =
  process.env.NEXT_PUBLIC_UPGRADESHOP_API_URL ||
  process.env.NEXT_PUBLIC_PLATFORM_URL ||
  "https://app.upgradeshop.ai";
/**
 * Runtime `SITE_DOMAIN` (trimmed), or "" when unset. Server-side only: the baked NEXT_PUBLIC_SITE_DOMAIN is the
 * production domain even on staging, where the container's runtime SITE_DOMAIN names the staging host
 * (same rule as app/api/waitlist/route.ts).
 */
export function runtimeSiteDomain(): string {
  return process.env.SITE_DOMAIN?.trim() || "";
}

export const DOMAIN =
  runtimeSiteDomain() ||
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
