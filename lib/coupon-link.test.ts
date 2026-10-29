import { describe, it, expect, beforeEach, vi, afterEach } from "vitest";
import {
  PENDING_COUPON_KEY,
  PENDING_COUPON_TTL_MS,
  normalizeCouponCode,
  readPendingCoupon,
  savePendingCoupon,
  clearPendingCoupon,
} from "./coupon-link";

beforeEach(() => localStorage.clear());
afterEach(() => vi.restoreAllMocks());

describe("normalizeCouponCode", () => {
  it("trims and uppercases", () => {
    expect(normalizeCouponCode("  save10 ")).toBe("SAVE10");
  });
  it("accepts 1 and 64 chars, rejects 0 and 65", () => {
    expect(normalizeCouponCode("a")).toBe("A");
    expect(normalizeCouponCode("a".repeat(64))).toBe("A".repeat(64));
    expect(normalizeCouponCode("a".repeat(65))).toBeNull();
    expect(normalizeCouponCode("   ")).toBeNull();
    expect(normalizeCouponCode("")).toBeNull();
  });
  it("rejects inner whitespace and control characters", () => {
    expect(normalizeCouponCode("SAVE 10")).toBeNull();
    expect(normalizeCouponCode("SAVE\t10")).toBeNull();
    expect(normalizeCouponCode("SAVE\u000010")).toBeNull();
    expect(normalizeCouponCode("SAVE 10")).toBeNull();
  });
  it("rejects non-strings", () => {
    expect(normalizeCouponCode(null)).toBeNull();
    expect(normalizeCouponCode(undefined)).toBeNull();
    expect(normalizeCouponCode(5)).toBeNull();
  });
});

describe("pending coupon storage", () => {
  it("round-trips and replaces an older code", () => {
    expect(savePendingCoupon("first", 1000)).toBe(true);
    expect(savePendingCoupon("second", 2000)).toBe(true);
    expect(readPendingCoupon(3000)).toEqual({ code: "SECOND", savedAt: 2000 });
  });
  it("does not save an invalid code", () => {
    expect(savePendingCoupon("bad code")).toBe(false);
    expect(localStorage.getItem(PENDING_COUPON_KEY)).toBeNull();
  });
  it("expires after 30 days and removes the key", () => {
    savePendingCoupon("old", 1000);
    expect(readPendingCoupon(1000 + PENDING_COUPON_TTL_MS)).not.toBeNull();
    expect(readPendingCoupon(1000 + PENDING_COUPON_TTL_MS + 1)).toBeNull();
    expect(localStorage.getItem(PENDING_COUPON_KEY)).toBeNull();
  });
  it("malformed JSON or shape reads null and is removed", () => {
    for (const bad of ["{not json", "null", JSON.stringify({ code: "A" }), JSON.stringify({ code: "a b", savedAt: 1 }), JSON.stringify({ code: "A", savedAt: "x" })]) {
      localStorage.setItem(PENDING_COUPON_KEY, bad);
      expect(readPendingCoupon(2000)).toBeNull();
      expect(localStorage.getItem(PENDING_COUPON_KEY)).toBeNull();
    }
  });
  it("clearPendingCoupon removes it", () => {
    savePendingCoupon("x");
    clearPendingCoupon();
    expect(readPendingCoupon()).toBeNull();
  });
  it("never throws when storage throws", () => {
    const boom = () => { throw new Error("denied"); };
    vi.spyOn(Storage.prototype, "getItem").mockImplementation(boom);
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(boom);
    vi.spyOn(Storage.prototype, "removeItem").mockImplementation(boom);
    expect(readPendingCoupon()).toBeNull();
    expect(savePendingCoupon("x")).toBe(false);
    expect(() => clearPendingCoupon()).not.toThrow();
  });
});
