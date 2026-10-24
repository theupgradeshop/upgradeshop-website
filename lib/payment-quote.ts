/**
 * The payment-page quote, as the dashboard serves it (payment-pages.md endpoints 9 and 9a).
 *
 * Every price a buyer sees on /pay/[slug] is a number the quote carries; this file never computes one. It holds
 * the framework-free parts of the quote flow (request building, the debounced requote with its stale-answer guard,
 * the Pay hold, the checkout body and the checkout refusals) so they can be tested without a browser.
 */

export type QuoteLineKind = "product" | "manual" | "bundle" | "setup_fee" | "addon";

export interface QuoteLine {
  kind: QuoteLineKind;
  itemIndex: number;
  productId: string | null;
  variantId: string | null;
  name: string;
  variantTitle: string | null;
  quantity: number;
  unitPrice: number;
  originalUnitPrice: number;
  lineTotal: number;
  billingCycle: string | null;
}

export type CouponReason =
  | "not_valid"
  | "not_for_this_purchase"
  | "not_for_this_email"
  | "limit_reached"
  | "minimum_not_met"
  | "maximum_exceeded";

export interface QuoteCoupon {
  status: "applied" | "dropped" | "refused" | "pending_email";
  code?: string;
  reason?: CouponReason;
}

export interface BundleSelection {
  selectedVariantId?: string | null;
  selectedAddonProductIds?: string[];
}

export type BundleSelections = Record<string, BundleSelection>;

export interface CatalogueTier {
  id: string;
  title: string | null;
  price: number;
  setupFee: number;
  billingCycle: string | null;
  available: boolean;
  position: number;
}

export interface CatalogueAddon {
  id: string;
  name: string;
  price: number;
  billingCycle: string | null;
}

export interface CatalogueBundle {
  itemIndex: number;
  productId: string;
  lockedVariantId: string | null;
  tiers: CatalogueTier[];
  addons: CatalogueAddon[];
  defaultSelection: BundleSelection;
}

export interface PaymentQuote {
  lines: QuoteLine[];
  subtotal: number;
  itemDiscount: number;
  globalDiscount: number;
  couponDiscount: number;
  totalDiscount: number;
  extraTotal: number;
  shippingAmount: number;
  total: number;
  recurring: { billingCycle: string; amount: number }[];
  coupon: QuoteCoupon | null;
  selections: { bundleSelections: BundleSelections };
  catalogue?: CatalogueBundle[];
  /** ISO 4217 code every amount is priced in: the page's own, else the account's, else null (never a guess). */
  currency?: string | null;
}

export interface RequoteInput {
  selections: BundleSelections;
  couponCode: string;
  email: string;
}

/**
 * `legacy`: the dashboard did not answer the quote capability (older dashboard), the page behaves as before.
 * `unavailable`: the page is served but its quote refused; never fall back to the legacy total.
 */
export type QuoteMode =
  | { kind: "legacy" }
  | { kind: "unavailable"; refusal: string | null }
  | { kind: "quote"; quote: PaymentQuote };

export function quoteModeOf(paymentPage: any): QuoteMode {
  if (!paymentPage || !("quote" in paymentPage) || paymentPage.quote === undefined) return { kind: "legacy" };
  if (!paymentPage.quote) {
    return { kind: "unavailable", refusal: typeof paymentPage.quoteRefusal === "string" ? paymentPage.quoteRefusal : null };
  }
  return { kind: "quote", quote: paymentPage.quote as PaymentQuote };
}

/** The ISO currency to price with: what the quote or page carries, else the caller's legacy fallback. */
export function currencyOf(paymentPage: any, quote: PaymentQuote | null, legacyFallback: string): string {
  const fromQuote = quote?.currency;
  if (typeof fromQuote === "string" && fromQuote) return fromQuote;
  const fromPage = paymentPage?.currency;
  if (typeof fromPage === "string" && fromPage) return fromPage;
  return legacyFallback;
}

/** The same shape test the quote endpoint applies (ASCII, one @, a dotted domain, no spaces); an invalid one is never sent. */
export function isQuotableEmail(email: string): boolean {
  const e = email.trim();
  return /^[\x21-\x7e]+@[\x21-\x7e]+\.[\x21-\x7e]+$/.test(e) && e.split("@").length === 2;
}

export function buildQuoteBody(domain: string, input: RequoteInput, language?: string): Record<string, unknown> {
  const body: Record<string, unknown> = { domain, bundleSelections: input.selections };
  if (language) body.language = language;
  const code = input.couponCode.trim();
  if (code) body.couponCode = code;
  if (isQuotableEmail(input.email)) body.email = input.email.trim();
  return body;
}

function normalise(sel: BundleSelection | undefined): string {
  const variant = sel?.selectedVariantId ?? null;
  const addons = [...(sel?.selectedAddonProductIds ?? [])].sort();
  return JSON.stringify([variant, addons]);
}

/** A stable string for a selection map, equal for equal choices whatever the key or add-on order. */
export function selectionsKey(selections: BundleSelections): string {
  return JSON.stringify(
    Object.keys(selections)
      .sort()
      .map((k) => [k, normalise(selections[k])])
  );
}

/** True when every bundle in the catalogue (and any other key) holds the same choices in both maps. */
export function selectionsMatch(a: BundleSelections, b: BundleSelections): boolean {
  const keys = new Set([...Object.keys(a), ...Object.keys(b)]);
  for (const k of keys) {
    if (normalise(a[k]) !== normalise(b[k])) return false;
  }
  return true;
}

export type RequoteOutcome =
  | { kind: "quote"; quote: PaymentQuote }
  | { kind: "unavailable"; reason: string | null }
  | { kind: "failed"; status: number | null; code: string | null };

export interface RequoterDeps {
  fetchFn: typeof fetch;
  url: string;
  domain: string;
  /** The page's language, sent with every quote request. */
  language?: string;
  debounceMs?: number;
  setTimeoutFn?: (fn: () => void, ms: number) => unknown;
  clearTimeoutFn?: (handle: unknown) => void;
  /** A quote request began (or is waiting to): the Pay button holds. */
  onPending: () => void;
  /** Only the latest request's outcome is ever delivered. */
  onOutcome: (outcome: RequoteOutcome, input: RequoteInput) => void;
}

/**
 * Debounced requote. A sequence number and an AbortController make sure only the latest answer is delivered.
 * 429 and every other failure are reported as `failed` so the caller keeps its last quote on screen.
 */
export function createRequoter(deps: RequoterDeps) {
  const debounceMs = deps.debounceMs ?? 400;
  const setT = deps.setTimeoutFn ?? ((fn: () => void, ms: number) => setTimeout(fn, ms));
  const clearT = deps.clearTimeoutFn ?? ((h: unknown) => clearTimeout(h as ReturnType<typeof setTimeout>));
  let seq = 0;
  let timer: unknown = null;
  let controller: AbortController | null = null;
  let last: RequoteInput | null = null;

  async function fire(input: RequoteInput, mine: number) {
    controller?.abort();
    const ctl = new AbortController();
    controller = ctl;
    let outcome: RequoteOutcome;
    try {
      const res = await deps.fetchFn(deps.url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(buildQuoteBody(deps.domain, input, deps.language)),
        signal: ctl.signal,
      });
      const body: any = await res.json().catch(() => ({}));
      if (res.ok && body?.quote) outcome = { kind: "quote", quote: body.quote as PaymentQuote };
      else if (res.status === 403 || res.status === 404) {
        outcome = { kind: "unavailable", reason: typeof body?.reason === "string" ? body.reason : null };
      } else outcome = { kind: "failed", status: res.status, code: typeof body?.code === "string" ? body.code : null };
    } catch {
      if (ctl.signal.aborted) return;
      outcome = { kind: "failed", status: null, code: null };
    }
    if (mine !== seq) return;
    deps.onOutcome(outcome, input);
  }

  return {
    schedule(input: RequoteInput) {
      last = input;
      seq += 1;
      const mine = seq;
      if (timer !== null) clearT(timer);
      controller?.abort();
      deps.onPending();
      timer = setT(() => {
        timer = null;
        void fire(input, mine);
      }, debounceMs);
    },
    /** Ask again at once: with the given input, else the last one asked. Nothing to ask with is a no-op. */
    retryNow(input?: RequoteInput) {
      const next = input ?? last;
      if (!next) return;
      last = next;
      seq += 1;
      const mine = seq;
      if (timer !== null) clearT(timer);
      timer = null;
      deps.onPending();
      void fire(next, mine);
    },
    cancel() {
      seq += 1;
      if (timer !== null) clearT(timer);
      timer = null;
      controller?.abort();
    },
  };
}

export type PayHold = "pending" | "pending_email" | "selections_changed" | null;

/**
 * Why Pay is held, or null. What the buyer has chosen now is compared with what the shown quote was priced with, always:
 * a changed tier or add-on holds Pay (two selections can share a total, which expectedTotal cannot see). A changed coupon
 * code or email holds it only until the requote has been asked (a failed requote keeps the last quote and releases it,
 * because the door prices again and answers 409 on any total difference).
 */
export function payHold(state: {
  quote: PaymentQuote;
  pending: boolean;
  failed: boolean;
  selections: BundleSelections;
  /** The input the shown quote was priced with. */
  quotedInput: RequoteInput;
  /** The coupon code and email the buyer has now (email already reduced to a quotable one or ""). */
  current: { couponCode: string; email: string };
}): PayHold {
  if (state.pending) return "pending";
  if (!selectionsMatch(state.quote.selections.bundleSelections, state.selections)) return "selections_changed";
  if (state.failed) return null;
  const inputsDiffer =
    state.current.couponCode.trim() !== state.quotedInput.couponCode.trim() ||
    state.current.email.trim() !== state.quotedInput.email.trim();
  if (inputsDiffer) return "pending";
  if (state.quote.coupon?.status === "pending_email") return "pending_email";
  return null;
}

export interface CheckoutBodyInput {
  domain: string;
  customerData: Record<string, unknown>;
  /** The page's language, sent with the checkout. */
  language?: string;
  viewId: string | null;
  quote: PaymentQuote;
  /** The input the shown quote was priced with. */
  quotedInput: RequoteInput;
}

/** The door's body in quote mode: the shown total (display only, the door re-prices) and the choices it was priced with. */
export function buildCheckoutBody(input: CheckoutBodyInput): Record<string, unknown> {
  const body: Record<string, unknown> = {
    domain: input.domain,
    customerData: input.customerData,
    viewId: input.viewId,
    expectedTotal: input.quote.total,
    bundleSelections: input.quote.selections.bundleSelections,
  };
  if (input.language) body.language = input.language;
  const code = input.quotedInput.couponCode.trim();
  if (code && input.quote.coupon?.status === "applied") body.couponCode = code;
  return body;
}

export type CheckoutFailure =
  | { kind: "quote_changed"; quote: PaymentQuote }
  | { kind: "quote_required" }
  | { kind: "coupon_refused"; reason: CouponReason | null }
  | { kind: "error"; code: string | null; message: string | null };

export function interpretCheckoutFailure(status: number, body: any): CheckoutFailure {
  const code = typeof body?.code === "string" ? body.code : null;
  if (status === 409 && code === "quote_changed" && body?.quote) {
    return { kind: "quote_changed", quote: body.quote as PaymentQuote };
  }
  if (code === "quote_required") return { kind: "quote_required" };
  if (code === "coupon_refused") {
    return { kind: "coupon_refused", reason: typeof body?.reason === "string" ? (body.reason as CouponReason) : null };
  }
  return { kind: "error", code, message: typeof body?.error === "string" ? body.error : null };
}

export interface SummaryRow {
  key: string;
  type: "line" | "discount" | "shipping" | "total" | "recurring";
  /** A line's name; for a discount row the discount kind. */
  label: string;
  /** Present on a line: quantity and per-unit price shown. */
  quantity?: number;
  unitPrice?: number;
  amount: number;
  billingCycle?: string | null;
}

function money(n: number): number {
  return Math.round((n + Number.EPSILON) * 100) / 100;
}

/**
 * The rows the summary draws, every figure from the quote, so they add up to its total:
 * page lines (before their own item discount, the quote's `subtotal`) + setup-fee and add-on lines (`extraTotal`)
 * - item, page-wide and coupon discounts (together `totalDiscount`, already scaled by any cap) + shipping = `total`.
 * A bundle line is already its net price in the quote's subtotal, so it is shown at that price.
 */
export function summaryRows(quote: PaymentQuote): SummaryRow[] {
  const rows: SummaryRow[] = [];
  quote.lines.forEach((l, i) => {
    const beforeItemDiscount = l.kind === "product" || l.kind === "manual";
    const unitPrice = beforeItemDiscount ? l.originalUnitPrice : l.unitPrice;
    rows.push({
      key: `line-${i}`,
      type: "line",
      label: l.variantTitle && l.kind !== "setup_fee" ? `${l.name} (${l.variantTitle})` : l.name,
      quantity: l.quantity,
      unitPrice,
      amount: beforeItemDiscount ? money(l.originalUnitPrice * l.quantity) : l.lineTotal,
      billingCycle: l.billingCycle,
    });
  });
  if (quote.itemDiscount > 0) rows.push({ key: "discount-item", type: "discount", label: "itemDiscount", amount: quote.itemDiscount });
  if (quote.globalDiscount > 0) rows.push({ key: "discount-global", type: "discount", label: "globalDiscount", amount: quote.globalDiscount });
  if (quote.couponDiscount > 0) rows.push({ key: "discount-coupon", type: "discount", label: "couponDiscount", amount: quote.couponDiscount });
  if (quote.shippingAmount > 0) rows.push({ key: "shipping", type: "shipping", label: "shipping", amount: quote.shippingAmount });
  rows.push({ key: "total", type: "total", label: "total", amount: quote.total });
  for (const r of quote.recurring) {
    rows.push({ key: `recurring-${r.billingCycle}`, type: "recurring", label: "recurring", amount: r.amount, billingCycle: r.billingCycle });
  }
  return rows;
}

/**
 * The fraction digits every amount of one quote is shown with: 0 only when every amount the buyer can see (lines,
 * totals, recurring, tiers and add-ons of the catalogue) is a whole number, else 2, so "$100" never sits beside "$99.50".
 */
export function quoteFractionDigitsOf(quote: PaymentQuote, catalogue: CatalogueBundle[] = quote.catalogue ?? []): 0 | 2 {
  const amounts: number[] = [
    quote.subtotal, quote.itemDiscount, quote.globalDiscount, quote.couponDiscount, quote.totalDiscount,
    quote.extraTotal, quote.shippingAmount, quote.total,
    ...quote.lines.flatMap((l) => [l.unitPrice, l.originalUnitPrice, l.lineTotal]),
    ...quote.recurring.map((r) => r.amount),
    ...catalogue.flatMap((b) => [...b.tiers.map((t) => t.price), ...b.addons.map((a) => a.price)]),
  ];
  return amounts.every((n) => Number.isInteger(n)) ? 0 : 2;
}

export interface BeginFailureHandling {
  /** Release the quote lock so the buyer may change tier, add-ons or code. */
  unlock: boolean;
  /** Keep the placed order so an unchanged retry begins the same order again (else the next try places a new one). */
  keepOrder: boolean;
}

/** /payment/begin codes after which nothing was started or paid, so the quote may be unlocked and the order kept for a retry. */
const BEGIN_NOTHING_STARTED_RETRY_SAME_ORDER = new Set([
  "rate_limited",
  "gateway_unreachable",
  "no_gateway_connected",
  "gateway_misconfigured",
  "unknown_gateway",
  "unsupported_provider",
]);

/** Codes after which nothing was started or paid and the order itself cannot be begun: unlock and place a new one next time. */
const BEGIN_NOTHING_STARTED_NEW_ORDER = new Set([
  "invalid_request",
  "invalid_ownership_token",
  "order_not_found",
  "module_disabled",
  "invalid_redirect_url",
  "amount_mismatch",
  "currency_mismatch",
  "free_completion_needs_card",
  "trial_needs_card_gateway",
  "trial_needs_business_contact",
  "trial_ended",
  "plan_trial_invalid_shape",
]);

/**
 * What the page does with its quote lock and placed order after /payment/begin failed. A session may exist or the order
 * may already be paid for payment_confirming, payment_paid_not_applied, payment_begin_ambiguous, order_not_chargeable,
 * payment_session_used, order_not_capturable (a completed capture may not have been applied) and internal_error (a
 * gateway can throw after its form may exist); for those, a network error (no code) and any code not listed the lock and the order stay, so the
 * buyer can only retry the same order or reload, never place a second one.
 */
export function beginFailureHandling(
  code: string | null | undefined,
  opts: { holdingOrder?: boolean } = {}
): BeginFailureHandling {
  // While an earlier answer left the order possibly begun or paid, no later failure proves otherwise: only a
  // successful begin (or a reload) releases the hold.
  if (opts.holdingOrder) return { unlock: false, keepOrder: true };
  if (code && BEGIN_NOTHING_STARTED_RETRY_SAME_ORDER.has(code)) return { unlock: true, keepOrder: true };
  if (code && BEGIN_NOTHING_STARTED_NEW_ORDER.has(code)) return { unlock: true, keepOrder: false };
  return { unlock: false, keepOrder: true };
}

export type OrderAction = "reuse_held" | "reuse_placed" | "new_order";

/**
 * Which order a checkout click works on. An order held by a keep-lock begin failure is always begun again, whatever the
 * buyer has edited since (it may be paid, and a second order beside it must never be placed). Otherwise an order a
 * failed begin left behind is reused only when the choices, buyer details and total are those it was placed for.
 */
export function chooseOrderAction(state: {
  held: boolean;
  placed: { key: string; total: number } | null;
  key: string;
  total: number | null;
}): OrderAction {
  if (state.held) return "reuse_held";
  if (state.placed && state.total !== null && state.placed.key === state.key && state.placed.total === state.total) return "reuse_placed";
  return "new_order";
}

export type BeginInstruction =
  | { kind: "none" }
  | { kind: "redirect"; url: string }
  | { kind: "client_instrument"; provider: string; publicConfig: Record<string, any> };

/**
 * The instruction of a 200 /payment/begin body, or null when the body is not one this page can follow (unparseable, null,
 * an unknown kind, a redirect without a url). A null answer is handled as a failure that may have started a session.
 */
export function parseBeginInstruction(body: unknown): BeginInstruction | null {
  if (!body || typeof body !== "object") return null;
  const b = body as Record<string, any>;
  if (b.kind === "none") return { kind: "none" };
  if (b.kind === "redirect") return typeof b.url === "string" && b.url ? { kind: "redirect", url: b.url } : null;
  if (b.kind === "client_instrument") {
    if (typeof b.provider !== "string" || !b.provider) return null;
    return { kind: "client_instrument", provider: b.provider, publicConfig: b.publicConfig && typeof b.publicConfig === "object" ? b.publicConfig : {} };
  }
  return null;
}
