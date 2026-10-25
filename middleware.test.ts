import { describe, it, expect, vi } from "vitest";
import { NextRequest, NextResponse } from "next/server.js";

// next-intl's middleware cannot be loaded by vitest here (it imports "next/server" without the extension); a stand-in
// that rewrites to the default-locale path is enough to prove which paths reach the language routing.
vi.mock("next-intl/middleware", () => ({
  default: () => (request: NextRequest) => {
    const url = request.nextUrl.clone();
    url.pathname = `/en${url.pathname}`;
    return NextResponse.rewrite(url);
  },
}));

import middleware from "./middleware";

function req(path: string) {
  return new NextRequest(`https://upgradeshop.ai${path}`, { headers: { "accept-language": "he" } });
}

describe("middleware /l/", () => {
  it("/l/<code> passes through untouched: no redirect, no rewrite, no locale header", async () => {
    const res = await middleware(req("/l/aB3dE9"));
    expect(res.status).toBe(200);
    expect(res.headers.get("location")).toBeNull();
    expect(res.headers.get("x-middleware-rewrite")).toBeNull();
    expect(res.headers.get("x-middleware-next")).toBe("1");
  });

  it("/links is still handled by the language routing (served from app/[locale]/links)", async () => {
    const res = await middleware(req("/links"));
    expect(res.headers.get("x-middleware-rewrite")).toContain("/en/links");
  });

  it("the retired /pricing redirect still works", async () => {
    const res = await middleware(req("/pricing"));
    expect(res.status).toBe(301);
  });
});
