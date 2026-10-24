import { describe, it, expect } from "vitest";
import { formatQuoteAmount } from "./currency";

describe("formatQuoteAmount", () => {
  it("formats whole and fractional amounts in the buyer's language", () => {
    expect(formatQuoteAmount(1500, "USD", "en")).toBe("$1,500");
    expect(formatQuoteAmount(19.5, "USD", "en")).toBe("$19.50");
    expect(formatQuoteAmount(1500, "ILS", "he")).toContain("₪");
  });
  it("lets Intl place the minus sign of a discount", () => {
    expect(formatQuoteAmount(-100, "USD", "en")).toBe("-$100");
    const he = formatQuoteAmount(-100, "ILS", "he");
    expect(he).toContain("100");
    expect(he).toMatch(/[-‎‏−]/);
  });
  it("falls back to the number and code for an unknown currency", () => {
    expect(formatQuoteAmount(5, "??", "en")).toBe("5 ??");
  });
  it("shows the bare number when the quote has no currency", () => {
    expect(formatQuoteAmount(100, null, "en")).toBe("100");
    expect(formatQuoteAmount(99.5, undefined, "en")).toBe("99.50");
  });
  it("uses the same fraction digits for every amount when told to", () => {
    expect(formatQuoteAmount(100, "USD", "en", 2)).toBe("$100.00");
    expect(formatQuoteAmount(99.5, "USD", "en", 2)).toBe("$99.50");
    expect(formatQuoteAmount(100, "USD", "en", 0)).toBe("$100");
  });
});
