/** Coupon in a link on the payment page. Run with `npm test`. */
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { render, screen, waitFor, fireEvent, cleanup } from "@testing-library/react";

vi.mock("next/image", () => ({ default: (p: Record<string, unknown>) => <span data-src={String(p.src)} /> }));

import { PaymentPageCheckout } from "./payment-page-checkout";
import { PENDING_COUPON_KEY, savePendingCoupon } from "@/lib/coupon-link";

const API = "https://app.staging.upgradeshop.ai/api/public/payment-pages/bundle-page";
const BUNDLE = "bundle-1";
const TIER_A = "tier-a";

function bundleQuote(extra: Record<string, unknown> = {}) {
  return {
    lines: [
      { kind: "bundle", itemIndex: 0, productId: BUNDLE, variantId: TIER_A, name: "Base package", variantTitle: "Managed", quantity: 1, unitPrice: 490, originalUnitPrice: 490, lineTotal: 490, billingCycle: "monthly" },
    ],
    subtotal: 490, itemDiscount: 0, globalDiscount: 0, couponDiscount: 0, totalDiscount: 0, extraTotal: 0, shippingAmount: 0, total: 490,
    recurring: [{ billingCycle: "monthly", amount: 490 }],
    coupon: null,
    selections: { bundleSelections: { [BUNDLE]: { selectedVariantId: TIER_A, selectedAddonProductIds: [] } } },
    currency: "USD",
    ...extra,
  };
}

const CATALOGUE = [
  {
    itemIndex: 0, productId: BUNDLE, lockedVariantId: null,
    tiers: [{ id: TIER_A, title: "Managed", price: 490, setupFee: 0, billingCycle: "monthly", available: true, position: 0 }],
    addons: [],
    defaultSelection: { selectedVariantId: TIER_A, selectedAddonProductIds: [] },
  },
];

function page(over: Record<string, unknown> = {}) {
  return {
    id: "pp1", slug: "bundle-page", title: "Packages", description: null, language: "en",
    items: [{ product: { id: BUNDLE, name: "Base package", description: null, image_url: null }, quantity: 1, effectivePrice: 0, originalPrice: 0 }],
    coupon: null, subtotal: 0, discount: 0, total: 0,
    restrictions: { expiresAt: null, usageRemaining: null },
    quote: { ...bundleQuote(), catalogue: CATALOGUE },
    quoteRefusal: null,
    ...over,
  };
}

const quoteBodies: Array<{ couponCode?: string }> = [];

/** Answers the view beacon and every quote; `coupon` builds the quote's coupon block for a code that was sent. */
function stubPlatform(coupon: (code: string) => Record<string, unknown>) {
  vi.stubGlobal("fetch", vi.fn(async (url: string, init?: { body?: string }) => {
    if (String(url) === `${API}/quote`) {
      const body = JSON.parse(init!.body!);
      quoteBodies.push(body);
      return { ok: true, status: 200, json: async () => ({ quote: bundleQuote(body.couponCode ? { coupon: coupon(body.couponCode) } : {}) }) };
    }
    return { ok: true, status: 200, json: async () => ({ success: true, viewId: "view-1" }) };
  }));
}

const couponBox = () => screen.getByLabelText(/Coupon code/) as HTMLInputElement;

beforeEach(() => {
  localStorage.clear();
  quoteBodies.length = 0;
});
afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

describe("PaymentPageCheckout: coupon in a link", () => {
  it("asks the quote about the pending code and shows it applied", async () => {
    savePendingCoupon("spring10");
    stubPlatform((code) => ({ status: "applied", code }));
    render(<PaymentPageCheckout paymentPage={page()} slug="bundle-page" />);
    await waitFor(() => expect(quoteBodies.some((b) => b.couponCode === "SPRING10")).toBe(true), { timeout: 3000 });
    expect(couponBox().value).toBe("SPRING10");
    expect(await screen.findByText(/Coupon applied: SPRING10/)).toBeTruthy();
  });

  it("ignores the pending code when the page has its own coupon", async () => {
    savePendingCoupon("LINK");
    stubPlatform((code) => ({ status: "applied", code }));
    render(<PaymentPageCheckout paymentPage={page({ coupon: { code: "PAGE", discountType: "percentage", discountValue: 10 } })} slug="bundle-page" />);
    await waitFor(() => expect(couponBox().value).toBe(""));
    await new Promise((r) => setTimeout(r, 800));
    expect(quoteBodies.every((b) => !b.couponCode)).toBe(true);
  });

  it("clears the pending code when the quote refuses it", async () => {
    savePendingCoupon("NOPE");
    stubPlatform((code) => ({ status: "refused", code, reason: "not_valid" }));
    render(<PaymentPageCheckout paymentPage={page()} slug="bundle-page" />);
    await waitFor(() => expect(quoteBodies.some((b) => b.couponCode === "NOPE")).toBe(true), { timeout: 3000 });
    await waitFor(() => expect(localStorage.getItem(PENDING_COUPON_KEY)).toBeNull());
  });

  it("a typed coupon the quote accepts replaces the pending one", async () => {
    savePendingCoupon("LINK");
    stubPlatform((code) => ({ status: "applied", code }));
    render(<PaymentPageCheckout paymentPage={page()} slug="bundle-page" />);
    await waitFor(() => expect(couponBox().value).toBe("LINK"));
    await screen.findByText(/Coupon applied: LINK/);
    expect(localStorage.getItem(PENDING_COUPON_KEY)).not.toBeNull();
    fireEvent.change(couponBox(), { target: { value: "TYPED" } });
    fireEvent.click(screen.getByRole("button", { name: /Apply/ }));
    await waitFor(() => expect(quoteBodies.some((b) => b.couponCode === "TYPED")).toBe(true), { timeout: 3000 });
    await waitFor(() => expect(localStorage.getItem(PENDING_COUPON_KEY)).toBeNull());
  });

  it("a typed coupon the quote refuses leaves the link coupon pending", async () => {
    savePendingCoupon("LINK");
    stubPlatform((code) => (code === "BAD" ? { status: "refused", code, reason: "not_valid" } : { status: "applied", code }));
    render(<PaymentPageCheckout paymentPage={page()} slug="bundle-page" />);
    await screen.findByText(/Coupon applied: LINK/);
    fireEvent.change(couponBox(), { target: { value: "BAD" } });
    fireEvent.click(screen.getByRole("button", { name: /Apply/ }));
    await waitFor(() => expect(quoteBodies.some((b) => b.couponCode === "BAD")).toBe(true), { timeout: 3000 });
    await screen.findByText(/This code was not applied/);
    expect(JSON.parse(localStorage.getItem(PENDING_COUPON_KEY)!).code).toBe("LINK");
  });
});
