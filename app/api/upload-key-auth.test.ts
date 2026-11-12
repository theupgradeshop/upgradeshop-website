// @vitest-environment node
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { NextRequest } from "next/server";

// ROUTES_DIR lets the red proof point at a scratch copy of the pre-fix routes.
const base = process.env.ROUTES_DIR ?? "";
const live: Record<string, () => Promise<any>> = {
  "media/browse": () => import("./media/browse/route"),
  "media/move": () => import("./media/move/route"),
  uploads: () => import("./uploads/route"),
};
const load = (p: string) => (base ? import(/* @vite-ignore */ `${base}/${p}/route.ts`) : live[p]());

const URL_ = "http://localhost/api/x";
const styles = {
  "browse (header)": {
    route: "media/browse",
    call: (m: any, key?: string) =>
      m.GET(new NextRequest(URL_, { headers: key ? { "X-API-Key": key } : {} })),
  },
  "move (body apiKey)": {
    route: "media/move",
    call: (m: any, key?: string) =>
      m.PUT(new NextRequest(URL_, { method: "PUT", body: JSON.stringify({ apiKey: key, sourcePath: "a", destPath: "b" }) })),
  },
  "uploads (form apiKey)": {
    route: "uploads",
    call: (m: any, key?: string) => {
      const fd = new FormData();
      if (key) fd.set("apiKey", key);
      return m.POST(new NextRequest(URL_, { method: "POST", body: fd }));
    },
  },
} as const;

describe.each(Object.entries(styles))("%s", (_n, s) => {
  const saved = process.env.UPLOAD_API_KEY;
  beforeEach(() => { delete process.env.UPLOAD_API_KEY; });
  afterEach(() => { if (saved === undefined) delete process.env.UPLOAD_API_KEY; else process.env.UPLOAD_API_KEY = saved; });

  it("env unset + no key -> 401", async () => {
    const res = await s.call(await load(s.route));
    expect(res.status).toBe(401);
  });
  it("env set + wrong key -> 401", async () => {
    process.env.UPLOAD_API_KEY = "test-right";
    const res = await s.call(await load(s.route), "test-wrong");
    expect(res.status).toBe(401);
  });
  it("env set + right key -> not 401", async () => {
    process.env.UPLOAD_API_KEY = "test-right";
    const res = await s.call(await load(s.route), "test-right");
    expect(res.status).not.toBe(401);
  });
});
