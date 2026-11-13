import { afterEach, describe, expect, it, vi } from "vitest";
import { fetchPageSections } from "@/lib/pages-api";

function stubFetch() {
  const f = vi.fn(async () => new Response(JSON.stringify({ found: true, sections: [] }), { status: 200 }));
  vi.stubGlobal("fetch", f);
  return f;
}
const urlOf = (f: ReturnType<typeof stubFetch>) => String((f.mock.calls[0] as unknown[])[0]);

describe("fetchPageSections domain", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
  });

  it("takes the domain from SITE_DOMAIN when set", async () => {
    vi.stubEnv("SITE_DOMAIN", " staging.upgradeshop.ai ");
    vi.stubEnv("NEXT_PUBLIC_SITE_DOMAIN", "upgradeshop.ai");
    const f = stubFetch();
    await fetchPageSections("survey");
    expect(urlOf(f)).toContain("domain=staging.upgradeshop.ai");
  });

  it("falls back to the baked public domain when SITE_DOMAIN is unset", async () => {
    vi.stubEnv("SITE_DOMAIN", "");
    vi.stubEnv("NEXT_PUBLIC_SITE_DOMAIN", "upgradeshop.ai");
    const f = stubFetch();
    await fetchPageSections("survey");
    expect(urlOf(f)).toContain("domain=upgradeshop.ai");
  });

  it("falls back to upgradeshop.ai when neither is set", async () => {
    vi.stubEnv("SITE_DOMAIN", "");
    vi.stubEnv("NEXT_PUBLIC_SITE_DOMAIN", "");
    const f = stubFetch();
    await fetchPageSections("survey");
    expect(urlOf(f)).toContain("domain=upgradeshop.ai");
  });
});
