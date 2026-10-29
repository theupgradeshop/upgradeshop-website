/**
 * Coupon-in-link helpers. A link `<any page>?coupon=CODE` parks the code in localStorage
 * ("pending"); the checkout validates it with the normal coupon call and applies it.
 * A pending code is never sent to checkout unless it validated (the dashboard rejects invalid ones).
 * Same names/shape on every storefront built from this template so the sites stay in step.
 */

export const PENDING_COUPON_KEY = 'pending_coupon';
export const PENDING_COUPON_TTL_MS = 30 * 24 * 60 * 60 * 1000;

const MAX_CODE_LENGTH = 64;

/**
 * Trim + uppercase; accept 1-64 chars with no whitespace or control characters, else null.
 * Matches the dashboard: `validateCoupon` looks the code up with `code.toUpperCase()` (no trim there,
 * the storefront trims before sending).
 */
export function normalizeCouponCode(raw: unknown): string | null {
  if (typeof raw !== 'string') return null;
  const code = raw.trim().toUpperCase();
  if (code.length < 1 || code.length > MAX_CODE_LENGTH) return null;
  if (/[\s\p{Cc}]/u.test(code)) return null;
  return code;
}

export interface PendingCoupon {
  code: string;
  savedAt: number;
}

function removeKey(): void {
  try {
    window.localStorage.removeItem(PENDING_COUPON_KEY);
  } catch {
    /* storage unavailable */
  }
}

/** Expired or malformed entries are removed and read as null. */
export function readPendingCoupon(now: number = Date.now()): PendingCoupon | null {
  let raw: string | null = null;
  try {
    raw = window.localStorage.getItem(PENDING_COUPON_KEY);
  } catch {
    return null;
  }
  if (raw === null) return null;
  try {
    const parsed = JSON.parse(raw) as { code?: unknown; savedAt?: unknown } | null;
    const code = normalizeCouponCode(parsed?.code);
    const savedAt = parsed?.savedAt;
    if (
      !parsed ||
      code === null ||
      typeof savedAt !== 'number' ||
      !Number.isFinite(savedAt) ||
      savedAt > now + 60_000 ||
      now - savedAt > PENDING_COUPON_TTL_MS
    ) {
      removeKey();
      return null;
    }
    return { code, savedAt };
  } catch {
    removeKey();
    return null;
  }
}

/** Saves a normalised code, replacing any older one. Returns false when the code is invalid or storage fails. */
export function savePendingCoupon(code: string, now: number = Date.now()): boolean {
  const normalized = normalizeCouponCode(code);
  if (normalized === null) return false;
  try {
    window.localStorage.setItem(PENDING_COUPON_KEY, JSON.stringify({ code: normalized, savedAt: now }));
    return true;
  } catch {
    return false;
  }
}

export function clearPendingCoupon(): void {
  removeKey();
}
