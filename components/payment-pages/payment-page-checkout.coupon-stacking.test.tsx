/** More than one coupon code on the payment page (DC13 U6). Run with the site's vitest. */
import { describe, it, expect, beforeAll, beforeEach, afterEach, vi } from "vitest";
import { render, screen, waitFor, fireEvent, cleanup } from "@testing-library/react";

vi.mock("next/navigation", () => ({ useRouter: () => ({ push: vi.fn(), replace: vi.fn() }) }));
vi.mock("next/image", () => ({ default: (p: Record<string, unknown>) => <span data-src={String(p.src)} /> }));

import { PaymentPageCheckout } from "./payment-page-checkout";
import { savePendingCoupon, PENDING_COUPON_KEY } from "@/lib/coupon-link";

// Each applied code waits out the 400 ms requote debounce: give a loaded machine room.
vi.setConfig({ testTimeout: 20000 });

beforeAll(() => {
  // Radix's Checkbox measures itself with ResizeObserver, which jsdom lacks.
  globalThis.ResizeObserver ??= class { observe() {} unobserve() {} disconnect() {} } as unknown as typeof ResizeObserver;
});

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

type Body = { couponCode?: string; couponCodes?: string[] };
const quoteBodies: Body[] = [];
const checkoutBodies: Body[] = [];
let checkoutAnswer: { status: number; body: Record<string, unknown> } = { status: 200, body: { success: true, order: { id: "o1", total: 490, currency: "USD" }, requiresPayment: false, redirectUrl: null } };

/** The server's answer to the codes it was sent: a code in `bad` is refused (the codes before it stay applied). */
function stubPlatform(opts: { bad?: Record<string, Record<string, unknown>>; allowCombining?: (code: string) => boolean | undefined } = {}) {
  vi.stubGlobal("fetch", vi.fn(async (url: string, init?: { body?: string }) => {
    if (String(url) === `${API}/quote`) {
      const body: Body = JSON.parse(init!.body!);
      quoteBodies.push(body);
      const sent = body.couponCodes ?? (body.couponCode ? [body.couponCode] : []);
      const applied: { code: string; discount: number; allowCombining?: boolean }[] = [];
      let refused: Record<string, unknown> | null = null;
      for (const code of sent) {
        if (opts.bad?.[code]) { refused = { status: "refused", code, ...opts.bad[code] }; break; }
        const flag = opts.allowCombining ? opts.allowCombining(code) : true;
        applied.push({ code, discount: 10 * (applied.length + 1), ...(flag === undefined ? {} : { allowCombining: flag }) });
      }
      const extra: Record<string, unknown> = {};
      if (applied.length) extra.coupons = applied;
      if (refused) extra.coupon = refused;
      else if (applied.length) extra.coupon = { status: "applied", code: applied[0].code };
      return { ok: true, status: 200, json: async () => ({ quote: bundleQuote(extra) }) };
    }
    if (String(url) === `${API}/checkout`) {
      checkoutBodies.push(JSON.parse(init!.body!));
      return { ok: checkoutAnswer.status < 400, status: checkoutAnswer.status, json: async () => checkoutAnswer.body };
    }
    return { ok: true, status: 200, json: async () => ({ success: true, viewId: "view-1" }) };
  }));
}

const box = () => screen.queryByLabelText(/Coupon code/) as HTMLInputElement | null;
const apply = (code: string) => {
  fireEvent.change(box()!, { target: { value: code } });
  fireEvent.click(screen.getByRole("button", { name: /^Apply/ }));
};
const rows = () => screen.queryAllByTestId("applied-coupon");
/** n rows are shown AND the field has been freed (it is cleared in an effect after the quote renders). */
const settled = (n: number) =>
  waitFor(() => {
    expect(rows().length).toBe(n);
    const b = box();
    if (b) expect(b.value).toBe("");
  }, { timeout: 4000 });

beforeEach(() => {
  localStorage.clear();
  quoteBodies.length = 0;
  checkoutBodies.length = 0;
  checkoutAnswer = { status: 200, body: { success: true, order: { id: "o1", total: 490, currency: "USD" }, requiresPayment: false, redirectUrl: null } };
});
afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

async function pay() {
  fireEvent.change(screen.getByLabelText(/First Name/), { target: { value: "Dana" } });
  fireEvent.change(screen.getByLabelText(/Last Name/), { target: { value: "Levi" } });
  fireEvent.change(screen.getByLabelText(/Email/), { target: { value: "dana@example.com" } });
  fireEvent.change(screen.getByLabelText(/Phone/), { target: { value: "0501234567" } });
  fireEvent.click(document.querySelector("#terms") as HTMLElement);
  await waitFor(() => expect((screen.getByRole("button", { name: /Pay/ }) as HTMLButtonElement).disabled).toBe(false), { timeout: 4000 });
  fireEvent.click(screen.getByRole("button", { name: /Pay/ }));
  await waitFor(() => expect(checkoutBodies.length).toBe(1), { timeout: 4000 });
}

async function applyTwo() {
  render(<PaymentPageCheckout paymentPage={page()} slug="bundle-page" />);
  await waitFor(() => expect(box()).toBeTruthy());
  apply("AAA");
  await settled(1);
  apply("BBB");
  await settled(2);
}

describe("PaymentPageCheckout: more than one coupon code", () => {
  it("two codes are quoted as [applied, new] and shown as two rows with the server's discounts", async () => {
    stubPlatform();
    await applyTwo();
    expect(quoteBodies.find((b) => b.couponCodes)).toMatchObject({ couponCode: "AAA", couponCodes: ["AAA", "BBB"] });
    // A single code keeps the single-code body.
    const single = quoteBodies.find((b) => b.couponCode === "AAA" && !b.couponCodes)!;
    expect(single.couponCodes).toBeUndefined();
    expect(rows()[0].textContent).toContain("AAA");
    expect(rows()[0].textContent).toContain("10");
    expect(rows()[1].textContent).toContain("BBB");
    expect(rows()[1].textContent).toContain("20");
    // The field is freed in an effect after the quote renders, so wait for it.
    await waitFor(() => expect(box()!.value).toBe(""), { timeout: 3000 });
  });

  it("a refused new code keeps the applied ones, shows the server's message and stays in the field", async () => {
    stubPlatform({ bad: { CCC: { reason: "not_combinable", message: "CCC can't be combined with AAA" } } });
    await applyTwo();
    apply("CCC");
    expect(await screen.findByText("CCC can't be combined with AAA", {}, { timeout: 4000 })).toBeTruthy();
    expect(quoteBodies[quoteBodies.length - 1].couponCodes).toEqual(["AAA", "BBB", "CCC"]);
    expect(rows().length).toBe(2);
    expect(box()!.value).toBe("CCC");
  });

  it("a refused code without a message shows the page's reason words", async () => {
    stubPlatform({ bad: { NOPE: { reason: "not_valid" } } });
    await applyTwo();
    apply("NOPE");
    expect(await screen.findByText(/This code was not applied: This code is not valid\./, {}, { timeout: 4000 })).toBeTruthy();
    expect(rows().length).toBe(2);
  });

  it("the add-another field shows only while every applied coupon allows combining", async () => {
    stubPlatform({ allowCombining: (code) => (code === "AAA" ? true : code === "BBB" ? false : undefined) });
    render(<PaymentPageCheckout paymentPage={page()} slug="bundle-page" />);
    await waitFor(() => expect(box()).toBeTruthy());
    apply("AAA");
    await settled(1);
    expect(box()).toBeTruthy(); // AAA combines
    apply("BBB");
    await settled(2);
    expect(box()).toBeNull(); // BBB does not
    // Removing the code that cannot combine re-quotes the rest and brings the field back.
    fireEvent.click(screen.getByRole("button", { name: /Remove coupon BBB/ }));
    await settled(1);
    expect(quoteBodies[quoteBodies.length - 1]).toMatchObject({ couponCode: "AAA" });
    expect(quoteBodies[quoteBodies.length - 1].couponCodes).toBeUndefined();
    await waitFor(() => expect(box()).toBeTruthy());
  });

  it("a missing allowCombining flag reads as false", async () => {
    stubPlatform({ allowCombining: () => undefined });
    render(<PaymentPageCheckout paymentPage={page()} slug="bundle-page" />);
    await waitFor(() => expect(box()).toBeTruthy());
    apply("AAA");
    await settled(1);
    expect(box()).toBeNull();
  });

  it("the field is hidden at five applied codes", async () => {
    stubPlatform();
    render(<PaymentPageCheckout paymentPage={page()} slug="bundle-page" />);
    await waitFor(() => expect(box()).toBeTruthy());
    for (let i = 1; i <= 5; i++) {
      apply(`C${i}`);
      await settled(i);
      if (i < 5) expect(box()).toBeTruthy();
    }
    expect(box()).toBeNull();
  });

  it("checkout sends only the codes the quote reports as applied, first as couponCode", async () => {
    stubPlatform({ bad: { CCC: { reason: "not_valid" } } });
    await applyTwo();
    apply("CCC");
    await screen.findByText(/This code was not applied/, {}, { timeout: 4000 });
    await pay();
    expect(checkoutBodies[0].couponCode).toBe("AAA");
    expect(checkoutBodies[0].couponCodes).toEqual(["AAA", "BBB"]);
  });

  it("one code goes as today: couponCode only", async () => {
    stubPlatform();
    render(<PaymentPageCheckout paymentPage={page()} slug="bundle-page" />);
    await waitFor(() => expect(box()).toBeTruthy());
    apply("AAA");
    await settled(1);
    await pay();
    expect(checkoutBodies[0].couponCode).toBe("AAA");
    expect("couponCodes" in checkoutBodies[0]).toBe(false);
  });

  it("coupon_not_combinable at checkout shows the server's sentence and keeps the other applied codes", async () => {
    stubPlatform();
    await applyTwo();
    checkoutAnswer = { status: 400, body: { code: "coupon_not_combinable", error: "BBB can't be combined with AAA", couponCode: "BBB", conflictsWith: ["AAA"] } };
    await pay();
    expect(await screen.findByText("BBB can't be combined with AAA", {}, { timeout: 4000 })).toBeTruthy();
    await waitFor(() => {
      const last = quoteBodies[quoteBodies.length - 1];
      expect(last.couponCode).toBe("AAA");
      expect(last.couponCodes).toBeUndefined();
    }, { timeout: 3000 });
  });

  it("coupon_not_combinable without a sentence shows the page's own word", async () => {
    stubPlatform();
    await applyTwo();
    checkoutAnswer = { status: 400, body: { code: "coupon_not_combinable", couponCode: "BBB", conflictsWith: ["AAA"] } };
    await pay();
    expect(await screen.findByText("This code cannot be combined with the other codes.", {}, { timeout: 4000 })).toBeTruthy();
  });

  it("too_many_coupons at checkout shows the sentence and keeps every code", async () => {
    stubPlatform();
    await applyTwo();
    checkoutAnswer = { status: 400, body: { code: "too_many_coupons", error: "At most 5 codes" } };
    await pay();
    expect(await screen.findByText("At most 5 codes", {}, { timeout: 4000 })).toBeTruthy();
    expect(rows().length).toBe(2);
  });

  it("the link coupon is cleared when a typed code is accepted beside it (DC9 parity)", async () => {
    savePendingCoupon("LINK");
    stubPlatform();
    render(<PaymentPageCheckout paymentPage={page()} slug="bundle-page" />);
    await waitFor(() => expect(rows().length).toBe(1), { timeout: 3000 });
    expect(localStorage.getItem(PENDING_COUPON_KEY)).not.toBeNull();
    apply("TYPED");
    await settled(2);
    expect(quoteBodies[quoteBodies.length - 1].couponCodes).toEqual(["LINK", "TYPED"]);
    await waitFor(() => expect(localStorage.getItem(PENDING_COUPON_KEY)).toBeNull());
  });
});
