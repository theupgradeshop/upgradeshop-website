/**
 * Staging-safe robots resolution.
 *
 * This repo is built for TWO hosts: production (https://upgradeshop.ai, must always
 * index) and this box's staging replica (staging.upgradeshop.ai, must never index).
 * Unlike other sites, NEXT_PUBLIC_SITE_URL is the PRODUCTION origin in both builds
 * (canonicals/sitemaps deliberately point at production), so it cannot carry the
 * staging signal here. The signal is a dedicated flag, NEXT_PUBLIC_STAGING_REPLICA=true,
 * passed ONLY by the gitignored docker-compose.override.yml and never by the tracked
 * docker-compose.yml. A host-based signal on NEXT_PUBLIC_SITE_URL is also honoured.
 *
 * POSITIVE check only: absent/empty/malformed input means "not staging" (indexable,
 * exactly as before). Never invert this into an inequality against production.
 */

export function isStagingDeployment(
  env: { NEXT_PUBLIC_STAGING_REPLICA?: string; NEXT_PUBLIC_SITE_URL?: string } = {
    NEXT_PUBLIC_STAGING_REPLICA: process.env.NEXT_PUBLIC_STAGING_REPLICA,
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  },
): boolean {
  if ((env.NEXT_PUBLIC_STAGING_REPLICA || "").trim().toLowerCase() === "true") return true;
  try {
    const host = new URL(env.NEXT_PUBLIC_SITE_URL || "").hostname;
    return host.startsWith("staging.") || host.endsWith(".upgradeu.ai");
  } catch {
    return false;
  }
}

/** Object-form `Metadata.robots` for the root layout; undefined keeps today's output. */
export function getLayoutRobots(
  staging: boolean = isStagingDeployment(),
): { index: boolean; follow: boolean } | undefined {
  return staging ? { index: false, follow: false } : undefined;
}
