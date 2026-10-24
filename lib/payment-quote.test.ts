/** Tests for the payment-page quote flow (lib/payment-quote.ts). */
import { describe, it, expect } from "vitest";
import {
  quoteModeOf,
  currencyOf,
  buildQuoteBody,
  createRequoter,
  payHold,
  buildCheckoutBody,
  interpretCheckoutFailure,
  summaryRows,
  quoteFractionDigitsOf,
  beginFailureHandling,
  selectionsMatch,
  selectionsKey,
  type PaymentQuote,
  type RequoteOutcome,
} from "./payment-quote";


const BUNDLE = "bundle-1";
const TIER_A = "tier-a";
const TIER_B = "tier-b";

function quote(over: Partial<PaymentQuote> = {}): PaymentQuote {
  return {
    lines: [
      { kind: "bundle", itemIndex: 0, productId: BUNDLE, variantId: TIER_A, name: "Base package", variantTitle: "Managed", quantity: 1, unitPrice: 490, originalUnitPrice: 490, lineTotal: 490, billingCycle: "monthly" },
      { kind: "setup_fee", itemIndex: 0, productId: BUNDLE, variantId: TIER_A, name: "Setup fee: Base package", variantTitle: null, quantity: 1, unitPrice: 1250, originalUnitPrice: 1250, lineTotal: 1250, billingCycle: null },
    ],
    subtotal: 490, itemDiscount: 0, globalDiscount: 0, couponDiscount: 0, totalDiscount: 0, extraTotal: 1250,
    shippingAmount: 0, total: 1740,
    recurring: [{ billingCycle: "monthly", amount: 490 }],
    coupon: null,
    selections: { bundleSelections: { [BUNDLE]: { selectedVariantId: TIER_A, selectedAddonProductIds: [] } } },
    ...over,
  };
}

describe("quoteModeOf", () => {
  it("is legacy when the dashboard sent no quote key", () => {
    expect(quoteModeOf({ total: 10 })).toEqual({ kind: "legacy" });
  });
  it("is unavailable with the refusal when the quote is null", () => {
    expect(quoteModeOf({ total: 10, quote: null, quoteRefusal: "no_items" })).toEqual({ kind: "unavailable", refusal: "no_items" });
  });
  it("never falls back to the legacy total when the quote refused", () => {
    expect(quoteModeOf({ total: 10, quote: null, quoteRefusal: "unavailable" }).kind).toBe("unavailable");
  });
  it("is a quote mode when a quote is present", () => {
    const q = quote();
    expect(quoteModeOf({ quote: q })).toEqual({ kind: "quote", quote: q });
  });
});

describe("currencyOf", () => {
  it("prefers the quote, then the page, then the legacy fallback", () => {
    expect(currencyOf({ currency: "EUR" }, { ...quote(), currency: "USD" }, "ILS")).toBe("USD");
    expect(currencyOf({ currency: "EUR" }, quote(), "ILS")).toBe("EUR");
    expect(currencyOf({}, quote(), "ILS")).toBe("ILS");
  });
});

describe("summaryRows (rendering a bundle page with a setup fee and a recurring split)", () => {
  it("lists every line, then the total and the recurring amount per cycle, all from the quote", () => {
    const rows = summaryRows(quote());
    expect(rows.map((r) => [r.type, r.amount])).toEqual([
      ["line", 490],
      ["line", 1250],
      ["total", 1740],
      ["recurring", 490],
    ]);
    expect(rows[1].label).toBe("Setup fee: Base package");
    expect(rows[3].billingCycle).toBe("monthly");
  });
  it("splits recurring per billing cycle", () => {
    const rows = summaryRows(quote({ recurring: [{ billingCycle: "monthly", amount: 49 }, { billingCycle: "yearly", amount: 500 }] }));
    expect(rows.filter((r) => r.type === "recurring").map((r) => [r.billingCycle, r.amount])).toEqual([["monthly", 49], ["yearly", 500]]);
  });

  /** Lines + discount rows + shipping must give the total (the quote's own arithmetic, shown row by row). */
  function addsUp(rows: ReturnType<typeof summaryRows>): number {
    let sum = 0;
    for (const r of rows) {
      if (r.type === "line") sum += r.amount;
      else if (r.type === "discount") sum -= r.amount;
      else if (r.type === "shipping") sum += r.amount;
    }
    return Math.round(sum * 100) / 100;
  }
  const product = (over: Partial<PaymentQuote["lines"][number]> = {}): PaymentQuote["lines"][number] => ({
    kind: "product", itemIndex: 0, productId: "p1", variantId: null, name: "Course", variantTitle: null, quantity: 1,
    unitPrice: 80, originalUnitPrice: 100, lineTotal: 80, billingCycle: null, ...over,
  });

  it("an item discount is shown once: the line at its price before the discount, one item-discount row", () => {
    const q = quote({
      lines: [product()], subtotal: 100, itemDiscount: 20, globalDiscount: 0, couponDiscount: 0, totalDiscount: 20,
      extraTotal: 0, shippingAmount: 0, total: 80, recurring: [],
    });
    const rows = summaryRows(q);
    expect(rows.map((r) => [r.type, r.label, r.amount])).toEqual([
      ["line", "Course", 100],
      ["discount", "itemDiscount", 20],
      ["total", "total", 80],
    ]);
    expect(addsUp(rows)).toBe(q.total);
  });

  it("a bound discount cap scales the three discount rows and the rows still add up", () => {
    // 100 + 100 lines; item 40, page-wide 20, coupon 20 = 80 raw, cap 40 scales each by 0.5.
    const q = quote({
      lines: [product({ unitPrice: 60, originalUnitPrice: 100, lineTotal: 60 }), product({ name: "B", unitPrice: 60, originalUnitPrice: 100, lineTotal: 60 })],
      subtotal: 200, itemDiscount: 20, globalDiscount: 10, couponDiscount: 10, totalDiscount: 40,
      extraTotal: 0, shippingAmount: 15, total: 175, recurring: [], coupon: { status: "applied", code: "X" },
    });
    const rows = summaryRows(q);
    expect(rows.filter((r) => r.type === "discount").map((r) => [r.label, r.amount])).toEqual([
      ["itemDiscount", 20], ["globalDiscount", 10], ["couponDiscount", 10],
    ]);
    expect(addsUp(rows)).toBe(q.total);
  });

  it("setup fee and add-on lines count once, a bundle line is shown at its net price", () => {
    const q = quote({
      lines: [
        { kind: "bundle", itemIndex: 0, productId: BUNDLE, variantId: TIER_A, name: "Pack", variantTitle: "Managed", quantity: 1, unitPrice: 450, originalUnitPrice: 500, lineTotal: 450, billingCycle: "monthly" },
        { kind: "setup_fee", itemIndex: 0, productId: BUNDLE, variantId: TIER_A, name: "Setup fee: Pack", variantTitle: null, quantity: 1, unitPrice: 100, originalUnitPrice: 100, lineTotal: 100, billingCycle: null },
      ],
      subtotal: 450, itemDiscount: 0, globalDiscount: 0, couponDiscount: 0, totalDiscount: 0, extraTotal: 100, shippingAmount: 0, total: 550,
    });
    const rows = summaryRows(q);
    expect(rows[0].amount).toBe(450);
    expect(addsUp(rows)).toBe(550);
  });
});

describe("buildQuoteBody", () => {
  it("sends the domain and choices, a trimmed code, and an email only when it is quotable", () => {
    const sel = { [BUNDLE]: { selectedVariantId: TIER_B, selectedAddonProductIds: ["x"] } };
    expect(buildQuoteBody("upgradeshop.ai", { selections: sel, couponCode: " SAVE ", email: "a@b.co" })).toEqual({
      domain: "upgradeshop.ai", bundleSelections: sel, couponCode: "SAVE", email: "a@b.co",
    });
    expect(buildQuoteBody("d", { selections: {}, couponCode: "", email: "not-an-email" })).toEqual({ domain: "d", bundleSelections: {} });
  });
  it("sends the page language when given", () => {
    expect(buildQuoteBody("d", { selections: {}, couponCode: "", email: "" }, "he")).toEqual({ domain: "d", bundleSelections: {}, language: "he" });
  });
});

describe("selections", () => {
  it("compares add-ons regardless of order and treats null/absent variants alike", () => {
    expect(selectionsMatch({ a: { selectedVariantId: "v", selectedAddonProductIds: ["2", "1"] } }, { a: { selectedVariantId: "v", selectedAddonProductIds: ["1", "2"] } })).toBe(true);
    expect(selectionsMatch({ a: { selectedVariantId: "v" } }, { a: { selectedVariantId: "w" } })).toBe(false);
    expect(selectionsKey({ a: { selectedVariantId: null } })).toBe(selectionsKey({ a: {} }));
  });
});

describe("createRequoter (debounce, stale answers, 429 keeps the last quote)", () => {
  function setup(responder: (n: number) => { status: number; body: unknown } | Promise<{ status: number; body: unknown }>) {
    const timers: { fn: () => void; ms: number; cleared: boolean }[] = [];
    const calls: { url: string; body: any }[] = [];
    const outcomes: RequoteOutcome[] = [];
    let pending = 0;
    const fetchFn = (async (url: string, init: any) => {
      calls.push({ url, body: JSON.parse(init.body) });
      const r = await responder(calls.length);
      return { ok: r.status >= 200 && r.status < 300, status: r.status, json: async () => r.body } as unknown as Response;
    }) as unknown as typeof fetch;
    const requoter = createRequoter({
      fetchFn, url: "https://api/quote", domain: "upgradeshop.ai", debounceMs: 400,
      setTimeoutFn: (fn, ms) => { const t = { fn, ms, cleared: false }; timers.push(t); return t; },
      clearTimeoutFn: (h) => { (h as any).cleared = true; },
      onPending: () => { pending += 1; },
      onOutcome: (o) => { outcomes.push(o); },
    });
    const flush = async () => { const live = timers.filter((t) => !t.cleared); live.forEach((t) => { t.cleared = true; t.fn(); }); await new Promise((r) => setTimeout(r, 0)); };
    return { requoter, timers, calls, outcomes, flush, pendingCount: () => pending };
  }
  const input = (variant: string) => ({ selections: { [BUNDLE]: { selectedVariantId: variant } }, couponCode: "", email: "" });

  it("debounces: three quick changes make one request with the last input", async () => {
    const h = setup(() => ({ status: 200, body: { quote: quote() } }));
    h.requoter.schedule(input("1"));
    h.requoter.schedule(input("2"));
    h.requoter.schedule(input(TIER_B));
    expect(h.pendingCount()).toBe(3);
    expect(h.timers.every((t) => t.ms === 400)).toBe(true);
    await h.flush();
    expect(h.calls.length).toBe(1);
    expect(h.calls[0].url).toBe("https://api/quote");
    expect(h.calls[0].body.bundleSelections[BUNDLE].selectedVariantId).toBe(TIER_B);
    expect(h.outcomes.map((o) => o.kind)).toEqual(["quote"]);
  });

  it("keeps the last quote on 429 and on a network error (reported as failed, never as a quote)", async () => {
    const h = setup((n) => (n === 1 ? { status: 429, body: { code: "rate_limited" } } : { status: 500, body: { error: "x" } }));
    h.requoter.schedule(input("1"));
    await h.flush();
    h.requoter.retryNow();
    await new Promise((r) => setTimeout(r, 0));
    expect(h.outcomes).toEqual([
      { kind: "failed", status: 429, code: "rate_limited" },
      { kind: "failed", status: 500, code: null },
    ]);
  });

  it("retryNow with an input asks at once, even when nothing was scheduled before (quote_required, mount)", async () => {
    const h = setup(() => ({ status: 200, body: { quote: quote() } }));
    h.requoter.retryNow();
    expect(h.calls.length).toBe(0);
    h.requoter.retryNow(input(TIER_B));
    await new Promise((r) => setTimeout(r, 0));
    expect(h.calls.length).toBe(1);
    expect(h.calls[0].body.bundleSelections[BUNDLE].selectedVariantId).toBe(TIER_B);
    expect(h.outcomes.map((o) => o.kind)).toEqual(["quote"]);
  });

  it("a 403 is the unavailable state", async () => {
    const h = setup(() => ({ status: 403, body: { reason: "expired" } }));
    h.requoter.schedule(input("1"));
    await h.flush();
    expect(h.outcomes).toEqual([{ kind: "unavailable", reason: "expired" }]);
  });

  it("drops a stale answer when a newer request was made", async () => {
    let releaseFirst: (v: { status: number; body: unknown }) => void = () => {};
    const h = setup((n) => (n === 1 ? new Promise((res) => { releaseFirst = res; }) : { status: 200, body: { quote: quote({ total: 222 }) } }));
    h.requoter.schedule(input("1"));
    await h.flush();
    h.requoter.schedule(input("2"));
    await h.flush();
    releaseFirst({ status: 200, body: { quote: quote({ total: 111 }) } });
    await new Promise((r) => setTimeout(r, 0));
    expect(h.outcomes.map((o) => (o.kind === "quote" ? o.quote.total : o.kind))).toEqual([222]);
  });
});

describe("payHold", () => {
  const selections = quote().selections.bundleSelections;
  const quoted = { selections, couponCode: "", email: "" };
  const base = { pending: false, failed: false, selections, quotedInput: quoted, current: { couponCode: "", email: "" } };
  it("holds while a quote is pending", () => {
    expect(payHold({ ...base, quote: quote(), pending: true })).toBe("pending");
  });
  it("holds on pending_email until a quote that carried the email arrives", () => {
    expect(payHold({ ...base, quote: quote({ coupon: { status: "pending_email" } }) })).toBe("pending_email");
    expect(payHold({ ...base, quote: quote({ coupon: { status: "applied", code: "X" } }) })).toBe(null);
  });
  it("a failed requote releases the email hold but not a changed selection", () => {
    const pendingEmail = quote({ coupon: { status: "pending_email" } });
    expect(payHold({ ...base, quote: pendingEmail, failed: true })).toBe(null);
    const other = { [BUNDLE]: { selectedVariantId: TIER_B, selectedAddonProductIds: [] } };
    expect(payHold({ ...base, quote: pendingEmail, failed: true, selections: other })).toBe("selections_changed");
  });
  it("a changed selection holds Pay even before the requote was asked or when it has not failed", () => {
    const other = { [BUNDLE]: { selectedVariantId: TIER_B, selectedAddonProductIds: [] } };
    expect(payHold({ ...base, quote: quote(), selections: other })).toBe("selections_changed");
  });
  it("a coupon code or email that differs from what the quote was priced with holds Pay until asked and answered", () => {
    expect(payHold({ ...base, quote: quote(), current: { couponCode: "NEW", email: "" } })).toBe("pending");
    expect(payHold({ ...base, quote: quote(), current: { couponCode: "", email: "a@b.co" } })).toBe("pending");
    expect(payHold({ ...base, quote: quote(), failed: true, current: { couponCode: "NEW", email: "" } })).toBe(null);
  });
});

describe("buildCheckoutBody (submit sends expectedTotal and bundleSelections)", () => {
  const customerData = { firstName: "A", lastName: "B", email: "a@b.co", phone: "1" };
  it("sends the shown total, the priced selections and the viewId", () => {
    const q = quote();
    const body = buildCheckoutBody({ domain: "d", customerData, viewId: "v1", quote: q, quotedInput: { selections: q.selections.bundleSelections, couponCode: "", email: "" } });
    expect(body).toEqual({ domain: "d", customerData, viewId: "v1", expectedTotal: 1740, bundleSelections: q.selections.bundleSelections });
  });
  it("sends the page language when given", () => {
    const q = quote();
    const body = buildCheckoutBody({ domain: "d", customerData, viewId: null, language: "he", quote: q, quotedInput: { selections: q.selections.bundleSelections, couponCode: "", email: "" } });
    expect(body.language).toBe("he");
  });
  it("sends the typed code only when the shown quote applied it", () => {
    const applied = quote({ coupon: { status: "applied", code: "SAVE" } });
    const refused = quote({ coupon: { status: "refused", code: "SAVE", reason: "not_valid" } });
    const mk = (q: PaymentQuote) => buildCheckoutBody({ domain: "d", customerData, viewId: null, quote: q, quotedInput: { selections: {}, couponCode: "SAVE", email: "" } });
    expect(mk(applied).couponCode).toBe("SAVE");
    expect(mk(refused).couponCode).toBeUndefined();
  });
});

describe("interpretCheckoutFailure (409 quote_changed flow, quote_required, coupon_refused)", () => {
  it("quote_changed carries the door's quote so the page can ask for a second confirmation", () => {
    const q = quote({ total: 1800 });
    expect(interpretCheckoutFailure(409, { code: "quote_changed", quote: q })).toEqual({ kind: "quote_changed", quote: q });
  });
  it("quote_required asks for a fresh quote", () => {
    expect(interpretCheckoutFailure(400, { code: "quote_required" })).toEqual({ kind: "quote_required" });
  });
  it("coupon_refused carries the reason", () => {
    expect(interpretCheckoutFailure(400, { code: "coupon_refused", reason: "limit_reached" })).toEqual({ kind: "coupon_refused", reason: "limit_reached" });
  });
  it("anything else is an error with the server's text or code", () => {
    expect(interpretCheckoutFailure(400, { error: "Nope", code: "x" })).toEqual({ kind: "error", code: "x", message: "Nope" });
    expect(interpretCheckoutFailure(500, null)).toEqual({ kind: "error", code: null, message: null });
  });
});

describe("quoteFractionDigitsOf (one quote, one number of decimals)", () => {
  it("is 0 only when every amount the buyer sees is whole", () => {
    expect(quoteFractionDigitsOf(quote())).toBe(0);
  });
  it("is 2 as soon as any amount, even a catalogue tier, has cents", () => {
    expect(quoteFractionDigitsOf(quote({ shippingAmount: 9.5 }))).toBe(2);
    const q = quote();
    expect(quoteFractionDigitsOf(q, [{ itemIndex: 0, productId: "p", lockedVariantId: null, defaultSelection: {}, addons: [{ id: "a", name: "A", price: 99.5, billingCycle: null }], tiers: [] }])).toBe(2);
  });
});

describe("currencyOf on a quote page never guesses", () => {
  it("returns the caller's fallback only when neither quote nor page names a currency", () => {
    expect(currencyOf({ currency: null }, quote({ currency: null }), "")).toBe("");
    expect(currencyOf({ currency: "EUR" }, quote({ currency: null }), "")).toBe("EUR");
    expect(currencyOf({ currency: "EUR" }, quote({ currency: "USD" }), "")).toBe("USD");
  });
});

describe("beginFailureHandling (what /payment/begin failures do to the lock and the placed order)", () => {
  const sameOrder = ["rate_limited", "gateway_unreachable", "internal_error", "no_gateway_connected", "gateway_misconfigured", "unknown_gateway", "unsupported_provider"];
  const newOrder = [
    "invalid_request", "invalid_ownership_token", "order_not_found", "module_disabled", "invalid_redirect_url",
    "amount_mismatch", "currency_mismatch", "free_completion_needs_card", "order_not_capturable",
    "trial_needs_card_gateway", "trial_needs_business_contact", "trial_ended", "plan_trial_invalid_shape",
  ];
  const mayBePaid = ["payment_confirming", "payment_paid_not_applied", "payment_begin_ambiguous", "order_not_chargeable", "payment_session_used"];
  for (const code of sameOrder) {
    it(`${code}: nothing started, unlock and retry the same order`, () => {
      expect(beginFailureHandling(code)).toEqual({ unlock: true, keepOrder: true });
    });
  }
  for (const code of newOrder) {
    it(`${code}: nothing started, unlock and place a new order next time`, () => {
      expect(beginFailureHandling(code)).toEqual({ unlock: true, keepOrder: false });
    });
  }
  for (const code of mayBePaid) {
    it(`${code}: may be paid or begun, keep the lock and the order`, () => {
      expect(beginFailureHandling(code)).toEqual({ unlock: false, keepOrder: true });
    });
  }
  it("a network error (no code) and an unknown code keep the lock and the order", () => {
    expect(beginFailureHandling(null)).toEqual({ unlock: false, keepOrder: true });
    expect(beginFailureHandling(undefined)).toEqual({ unlock: false, keepOrder: true });
    expect(beginFailureHandling("something_new")).toEqual({ unlock: false, keepOrder: true });
  });
});
