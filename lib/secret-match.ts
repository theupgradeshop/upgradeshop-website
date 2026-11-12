import { createHash, timingSafeEqual } from "crypto";

/**
 * Shared-secret check for server routes. An UNSET or EMPTY expected secret never matches
 * (so a missing env var cannot turn an auth check into "accept"), a non-string `sent` never
 * matches, and the comparison is constant-time (customer-websites-708a).
 */
export function secretMatches(sent: unknown, expected: string | undefined | null): boolean {
  if (typeof expected !== "string" || expected.length === 0) return false;
  if (typeof sent !== "string" || sent.length === 0) return false;
  const a = createHash("sha256").update(sent).digest();
  const b = createHash("sha256").update(expected).digest();
  return timingSafeEqual(a, b);
}
