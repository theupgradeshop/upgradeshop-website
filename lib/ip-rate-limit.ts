/**
 * Simple in-memory per-IP rate limiter (one counter map per limiter). Moved out of app/api/waitlist/route.ts
 * unchanged (5 requests per IP per 10 minutes there) so other public routes can reuse it.
 */
export function createIpRateLimiter(windowMs: number, max: number): (ip: string) => boolean {
  const ipRequests = new Map<string, number[]>();
  return function isRateLimited(ip: string): boolean {
    const now = Date.now();
    const requests = ipRequests.get(ip) || [];
    const recent = requests.filter((t) => now - t < windowMs);
    if (recent.length >= max) return true;
    recent.push(now);
    ipRequests.set(ip, recent);
    return false;
  };
}
