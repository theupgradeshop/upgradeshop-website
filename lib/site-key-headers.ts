/**
 * Site-key headers for the Link in bio calls (`/links`, `/l/[code]`). Only these two functions are taken from the
 * base template's lib/portal-login.ts (this site has no portal login); bodies are identical. `clientIp` is this
 * site's own lib/client-ip.ts (same rule as the template's lib/rate-limit.ts: X-Real-IP, else last X-Forwarded-For hop).
 */
import { clientIp } from '@/lib/client-ip';

/**
 * This site's per-customer key and the visitor's trusted IP, for a call that records a click.
 * No key configured means no headers (the call still works on routes that ignore them).
 */
export function siteKeyHeaders(request: Request): Record<string, string> {
  const keyHeaders = siteKeyOnlyHeaders();
  if (!keyHeaders['x-service-key']) return {};
  return { ...keyHeaders, 'x-tus-end-user-ip': clientIp(request) };
}

/** Just `x-service-key` (or `{}` with no key configured), for shared cached reads that must not vary per visitor. */
export function siteKeyOnlyHeaders(): Record<string, string> {
  const siteKey = (process.env.COURSES_SERVICE_KEY || '').trim();
  return siteKey ? { 'x-service-key': siteKey } : {};
}
