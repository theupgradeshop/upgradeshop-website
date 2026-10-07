/**
 * Trusted client IP behind nginx. nginx sets `X-Real-IP $remote_addr` (overwriting
 * any client value) and APPENDS the real remote_addr as the LAST `X-Forwarded-For`
 * hop, so the leftmost hop is client-controlled and must never be trusted.
 * Same rule as camoflash's `lib/rate-limit.ts` clientIp.
 */
export function clientIp(request: Request): string {
  const realIp = request.headers.get("x-real-ip")?.trim();
  if (realIp) return realIp;
  const lastHop = request.headers.get("x-forwarded-for")?.split(",").pop()?.trim();
  if (lastHop) return lastHop;
  return "unknown";
}
