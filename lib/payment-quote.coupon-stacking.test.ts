/** Payment-page quote helpers for more than one coupon code (DC13 U6). */
import { describe, it, expect } from "vitest";
import {
  buildQuoteBody,
  buildCheckoutBody,
  interpretCheckoutFailure,
  payHold,
  appliedBuyerCodes,
  canAddAnotherCode,
  inputCodes,
  type PaymentQuote,
} from "./payment-quote";

function quote(extra: Partial<PaymentQuote> = {}): PaymentQuote {
  return {
    lines: [], subtotal: 100, itemDiscount: 0, globalDiscount: 0, couponDiscount: 0, totalDiscount: 0, extraTotal: 0, shippingAmount: 0, total: 100,
    recurring: [], coupon: null, selections: { bundleSelections: {} }, ...extra,
  };
}
const two = quote({
  coupon: { status: "applied", code: "AAA" },
  coupons: [{ code: "AAA", discount: 10, allowCombining: true }, { code: "BBB", discount: 5, allowCombining: true }],
});

describe("buildQuoteBody with several codes", () => {
  it("one code is today's body", () => {
    expect(buildQuoteBody("x.com", { selections: {}, couponCode: " AAA ", email: "" })).toEqual({ domain: "x.com", bundleSelections: {}, couponCode: "AAA" });
  });
  it("two or more send couponCode (first) and couponCodes (all)", () => {
    expect(buildQuoteBody("x.com", { selections: {}, couponCode: "AAA", couponCodes: ["AAA", "BBB"], email: "" })).toMatchObject({ couponCode: "AAA", couponCodes: ["AAA", "BBB"] });
  });
  it("blanks and case duplicates are dropped", () => {
    expect(inputCodes({ couponCode: "", couponCodes: ["AAA", " ", "aaa", "BBB"] })).toEqual(["AAA", "BBB"]);
  });
  it("no code sends neither key", () => {
    const body = buildQuoteBody("x.com", { selections: {}, couponCode: "", email: "" });
    expect("couponCode" in body || "couponCodes" in body).toBe(false);
  });
});

describe("buildCheckoutBody sends only the codes the quote applied", () => {
  const base = { domain: "x.com", customerData: {}, viewId: null };
  it("keeps the applied ones in asked order", () => {
    const body = buildCheckoutBody({ ...base, quote: two, quotedInput: { selections: {}, couponCode: "AAA", couponCodes: ["AAA", "BBB", "CCC"], email: "" } });
    expect(body.couponCode).toBe("AAA");
    expect(body.couponCodes).toEqual(["AAA", "BBB"]);
  });
  it("one applied code is couponCode only", () => {
    const one = quote({ coupon: { status: "applied", code: "AAA" }, coupons: [{ code: "aaa", discount: 10, allowCombining: true }] });
    const body = buildCheckoutBody({ ...base, quote: one, quotedInput: { selections: {}, couponCode: "AAA", couponCodes: ["AAA", "CCC"], email: "" } });
    expect(body.couponCode).toBe("AAA");
    expect("couponCodes" in body).toBe(false);
  });
  it("a quote without a coupons list keeps today's status rule", () => {
    const legacy = quote({ coupon: { status: "applied", code: "AAA" } });
    expect(buildCheckoutBody({ ...base, quote: legacy, quotedInput: { selections: {}, couponCode: "AAA", email: "" } }).couponCode).toBe("AAA");
    const refused = quote({ coupon: { status: "refused", code: "AAA", reason: "not_valid" } });
    expect("couponCode" in buildCheckoutBody({ ...base, quote: refused, quotedInput: { selections: {}, couponCode: "AAA", email: "" } })).toBe(false);
  });
  it("a code the page itself applied is not sent unless the buyer asked it", () => {
    const withPage = quote({ coupon: { status: "applied", code: "PAGE" }, coupons: [{ code: "PAGE", discount: 5 }, { code: "AAA", discount: 5 }] });
    const body = buildCheckoutBody({ ...base, quote: withPage, quotedInput: { selections: {}, couponCode: "AAA", email: "" } });
    expect(body.couponCode).toBe("AAA");
    expect("couponCodes" in body).toBe(false);
  });
});

describe("applied state helpers", () => {
  it("lists the buyer's codes without the page's own coupon", () => {
    const withPage = quote({ coupon: { status: "applied", code: "PAGE" }, coupons: [{ code: "PAGE", discount: 5, allowCombining: true }, { code: "AAA", discount: 5, allowCombining: true }] });
    expect(appliedBuyerCodes(withPage, "page")).toEqual(["AAA"]);
  });
  it("the add-another field needs every applied coupon to combine and fewer than five", () => {
    expect(canAddAnotherCode(two)).toBe(true);
    expect(canAddAnotherCode(quote({ coupons: [{ code: "AAA", discount: 1, allowCombining: true }, { code: "BBB", discount: 1 }] }))).toBe(false);
    const five = quote({ coupons: ["A", "B", "C", "D", "E"].map((code) => ({ code, discount: 1, allowCombining: true })) });
    expect(canAddAnotherCode(five)).toBe(false);
  });
  it("is open with no buyer code, even beside a page coupon that cannot combine", () => {
    expect(canAddAnotherCode(quote(), null)).toBe(true);
    expect(canAddAnotherCode(quote({ coupon: { status: "applied", code: "PAGE" }, coupons: [{ code: "PAGE", discount: 5 }] }), "PAGE")).toBe(true);
  });
  it("a quote that lists no coupons keeps the single-code replace behaviour", () => {
    expect(canAddAnotherCode(quote({ coupon: { status: "applied", code: "AAA" } }))).toBe(true);
    expect(appliedBuyerCodes(quote({ coupon: { status: "applied", code: "AAA" } }))).toEqual([]);
  });
});

describe("payHold compares code lists", () => {
  it("holds while the asked codes differ from the quoted ones, releases when equal (any case)", () => {
    const quotedInput = { selections: {}, couponCode: "AAA", couponCodes: ["AAA", "BBB"], email: "" };
    const state = { quote: quote(), pending: false, failed: false, selections: {}, quotedInput };
    expect(payHold({ ...state, current: { couponCode: "AAA", email: "" } })).toBe("pending");
    expect(payHold({ ...state, current: { couponCode: "aaa", couponCodes: ["aaa", "bbb"], email: "" } })).toBeNull();
  });
});

describe("interpretCheckoutFailure: coupon set refusals", () => {
  it("coupon_not_combinable carries the code, the conflicts and the sentence", () => {
    expect(interpretCheckoutFailure(400, { code: "coupon_not_combinable", error: "No mix", couponCode: "BBB", conflictsWith: ["AAA"] })).toEqual({
      kind: "coupon_not_combinable", couponCode: "BBB", conflictsWith: ["AAA"], message: "No mix",
    });
  });
  it("coupon_not_combinable without a sentence has a null message", () => {
    expect(interpretCheckoutFailure(400, { code: "coupon_not_combinable" })).toEqual({ kind: "coupon_not_combinable", couponCode: null, conflictsWith: [], message: null });
  });
  it("too_many_coupons carries the sentence", () => {
    expect(interpretCheckoutFailure(400, { code: "too_many_coupons", error: "Max 5" })).toEqual({ kind: "too_many_coupons", message: "Max 5" });
  });
  it("coupon_refused names its code when the door does", () => {
    expect(interpretCheckoutFailure(400, { code: "coupon_refused", reason: "not_valid", couponCode: "BBB" })).toEqual({ kind: "coupon_refused", reason: "not_valid", couponCode: "BBB" });
  });
});
