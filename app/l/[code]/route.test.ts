// GET /l/[code] — the Link in bio short links. The dashboard resolver is mocked; every response path is asserted.
import { describe, it, expect, beforeEach, vi } from "vitest";
import { NextRequest } from "next/server";

vi.hoisted(() => {
  process.env.NEXT_PUBLIC_UPGRADESHOP_API_URL = "https://platform.test/";
  process.env.NEXT_PUBLIC_SITE_DOMAIN = "site.test";
});

import { GET } from "./route";

const fetchMock = vi.fn();

function call(code: string, query = "", headers: Record<string, string> = {}) {
  return GET(new NextRequest(`http://localhost/l/${code}${query}`, { headers }), { params: Promise.resolve({ code }) });
}
function resolver(status: number, location?: string) {
  fetchMock.mockResolvedValueOnce(new Response(null, { status, headers: location ? { location } : {} }));
}

describe("GET /l/[code]", () => {
  beforeEach(() => {
    fetchMock.mockReset();
    vi.stubGlobal("fetch", fetchMock);
    delete process.env.COURSES_SERVICE_KEY;
  });

  it("answers the probe locally: 204 + x-ush-short-links, no dashboard call", async () => {
    const res = await call("__ush_probe");
    expect(res.status).toBe(204);
    expect(res.headers.get("x-ush-short-links")).toBe("1");
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it.each(["abcd", "abcdefghijklm", "ab-cd1", "ab cd1", "ab.cd12", "%2e%2e%2fx", "__ush_probe2", "abcd_"])(
    "a bad code %j is a 404 without calling the dashboard",
    async (code) => {
      const res = await call(code);
      expect(res.status).toBe(404);
      expect(fetchMock).not.toHaveBeenCalled();
    },
  );

  it("redirects to exactly the Location the dashboard returned, server-side, for this site's host", async () => {
    resolver(302, "https://shop.example/offer?utm_source=instagram&x=1");
    const res = await call("aB3dE9");
    expect(res.status).toBe(302);
    expect(res.headers.get("location")).toBe("https://shop.example/offer?utm_source=instagram&x=1");
    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe("https://platform.test/api/public/marketing-social/l/aB3dE9?host=site.test");
    expect(init.redirect).toBe("manual");
  });

  it("ignores ?url= and ?next= (never an open redirect)", async () => {
    resolver(302, "https://shop.example/offer");
    const res = await call("aB3dE9", "?url=https://evil.example&next=//evil.example");
    expect(res.headers.get("location")).toBe("https://shop.example/offer");
    expect(String(fetchMock.mock.calls[0][0])).not.toContain("evil");
  });

  it("is a 404 when the dashboard says 404 or sends no usable Location", async () => {
    resolver(404);
    expect((await call("aB3dE9")).status).toBe(404);
    resolver(302);
    expect((await call("aB3dE9")).status).toBe(404);
  });

  it("refuses a non-https or credentialed Location from the dashboard", async () => {
    for (const bad of ["http://shop.example/x", "javascript:alert(1)", "//evil.example", "https://u:p@shop.example/"]) {
      resolver(302, bad);
      expect((await call("aB3dE9")).status, bad).toBe(404);
    }
  });

  it.each([
    ["a newline", "https://shop.example/a\nb"],
    ["a carriage return", "https://shop.example/a\r\nSet-Cookie: x=1"],
    ["a non-Latin1 character", "https://shop.example/\u05d0"],
    ["an invalid URL", "https://"],
    ["an http URL", "http://shop.example/x"],
  ])("answers 404, never a thrown 500, for a Location with %s", async (_name, bad) => {
    // A hand-made response: a real Response would refuse these header values before the route ever saw them.
    fetchMock.mockResolvedValueOnce({ status: 302, headers: { get: (n: string) => (n.toLowerCase() === "location" ? bad : null) } });
    const res = await call("aB3dE9");
    expect(res.status).toBe(404);
    expect(res.headers.get("location")).toBeNull();
    expect(await res.text()).toBe("Not found");
  });

  it("passes a 429 through and fails closed to 404 on a transport error", async () => {
    resolver(429);
    expect((await call("aB3dE9")).status).toBe(429);
    fetchMock.mockRejectedValueOnce(new Error("down"));
    expect((await call("aB3dE9")).status).toBe(404);
  });

  it("sends x-service-key and the visitor IP (via siteKeyHeaders) when the site key is set", async () => {
    process.env.COURSES_SERVICE_KEY = "tsk_test_key";
    resolver(302, "https://shop.example/offer");
    await call("aB3dE9", "", { "x-real-ip": "203.0.113.9" });
    const headers = (fetchMock.mock.calls[0][1] as RequestInit).headers as Record<string, string>;
    expect(headers["x-service-key"]).toBe("tsk_test_key");
    expect(headers["x-tus-end-user-ip"]).toBe("203.0.113.9");
  });

  it("sends neither header when the site key is unset", async () => {
    resolver(302, "https://shop.example/offer");
    await call("aB3dE9", "", { "x-real-ip": "203.0.113.9" });
    const headers = ((fetchMock.mock.calls[0][1] as RequestInit).headers ?? {}) as Record<string, string>;
    expect(headers).not.toHaveProperty("x-service-key");
    expect(headers).not.toHaveProperty("x-tus-end-user-ip");
  });
});
