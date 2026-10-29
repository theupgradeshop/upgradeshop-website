import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { render, cleanup, waitFor } from "@testing-library/react";
import { CouponLinkCapture } from "./coupon-link-capture";
import { PENDING_COUPON_KEY, readPendingCoupon } from "@/lib/coupon-link";

function visit(url: string) {
  window.history.replaceState(null, "", url);
}

beforeEach(() => localStorage.clear());
afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
  visit("/");
});

describe("CouponLinkCapture", () => {
  it("saves the code uppercased and leaves the rest of the URL", async () => {
    visit("/shop?coupon=abc&x=1#h");
    render(<CouponLinkCapture />);
    expect(readPendingCoupon()?.code).toBe("ABC"); // saved synchronously, strip is deferred
    await waitFor(() => expect(window.location.pathname + window.location.search + window.location.hash).toBe("/shop?x=1#h"));
  });
  it("removes a lone coupon param without a dangling ?", async () => {
    visit("/shop?coupon=abc");
    render(<CouponLinkCapture />);
    await waitFor(() => expect(window.location.pathname + window.location.search + window.location.hash).toBe("/shop"));
  });
  it("does nothing without the param", () => {
    visit("/shop?x=1");
    render(<CouponLinkCapture />);
    expect(localStorage.getItem(PENDING_COUPON_KEY)).toBeNull();
    expect(window.location.search).toBe("?x=1");
  });
  it("does not save an invalid code but still strips it", async () => {
    visit("/shop?coupon=" + encodeURIComponent("bad code") + "&x=1");
    render(<CouponLinkCapture />);
    expect(localStorage.getItem(PENDING_COUPON_KEY)).toBeNull();
    await waitFor(() => expect(window.location.search).toBe("?x=1"));
  });
  it("replaces an older pending code", () => {
    visit("/?coupon=one");
    render(<CouponLinkCapture />);
    cleanup();
    visit("/?coupon=two");
    render(<CouponLinkCapture />);
    expect(readPendingCoupon()?.code).toBe("TWO");
  });
  it("does nothing on /preview", () => {
    visit("/preview/page?coupon=abc");
    render(<CouponLinkCapture />);
    expect(localStorage.getItem(PENDING_COUPON_KEY)).toBeNull();
    expect(window.location.search).toBe("?coupon=abc");
  });
  it("does nothing inside an iframe", () => {
    visit("/shop?coupon=abc");
    vi.spyOn(window, "self", "get").mockReturnValue({} as unknown as Window & typeof globalThis);
    render(<CouponLinkCapture />);
    expect(localStorage.getItem(PENDING_COUPON_KEY)).toBeNull();
    expect(window.location.search).toBe("?coupon=abc");
  });
});
