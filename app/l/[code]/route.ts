// GET /l/[code] — a short link of this site's account (dashboard: social.short_links).
//
// The site holds no data: the code is validated against SHORT_CODE_RE (else a bare 404 WITHOUT calling the
// dashboard), resolved by the dashboard's public resolver server-side, and the visitor is redirected ONLY to
// the Location the dashboard returned. The request's query string (?url=, ?next=...) is never read, so this
// can never be an open redirect.
//
// `/l/__ush_probe` answers locally with 204 + `x-ush-short-links: 1`: the dashboard's probe uses it to learn
// that this site carries the short-link route.
//
// Client IP: the dashboard trusts X-Real-IP / the last X-Forwarded-For hop (neither can be set by a server-side
// call from this site) and `x-tus-end-user-ip` only on service-keyed calls. So `siteKeyHeaders(request)` sends
// `x-service-key` (COURSES_SERVICE_KEY, server-only) + the visitor's IP, and the rate limit is per visitor. With no
// key configured the headers are omitted and the dashboard limits per site.
//
// Middleware: /l/ is excluded (like /d/) so the request reaches this handler untouched.
import { NextResponse } from "next/server";
import { PROBE_CODE, SHORT_CODE_RE, resolveShortLink } from "@/lib/short-link";

const NOT_FOUND_HEADERS = { "cache-control": "no-store", "x-robots-tag": "noindex" };

function notFound() {
  return new NextResponse("Not found", {
    status: 404,
    headers: { ...NOT_FOUND_HEADERS, "content-type": "text/plain; charset=utf-8" },
  });
}

export async function GET(request: Request, { params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;

  if (code === PROBE_CODE) {
    return new Response(null, { status: 204, headers: { "x-ush-short-links": "1", "cache-control": "no-store" } });
  }
  if (!SHORT_CODE_RE.test(code)) return notFound();

  const result = await resolveShortLink(code, request);
  if (result.kind === "redirect") {
    // Whatever is wrong with the dashboard's Location (unparseable, not https, credentials, a character a header
    // cannot carry), the visitor gets the plain 404: never a 500 and never the value echoed back.
    try {
      const target = new URL(result.location);
      if (target.protocol !== "https:" || target.username || target.password) return notFound();
      // A plain Response keeps the Location byte-exact (NextResponse.redirect would re-serialise it).
      return new Response(null, {
        status: 302,
        headers: { location: result.location, "cache-control": "no-store", "x-robots-tag": "noindex" },
      });
    } catch {
      return notFound();
    }
  }
  if (result.kind === "rate_limited") {
    return new NextResponse("Too many requests", {
      status: 429,
      headers: { ...NOT_FOUND_HEADERS, "retry-after": "60", "content-type": "text/plain; charset=utf-8" },
    });
  }
  return notFound();
}
