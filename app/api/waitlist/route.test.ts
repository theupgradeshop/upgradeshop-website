import { afterEach, describe, expect, it, vi } from "vitest";
import { POST } from "./route";

let ipCounter = 0;

function makeRequest() {
  // Distinct IP per request so the route's in-memory rate limiter never trips.
  ipCounter += 1;
  return new Request("https://staging.upgradeshop.ai/api/waitlist", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-forwarded-for": `10.0.0.${ipCounter}`,
    },
    body: JSON.stringify({
      name: "Dana Cohen",
      email: "dana@example.com",
      phone: "972501234567",
      language: "he",
    }),
  });
}

function mockDashboard(payload: Record<string, unknown>) {
  vi.stubGlobal(
    "fetch",
    vi.fn().mockResolvedValue({ ok: true, json: async () => payload })
  );
}

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("POST /api/waitlist", () => {
  it("returns success for a newly created contact", async () => {
    mockDashboard({ contactId: "c1", created: true, upgraded: false, alreadyOnWaitlist: false });
    const res = await POST(makeRequest());
    expect(res.status).toBe(200);
    expect(await res.json()).toMatchObject({ success: true, contactId: "c1", created: true });
  });

  it("returns success for an existing contact that just received the waitlist tag", async () => {
    mockDashboard({ contactId: "c2", created: false, upgraded: false, alreadyOnWaitlist: false });
    const res = await POST(makeRequest());
    expect(res.status).toBe(200);
    expect(await res.json()).toMatchObject({ success: true, created: false });
  });

  it("returns 409 already_on_waitlist for an existing contact that already had the tag", async () => {
    mockDashboard({ contactId: "c3", created: false, upgraded: false, alreadyOnWaitlist: true });
    const res = await POST(makeRequest());
    expect(res.status).toBe(409);
    expect(await res.json()).toMatchObject({ code: "already_on_waitlist" });
  });

  it("keeps success when an older dashboard sends no alreadyOnWaitlist", async () => {
    mockDashboard({ contactId: "c4", created: false, upgraded: false });
    const res = await POST(makeRequest());
    expect(res.status).toBe(200);
    expect(await res.json()).toMatchObject({ success: true, created: false });
  });

  it("returns 429 after 5 requests from one IP", async () => {
    mockDashboard({ contactId: "c5", created: true, alreadyOnWaitlist: false });
    const make = () =>
      new Request("https://staging.upgradeshop.ai/api/waitlist", {
        method: "POST",
        headers: { "content-type": "application/json", "x-forwarded-for": "192.0.2.99" },
        body: JSON.stringify({ email: "a@example.com", phone: "972501234567" }),
      });
    for (let i = 0; i < 5; i++) expect((await POST(make())).status).toBe(200);
    expect((await POST(make())).status).toBe(429);
  });

  describe("find-or-create call", () => {
    function post(headers: Record<string, string>) {
      return POST(
        new Request("https://staging.upgradeshop.ai/api/waitlist", {
          method: "POST",
          headers: { "content-type": "application/json", ...headers },
          body: JSON.stringify({ email: "a@example.com", phone: "972501234567" }),
        })
      );
    }
    function lastCall(fetchMock: ReturnType<typeof vi.fn>) {
      const [url, init] = fetchMock.mock.calls[0];
      return { url: String(url), headers: (init as RequestInit).headers as Record<string, string> };
    }
    function stubFetch() {
      const f = vi.fn().mockResolvedValue({ ok: true, json: async () => ({ contactId: "c9", created: true }) });
      vi.stubGlobal("fetch", f);
      return f;
    }

    afterEach(() => {
      vi.unstubAllEnvs();
    });

    it("sends the site key and the trusted IP, and never leaks the key in the response", async () => {
      vi.stubEnv("COURSES_SERVICE_KEY", "tsk_test_placeholder");
      const f = stubFetch();
      const res = await post({ "x-real-ip": "198.51.100.7" });
      const { headers } = lastCall(f);
      expect(headers["x-service-key"]).toBe("tsk_test_placeholder");
      expect(headers["x-tus-end-user-ip"]).toBe("198.51.100.7");
      expect(await res.text()).not.toContain("tsk_test_placeholder");
    });

    it("does not forward a client-sent leftmost x-forwarded-for hop", async () => {
      const f = stubFetch();
      await post({ "x-forwarded-for": "6.6.6.6, 203.0.113.5" });
      expect(lastCall(f).headers["x-tus-end-user-ip"]).toBe("203.0.113.5");
    });

    it("takes the domain from SITE_DOMAIN when set", async () => {
      vi.stubEnv("SITE_DOMAIN", " staging.upgradeshop.ai ");
      vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://upgradeshop.ai");
      const f = stubFetch();
      await post({ "x-real-ip": "198.51.100.8" });
      expect(lastCall(f).url).toContain("domain=staging.upgradeshop.ai");
    });

    it("falls back to the public URL host when SITE_DOMAIN is unset", async () => {
      vi.stubEnv("SITE_DOMAIN", "");
      vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://upgradeshop.ai");
      const f = stubFetch();
      await post({ "x-real-ip": "198.51.100.9" });
      expect(lastCall(f).url).toContain("domain=upgradeshop.ai");
    });
  });
});
