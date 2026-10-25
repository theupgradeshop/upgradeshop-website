/**
 * Short links (`/l/<code>`): the code is validated here, resolved by the dashboard server-side, and the
 * visitor is sent ONLY to the `Location` the dashboard returned. Nothing from the request (query string,
 * headers, path beyond the validated code) ever reaches the redirect target.
 */
import { PLATFORM_URL, DOMAIN } from "@/lib/platform-env";
import { siteKeyHeaders } from "@/lib/site-key-headers";

export const SHORT_CODE_RE = /^[A-Za-z0-9]{5,12}$/;
export const PROBE_CODE = "__ush_probe";
const RESOLVE_TIMEOUT_MS = 5000;
const REDIRECT_STATUSES: ReadonlySet<number> = new Set([301, 302, 303, 307, 308]);

export type ShortLinkResult =
  | { kind: "redirect"; location: string }
  | { kind: "rate_limited" }
  | { kind: "not_found" };

/** The dashboard validates https targets when saved; the site refuses anything else as defence in depth. */
function isHttpsTarget(value: string): boolean {
  try {
    const u = new URL(value);
    return u.protocol === "https:" && !u.username && !u.password;
  } catch {
    return false;
  }
}

/** Resolves a code that already passed SHORT_CODE_RE; `request` is the visitor's, for the site-key + end-user-IP headers. */
export async function resolveShortLink(code: string, request: Request): Promise<ShortLinkResult> {
  if (!DOMAIN) return { kind: "not_found" };
  const url = `${PLATFORM_URL.replace(/\/+$/, "")}/api/public/marketing-social/l/${encodeURIComponent(code)}?host=${encodeURIComponent(DOMAIN)}`;
  try {
    // manual: the dashboard's 302 is read, never followed; the Location is vetted before it is used.
    const res = await fetch(url, { headers: siteKeyHeaders(request), redirect: "manual", cache: "no-store", signal: AbortSignal.timeout(RESOLVE_TIMEOUT_MS) });
    if (res.status === 429) return { kind: "rate_limited" };
    const location = res.headers.get("location");
    if (REDIRECT_STATUSES.has(res.status) && location && isHttpsTarget(location)) {
      return { kind: "redirect", location };
    }
    return { kind: "not_found" };
  } catch {
    return { kind: "not_found" };
  }
}
