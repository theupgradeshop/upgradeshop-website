// @vitest-environment node
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const KEY_TEXT = "test-indexnow-key-value";
const DOMAIN = "upgradeshop.test";
const PLATFORM = "https://platform.example.test";

async function loadGet() {
  vi.resetModules();
  vi.stubEnv("NEXT_PUBLIC_UPGRADESHOP_API_URL", PLATFORM);
  vi.stubEnv("NEXT_PUBLIC_SITE_DOMAIN", DOMAIN);
  return (await import("./route")).GET;
}

describe("GET /api/indexnow-key", () => {
  beforeEach(() => {
    vi.unstubAllEnvs();
  });
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.unstubAllEnvs();
  });

  it("returns the key as text/plain 200 and asks the platform for this site's domain", async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response(KEY_TEXT, { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);
    const GET = await loadGet();

    const res = await GET();

    expect(res.status).toBe(200);
    expect(res.headers.get("content-type")).toBe("text/plain; charset=utf-8");
    expect(await res.text()).toBe(KEY_TEXT);
    expect(fetchMock).toHaveBeenCalledTimes(1);
    const requested = String(fetchMock.mock.calls[0][0]);
    expect(requested).toBe(`${PLATFORM}/api/public/indexnow-key?domain=${DOMAIN}`);
    expect(requested).toContain(`domain=${encodeURIComponent(DOMAIN)}`);
    expect(fetchMock.mock.calls[0][1]).toMatchObject({ next: { revalidate: 3600 } });
  });

  it("returns 404 when the platform has no key", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response("nope", { status: 404 })));
    const GET = await loadGet();

    const res = await GET();

    expect(res.status).toBe(404);
    expect(await res.text()).toBe("Not found");
  });

  it("returns 500 when the platform call throws", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("network down")));
    const GET = await loadGet();

    const res = await GET();

    expect(res.status).toBe(500);
    expect(await res.text()).toBe("Internal server error");
  });
});
