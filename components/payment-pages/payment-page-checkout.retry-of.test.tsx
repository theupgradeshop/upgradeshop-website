/** A buyer's retry on a page with a usage limit sends retryOf (customer-websites-bba7). Run with the site's vitest. */
import { describe, it, expect, beforeAll, beforeEach, afterEach, vi } from "vitest";
import { render, screen, waitFor, fireEvent, cleanup, act } from "@testing-library/react";

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
/** Every order id the page asked /payment/begin about, in call order. */
const beginCalls: string[] = [];
let beginAnswer: { status: number; body: Record<string, unknown> };

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
    // The payment instruction is not under test: by default the order stays on its payment step.
    const begun = u.match(/\/orders\/([^/]+)\/payment\/begin$/);
    if (begun) {
      beginCalls.push(begun[1]);
      return { ok: beginAnswer.status < 400, status: beginAnswer.status, json: async () => beginAnswer.body };
    }
    return { ok: true, status: 200, json: async () => ({ success: true, viewId: "view-1" }) };
  }));
}

/** Lets the effects and the answers a click started finish, so none reaches a fetch after the test's stub is gone. */
const settle = () => act(async () => { await new Promise((r) => setTimeout(r, 0)); });

function mount() {
  render(<PaymentPageCheckout paymentPage={PAGE} slug={SLUG} />);
}
async function fillDetails() {
  fireEvent.change(await screen.findByLabelText(/First Name/), { target: { value: "Dana" } });
  fireEvent.change(screen.getByLabelText(/Last Name/), { target: { value: "Levi" } });
  fireEvent.change(screen.getByLabelText(/Email/), { target: { value: "dana@example.com" } });
  fireEvent.change(screen.getByLabelText(/Phone/), { target: { value: "0501234567" } });
  fireEvent.click(document.querySelector("#terms") as HTMLElement);
}
async function clickPay() {
  await waitFor(() => expect((screen.getByRole("button", { name: /Pay/ }) as HTMLButtonElement).disabled).toBe(false), { timeout: 4000 });
  fireEvent.click(screen.getByRole("button", { name: /Pay/ }));
}

/** One buyer submit on a fresh mount; resolves once the checkout call was made and, for a paid order, /payment/begin was asked about it. */
async function submit(expectedCalls: number) {
  mount();
  await fillDetails();
  await clickPay();
  await waitFor(() => expect(checkoutBodies.length).toBe(expectedCalls), { timeout: 4000 });
  const order = answer.order as { id: string };
  if (answer.requiresPayment) await waitFor(() => expect(beginCalls).toContain(order.id), { timeout: 4000 });
  await settle();
}
const stored = () => sessionStorage.getItem(KEY);

beforeEach(() => {
  sessionStorage.clear();
  localStorage.clear();
  checkoutBodies.length = 0;
  beginCalls.length = 0;
  beginAnswer = { status: 500, body: { code: "internal_error" } };
  answer = held("o1", "tok-1");
  stubPlatform();
});
afterEach(async () => {
  await settle();
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
    await settle();
  });

  it("a later submit sends the stored values, and the newer answer replaces them", async () => {
    await submit(1);
    await waitFor(() => expect(stored()).not.toBeNull());
    cleanup(); // the buyer comes back to the page (a reload keeps the tab's storage)
    answer = held("o2", "tok-2");
    await submit(2);
    expect(checkoutBodies[1].retryOf).toEqual({ orderId: "o1", ownershipToken: "tok-1" });
    await waitFor(() => expect(JSON.parse(stored()!)).toEqual({ orderId: "o2", ownershipToken: "tok-2" }));
    await settle();
  });

  it("sends exactly the two proof keys even when the stored JSON carries more", async () => {
    sessionStorage.setItem(KEY, JSON.stringify({ orderId: "o0", ownershipToken: "tok-0", extra: 1 }));
    await submit(1);
    expect(Object.keys(checkoutBodies[0].retryOf as object).sort()).toEqual(["orderId", "ownershipToken"]);
    expect(checkoutBodies[0].retryOf).toEqual({ orderId: "o0", ownershipToken: "tok-0" });
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
    // The answer was still taken: the page went on to ask for the payment of that very order.
    expect(beginCalls).toEqual(["o1"]);
  });
});

// upgradeshop.ai reaches success by more than one road, and reuses an order a failed begin left behind.
describe("PaymentPageCheckout (upgradeshop.ai): the proof across success roads and order reuse", () => {
  const keyWrites = (spy: { mock: { calls: unknown[][] } }) => spy.mock.calls.filter((c) => c[0] === KEY);

  it("a paid order whose begin answers kind none reaches success and clears the proof", async () => {
    const setItem = vi.spyOn(Storage.prototype, "setItem");
    beginAnswer = { status: 200, body: { kind: "none" } };
    await submit(1);
    expect(keyWrites(setItem).length).toBe(1); // it was kept at the checkout answer ...
    await waitFor(() => expect(stored()).toBeNull()); // ... and cleared at success
  });

  it("a paid order whose card charge answers paid reaches success and clears the proof", async () => {
    let onToken: ((r: unknown) => Promise<void>) | null = null;
    const w = window as unknown as Record<string, unknown>;
    w.jQuery = () => ({ trigger: () => {} });
    w.OfficeGuy = {
      Payments: {
        InitEditors: () => {},
        BindFormSubmit: (cfg: { ResponseCallback: (r: unknown) => Promise<void> }) => { onToken = cfg.ResponseCallback; },
      },
    };
    try {
      beginAnswer = { status: 200, body: { kind: "client_instrument", provider: "sumit", publicConfig: { companyId: 1, apiPublicKey: "k" } } };
      const inner = globalThis.fetch;
      vi.stubGlobal("fetch", vi.fn(async (url: string, init?: { body?: string }) => {
        if (String(url).endsWith("/orders/o1/payment/execute")) return { ok: true, status: 200, json: async () => ({ status: "paid", transactionId: "t1" }) };
        return inner(url, init as never);
      }));
      await submit(1);
      await waitFor(() => expect(onToken).not.toBeNull(), { timeout: 4000 });
      expect(stored()).not.toBeNull(); // the order is paid-pending: the proof is still held
      await act(async () => { await onToken!({ Status: 0, Data: { SingleUseToken: "single-use" } }); });
      await waitFor(() => expect(stored()).toBeNull());
    } finally {
      delete w.jQuery;
      delete w.OfficeGuy;
    }
  });

  it.each([
    ["reuse_placed", "gateway_unreachable"],
    ["reuse_held", "internal_error"],
  ])("%s: a second Pay click begins the same order, with no new checkout and no read or write of the proof", async (_branch, code) => {
    beginAnswer = { status: 500, body: { code } };
    await submit(1);
    await waitFor(() => expect(JSON.parse(stored()!)).toEqual({ orderId: "o1", ownershipToken: "tok-1" }));
    const getItem = vi.spyOn(Storage.prototype, "getItem");
    const setItem = vi.spyOn(Storage.prototype, "setItem");
    const removeItem = vi.spyOn(Storage.prototype, "removeItem");
    await clickPay();
    await waitFor(() => expect(beginCalls).toEqual(["o1", "o1"]), { timeout: 4000 });
    await settle();
    expect(checkoutBodies.length).toBe(1);
    expect(keyWrites(getItem)).toEqual([]);
    expect(keyWrites(setItem)).toEqual([]);
    expect(keyWrites(removeItem)).toEqual([]);
    expect(JSON.parse(stored()!)).toEqual({ orderId: "o1", ownershipToken: "tok-1" });
  });
});
