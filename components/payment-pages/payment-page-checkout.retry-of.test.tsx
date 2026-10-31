/** A buyer's retry on a page with a usage limit sends retryOf (customer-websites-bba7). Run with the site's vitest. */
import { describe, it, expect, beforeAll, beforeEach, afterEach, vi } from "vitest";
import { render, screen, waitFor, fireEvent, cleanup } from "@testing-library/react";

vi.mock("next/navigation", () => ({ useRouter: () => ({ push: vi.fn(), replace: vi.fn() }) }));
vi.mock("next/image", () => ({ default: (p: Record<string, unknown>) => <span data-src={String(p.src)} /> }));

import { PaymentPageCheckout } from "./payment-page-checkout";

vi.setConfig({ testTimeout: 20000 });

beforeAll(() => {
  // Radix's Checkbox measures itself with ResizeObserver, which jsdom lacks.
  globalThis.ResizeObserver ??= class { observe() {} unobserve() {} disconnect() {} } as unknown as typeof ResizeObserver;
});

const SLUG = "bundle-page";
const KEY = `ush-pay-retry:${SLUG}`;
const API = `https://app.staging.upgradeshop.ai/api/public/payment-pages/${SLUG}`;
const BUNDLE = "bundle-1";
const TIER_A = "tier-a";

const QUOTE = {
  lines: [
    { kind: "bundle", itemIndex: 0, productId: BUNDLE, variantId: TIER_A, name: "Base package", variantTitle: "Managed", quantity: 1, unitPrice: 490, originalUnitPrice: 490, lineTotal: 490, billingCycle: "monthly" },
  ],
  subtotal: 490, itemDiscount: 0, globalDiscount: 0, couponDiscount: 0, totalDiscount: 0, extraTotal: 0, shippingAmount: 0, total: 490,
  recurring: [{ billingCycle: "monthly", amount: 490 }],
  coupon: null,
  selections: { bundleSelections: { [BUNDLE]: { selectedVariantId: TIER_A, selectedAddonProductIds: [] } } },
  currency: "USD",
};
const CATALOGUE = [
  {
    itemIndex: 0, productId: BUNDLE, lockedVariantId: null,
    tiers: [{ id: TIER_A, title: "Managed", price: 490, setupFee: 0, billingCycle: "monthly", available: true, position: 0 }],
    addons: [],
    defaultSelection: { selectedVariantId: TIER_A, selectedAddonProductIds: [] },
  },
];
const PAGE = {
  id: "pp1", slug: SLUG, title: "Packages", description: null, language: "en",
  items: [{ product: { id: BUNDLE, name: "Base package", description: null, image_url: null }, quantity: 1, effectivePrice: 0, originalPrice: 0 }],
  coupon: null, subtotal: 0, discount: 0, total: 0,
  restrictions: { expiresAt: null, usageRemaining: 3 },
  quote: { ...QUOTE, catalogue: CATALOGUE },
  quoteRefusal: null,
};

type Body = { retryOf?: unknown } & Record<string, unknown>;
const checkoutBodies: Body[] = [];
let answer: Record<string, unknown>;

const held = (id: string, token: string) => ({ success: true, order: { id, total: 490, currency: "USD" }, requiresPayment: true, ownershipToken: token });
const free = (id: string, token: string) => ({ success: true, order: { id, total: 0, currency: "USD" }, requiresPayment: false, redirectUrl: null, ownershipToken: token });

function stubPlatform() {
  vi.stubGlobal("fetch", vi.fn(async (url: string, init?: { body?: string }) => {
    const u = String(url);
    if (u === `${API}/quote`) return { ok: true, status: 200, json: async () => ({ quote: QUOTE }) };
    if (u === `${API}/checkout`) {
      checkoutBodies.push(JSON.parse(init!.body!));
      return { ok: true, status: 200, json: async () => answer };
    }
    // The payment instruction is not under test: the order stays on its payment step.
    if (u.includes("/payment/begin")) return { ok: false, status: 500, json: async () => ({ code: "internal_error" }) };
    return { ok: true, status: 200, json: async () => ({ success: true, viewId: "view-1" }) };
  }));
}

/** One buyer submit; resolves once the checkout call has been made and the form's answer has landed. */
async function submit(expectedCalls: number) {
  render(<PaymentPageCheckout paymentPage={PAGE} slug={SLUG} />);
  fireEvent.change(await screen.findByLabelText(/First Name/), { target: { value: "Dana" } });
  fireEvent.change(screen.getByLabelText(/Last Name/), { target: { value: "Levi" } });
  fireEvent.change(screen.getByLabelText(/Email/), { target: { value: "dana@example.com" } });
  fireEvent.change(screen.getByLabelText(/Phone/), { target: { value: "0501234567" } });
  fireEvent.click(document.querySelector("#terms") as HTMLElement);
  await waitFor(() => expect((screen.getByRole("button", { name: /Pay/ }) as HTMLButtonElement).disabled).toBe(false), { timeout: 4000 });
  fireEvent.click(screen.getByRole("button", { name: /Pay/ }));
  await waitFor(() => expect(checkoutBodies.length).toBe(expectedCalls), { timeout: 4000 });
}
const stored = () => sessionStorage.getItem(KEY);

beforeEach(() => {
  sessionStorage.clear();
  localStorage.clear();
  checkoutBodies.length = 0;
  answer = held("o1", "tok-1");
  stubPlatform();
});
afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

describe("PaymentPageCheckout: retryOf", () => {
  it("the first submit, with nothing stored, sends no retryOf", async () => {
    await submit(1);
    expect("retryOf" in checkoutBodies[0]).toBe(false);
  });

  it("keeps the order id and ownership token the checkout answered with", async () => {
    await submit(1);
    await waitFor(() => expect(JSON.parse(stored()!)).toEqual({ orderId: "o1", ownershipToken: "tok-1" }));
  });

  it("a later submit sends the stored values, and the newer answer replaces them", async () => {
    await submit(1);
    await waitFor(() => expect(stored()).not.toBeNull());
    cleanup(); // the buyer comes back to the page (a reload keeps the tab's storage)
    answer = held("o2", "tok-2");
    await submit(2);
    expect(checkoutBodies[1].retryOf).toEqual({ orderId: "o1", ownershipToken: "tok-1" });
    await waitFor(() => expect(JSON.parse(stored()!)).toEqual({ orderId: "o2", ownershipToken: "tok-2" }));
  });

  it.each([
    ["not JSON", "{nope"],
    ["a non-string orderId", JSON.stringify({ orderId: 7, ownershipToken: "t" })],
    ["a non-string ownershipToken", JSON.stringify({ orderId: "o0", ownershipToken: null })],
  ])("stored %s sends no retryOf and does not crash", async (_name, raw) => {
    sessionStorage.setItem(KEY, raw);
    await submit(1);
    expect("retryOf" in checkoutBodies[0]).toBe(false);
  });

  it("reaching success removes the stored proof", async () => {
    sessionStorage.setItem(KEY, JSON.stringify({ orderId: "o0", ownershipToken: "tok-0" }));
    answer = free("o3", "tok-3");
    await submit(1);
    expect(checkoutBodies[0].retryOf).toEqual({ orderId: "o0", ownershipToken: "tok-0" });
    await waitFor(() => expect(stored()).toBeNull());
  });

  it("storage that throws does not stop the submit, which then carries no retryOf", async () => {
    vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => { throw new Error("blocked"); });
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => { throw new Error("blocked"); });
    vi.spyOn(Storage.prototype, "removeItem").mockImplementation(() => { throw new Error("blocked"); });
    await submit(1);
    expect("retryOf" in checkoutBodies[0]).toBe(false);
    // The answer was still taken: the buyer reaches the payment step.
    await waitFor(() => expect(screen.queryByRole("button", { name: /^Pay/ })).toBeNull());
  });
});
