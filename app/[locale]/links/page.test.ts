// /links — the Link in bio page. The dashboard answer is mocked at fetch.
import { describe, it, expect, beforeEach, vi } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";

const h = vi.hoisted(() => {
  process.env.NEXT_PUBLIC_UPGRADESHOP_API_URL = "https://platform.test/";
  process.env.NEXT_PUBLIC_SITE_DOMAIN = "site.test";
  return {
    notFound: vi.fn(() => { throw new Error("NEXT_NOT_FOUND"); }),
    headers: vi.fn(async () => new Headers({ "x-real-ip": "203.0.113.9" })),
  };
});

vi.mock("next/headers", () => ({ headers: h.headers }));

vi.mock("next/navigation", () => ({ notFound: h.notFound }));

import LinksPage, { generateMetadata } from "./page";
import { parseBioAnswer } from "@/lib/bio-page";

const fetchMock = vi.fn();
const ANSWER = {
  marker: "ush-bio-1",
  page: { title: "Suzie Studio", intro: "Find me here", look: { accent: "#112233", shape: "pill", text: "red; background:url(x)" } },
  blocks: [
    { id: "b1", kind: "link", label: "My shop", href: "/l/abc12" },
    { id: "b2", kind: "whatsapp", label: "Chat", href: "/l/wa345" },
    { id: "b3", kind: "latest_posts", label: "Latest", href: null, posts: [{ imageUrl: "https://cdn.test/1.jpg", href: "/l/p0001" }, { imageUrl: "https://cdn.test/2.jpg", href: "javascript:alert(1)" }] },
    { id: "b4", kind: "social_icons", label: "Follow", href: null, ref: { networks: [{ network: "instagram", label: "Instagram", href: "https://instagram.com/x" }] } },
    { id: "b5", kind: "mystery", label: "Dropped", href: "/l/zzzzz" },
  ],
};
function answer(status: number, body?: unknown) {
  fetchMock.mockResolvedValue(new Response(body === undefined ? null : JSON.stringify(body), { status, headers: { "content-type": "application/json" } }));
}

describe("/links", () => {
  beforeEach(() => {
    fetchMock.mockReset();
    h.notFound.mockClear();
    h.headers.mockClear();
    vi.stubGlobal("fetch", fetchMock);
    delete process.env.COURSES_SERVICE_KEY;
  });

  it("renders title, intro, blocks as /l/ links and the latest-posts grid", async () => {
    answer(200, ANSWER);
    const html = renderToStaticMarkup(await LinksPage());
    expect(html).toContain("Suzie Studio");
    expect(html).toContain("Find me here");
    expect(html).toContain('href="/l/abc12"');
    expect(html).toContain(">My shop<");
    expect(html).toContain('href="/l/wa345"');
    expect(html).toContain('href="/l/p0001"');
    expect(html).toContain('src="https://cdn.test/1.jpg"');
    expect(html).toContain('aria-label="Instagram"');
    expect(html).not.toContain("Dropped");
    // A post whose href is a script scheme is not rendered.
    expect(html).not.toContain("javascript:");
    expect(html).not.toContain("2.jpg");
    expect(String(fetchMock.mock.calls[0][0])).toBe("https://platform.test/api/public/marketing-social/bio?host=site.test");
  });

  it("applies only validated look overrides on top of the Brand Hub variables", async () => {
    answer(200, ANSWER);
    const html = renderToStaticMarkup(await LinksPage());
    expect(html).toContain("--bio-accent:#112233");
    expect(html).toContain("9999px");
    expect(html).not.toContain("url(x)");
    expect(html).toContain("hsl(var(--primary))");
  });

  it("carries <meta name=\"ush-bio\" content=\"1\"> in the page metadata", async () => {
    answer(200, ANSWER);
    const meta = await generateMetadata();
    expect(meta.other).toEqual({ "ush-bio": "1" });
    expect(meta.title).toBe("Suzie Studio");
  });

  it("keeps the marker even when the API answers 404", async () => {
    answer(404);
    expect((await generateMetadata()).other).toEqual({ "ush-bio": "1" });
  });

  it("maps an API 404 to the site's normal 404", async () => {
    answer(404);
    await expect(LinksPage()).rejects.toThrow("NEXT_NOT_FOUND");
    expect(h.notFound).toHaveBeenCalled();
  });

  it("maps a transport failure and a marker-less answer to the 404 too", async () => {
    fetchMock.mockRejectedValueOnce(new Error("down"));
    await expect(LinksPage()).rejects.toThrow("NEXT_NOT_FOUND");
    answer(200, { ...ANSWER, marker: "other" });
    await expect(LinksPage()).rejects.toThrow("NEXT_NOT_FOUND");
  });

  it("sends only x-service-key (never the visitor IP) when the site key is set, and the key never reaches the markup", async () => {
    process.env.COURSES_SERVICE_KEY = "tsk_test_key";
    answer(200, ANSWER);
    const html = renderToStaticMarkup(await LinksPage());
    const headers = (fetchMock.mock.calls[0][1] as RequestInit).headers as Record<string, string>;
    expect(headers["x-service-key"]).toBe("tsk_test_key");
    expect(headers).not.toHaveProperty("x-tus-end-user-ip");
    expect(html).not.toContain("tsk_test_key");
    answer(200, ANSWER);
    await generateMetadata();
    const metaHeaders = (fetchMock.mock.calls[1][1] as RequestInit).headers as Record<string, string>;
    expect(metaHeaders["x-service-key"]).toBe("tsk_test_key");
    expect(metaHeaders).not.toHaveProperty("x-tus-end-user-ip");
  });

  it("caches the bio read for 60 seconds (next.revalidate) and still sends only the site key", async () => {
    process.env.COURSES_SERVICE_KEY = "tsk_test_key";
    answer(200, ANSWER);
    await LinksPage();
    const init = fetchMock.mock.calls[0][1] as RequestInit & { next?: { revalidate?: number } };
    expect(init.next).toEqual({ revalidate: 60 });
    expect(init.headers).toEqual({ "x-service-key": "tsk_test_key" });
  });

  it.each(["//evil.example", "/\\evil.example", "\\\\evil.example"])(
    "never renders %j as a link target (block link, social icon, latest post)",
    async (evil) => {
      answer(200, {
        marker: "ush-bio-1",
        page: { title: "T", intro: "I" },
        blocks: [
          { id: "b1", kind: "link", label: "Block", href: evil },
          { id: "b2", kind: "social_icons", label: "Icons", href: null, ref: { networks: [{ network: "x", label: "Net", href: evil }] } },
          { id: "b3", kind: "latest_posts", label: "Posts", href: null, posts: [{ imageUrl: "https://cdn.test/p.jpg", href: evil }] },
        ],
      });
      const html = renderToStaticMarkup(await LinksPage());
      expect(html).not.toContain("evil.example");
      expect(html).not.toMatch(/href="\s*[/\\]{2}/);
      expect(html).not.toContain("p.jpg");
      expect(html).not.toContain('aria-label="Net"');
      // The block keeps its label, as plain text, not as a link.
      expect(html).toContain("Block");
      expect(html).not.toMatch(/<a [^>]*>Block</);
    },
  );

  it("sends no key header when the site key is unset", async () => {
    answer(200, ANSWER);
    await LinksPage();
    const headers = ((fetchMock.mock.calls[0][1] as RequestInit).headers ?? {}) as Record<string, string>;
    expect(headers).not.toHaveProperty("x-service-key");
  });

  it("stays a shared ISR read: the page path never reads request headers", async () => {
    answer(200, ANSWER);
    await LinksPage();
    answer(200, ANSWER);
    await generateMetadata();
    expect(h.headers).not.toHaveBeenCalled();
  });

  it("parseBioAnswer rejects shapes it cannot render", () => {
    expect(parseBioAnswer(null)).toBeNull();
    expect(parseBioAnswer({ marker: "ush-bio-1", page: {}, blocks: "x" })).toBeNull();
  });
});
