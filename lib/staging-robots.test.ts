import { describe, it, expect, afterEach, vi } from "vitest";
import { isStagingDeployment, getLayoutRobots } from "./staging-robots";
import robots from "../app/robots";

describe("isStagingDeployment", () => {
  it("true for the explicit staging flag", () => {
    expect(isStagingDeployment({ NEXT_PUBLIC_STAGING_REPLICA: "true", NEXT_PUBLIC_SITE_URL: "https://upgradeshop.ai" })).toBe(true);
  });
  it("true for a staging. host or .upgradeu.ai host", () => {
    expect(isStagingDeployment({ NEXT_PUBLIC_SITE_URL: "https://staging.upgradeshop.ai" })).toBe(true);
    expect(isStagingDeployment({ NEXT_PUBLIC_SITE_URL: "https://x.upgradeu.ai" })).toBe(true);
  });
  it("false for production, empty, malformed, or non-true flag", () => {
    expect(isStagingDeployment({ NEXT_PUBLIC_SITE_URL: "https://upgradeshop.ai" })).toBe(false);
    expect(isStagingDeployment({})).toBe(false);
    expect(isStagingDeployment({ NEXT_PUBLIC_SITE_URL: "not a url" })).toBe(false);
    expect(isStagingDeployment({ NEXT_PUBLIC_STAGING_REPLICA: "false", NEXT_PUBLIC_SITE_URL: "https://upgradeshop.ai" })).toBe(false);
  });
});

describe("getLayoutRobots", () => {
  it("noindex,nofollow on staging, untouched otherwise", () => {
    expect(getLayoutRobots(true)).toEqual({ index: false, follow: false });
    expect(getLayoutRobots(false)).toBeUndefined();
  });
});

describe("robots.txt", () => {
  afterEach(() => vi.unstubAllEnvs());
  it("staging: Disallow all, no sitemap", () => {
    vi.stubEnv("NEXT_PUBLIC_STAGING_REPLICA", "true");
    const r = robots();
    expect(r.rules).toEqual([{ userAgent: "*", disallow: "/" }]);
    expect(r.sitemap).toBeUndefined();
  });
  it("production: unchanged output", () => {
    vi.stubEnv("NEXT_PUBLIC_STAGING_REPLICA", "");
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://upgradeshop.ai");
    const r = robots();
    expect(r.rules).toEqual([{ userAgent: "*", allow: "/", disallow: ["/api/"] }]);
    expect(r.sitemap).toBe("https://upgradeshop.ai/sitemap.xml");
  });
});
