// @vitest-environment node
import { afterEach, describe, expect, it, vi } from "vitest";

// ANALYTICS_API_MODULE lets a test point at a copy of the old bytes (red proof).
async function load() {
  return import(process.env.ANALYTICS_API_MODULE ?? "./analytics-api");
}

afterEach(() => vi.unstubAllGlobals());

describe("fetchWebsiteConfig", () => {
  it("passes an abort signal so an unanswered dashboard cannot block the layout", async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true, json: async () => ({ found: false }) });
    vi.stubGlobal("fetch", fetchMock);
    const { fetchWebsiteConfig } = await load();
    await fetchWebsiteConfig();
    const init = fetchMock.mock.calls[0][1];
    expect(init.signal).toBeInstanceOf(AbortSignal);
  });

  it("returns null when the request is aborted", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new DOMException("timed out", "TimeoutError")));
    vi.spyOn(console, "warn").mockImplementation(() => {});
    const { fetchWebsiteConfig } = await load();
    expect(await fetchWebsiteConfig()).toBeNull();
  });
});
