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
    mockDashboard({ contactId: "c1", created: true, upgraded: false, addedTags: ["waitlist"] });
    const res = await POST(makeRequest());
    expect(res.status).toBe(200);
    expect(await res.json()).toMatchObject({ success: true, contactId: "c1", created: true });
  });

  it("returns success for an existing contact that just received the waitlist tag", async () => {
    mockDashboard({ contactId: "c2", created: false, upgraded: false, addedTags: ["waitlist"] });
    const res = await POST(makeRequest());
    expect(res.status).toBe(200);
    expect(await res.json()).toMatchObject({ success: true, created: false });
  });

  it("returns 409 already_on_waitlist for an existing contact that already had the tag", async () => {
    mockDashboard({ contactId: "c3", created: false, upgraded: false, addedTags: [] });
    const res = await POST(makeRequest());
    expect(res.status).toBe(409);
    expect(await res.json()).toMatchObject({ code: "already_on_waitlist" });
  });

  it("keeps success when an older dashboard sends no addedTags", async () => {
    mockDashboard({ contactId: "c4", created: false, upgraded: false });
    const res = await POST(makeRequest());
    expect(res.status).toBe(200);
    expect(await res.json()).toMatchObject({ success: true, created: false });
  });

  it("returns 429 after 5 requests from one IP", async () => {
    mockDashboard({ contactId: "c5", created: true, addedTags: ["waitlist"] });
    const make = () =>
      new Request("https://staging.upgradeshop.ai/api/waitlist", {
        method: "POST",
        headers: { "content-type": "application/json", "x-forwarded-for": "192.0.2.99" },
        body: JSON.stringify({ email: "a@example.com", phone: "972501234567" }),
      });
    for (let i = 0; i < 5; i++) expect((await POST(make())).status).toBe(200);
    expect((await POST(make())).status).toBe(429);
  });
});
