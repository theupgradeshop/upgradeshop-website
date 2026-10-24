/**
 * Currency utilities for UpgradeShop marketing website
 *
 * Supports USD and ILS with automatic detection based on selected language
 */

import { getCurrentLanguage, getCurrencyForLanguage } from './i18n';

export type Currency = 'USD' | 'ILS';

// Fallback USD to ILS conversion rate (used only when no rate is configured in store settings)
const USD_TO_ILS_RATE = 3.7;

export interface PriceDisplay {
  amount: number;
  currency: Currency;
  symbol: string;
  formatted: string;
}

/**
 * Detect preferred currency based on selected language
 * Uses saved language preference, falls back to browser language
 */
export function detectCurrency(): Currency {
  if (typeof window === 'undefined') {
    return 'USD'; // Server-side default
  }

  // Use the language-based currency detection
  const lang = getCurrentLanguage();
  return getCurrencyForLanguage(lang);
}

/**
 * Convert USD price to the target currency
 * Uses dynamic exchange rate from store settings when provided, otherwise falls back to hardcoded rate
 */
export function convertPrice(usdPrice: number, targetCurrency: Currency, exchangeRates?: Record<string, number>): number {
  if (targetCurrency === 'USD') {
    return usdPrice;
  }

  const rate = exchangeRates?.ILS ?? USD_TO_ILS_RATE;
  const ilsPrice = usdPrice * rate;
  // Round up to nearest x9 (psychological pricing: 151 → 159, 160 → 169)
  return Math.ceil(ilsPrice / 10) * 10 - 1;
}

/**
 * Format price for display
 */
export function formatPrice(usdPrice: number, currency: Currency, exchangeRates?: Record<string, number>): PriceDisplay {
  const amount = convertPrice(usdPrice, currency, exchangeRates);
  const symbol = currency === 'ILS' ? '₪' : '$';

  // Format the number
  const formatted = currency === 'ILS'
    ? `${symbol}${amount.toLocaleString('he-IL')}`
    : `${symbol}${amount}`;

  return {
    amount,
    currency,
    symbol,
    formatted,
  };
}

/**
 * Get price string with /mo suffix
 */
export function formatPriceWithPeriod(usdPrice: number, currency: Currency): string {
  const { formatted } = formatPrice(usdPrice, currency);
  const periodSuffix = currency === 'ILS' ? '/חודש' : '/mo';
  return `${formatted}${periodSuffix}`;
}

/**
 * Price display component helper - returns all needed values
 * Priority: 1) manually set DB price for currency, 2) auto-convert using store exchange rate, 3) hardcoded fallback rate
 */
export function getPriceDisplayValues(
  usdPrice: number,
  currency: Currency,
  dbPrices?: Record<string, number> | null,
  exchangeRates?: Record<string, number>
) {
  const symbol = currency === 'ILS' ? '₪' : '$';
  const periodLabel = currency === 'ILS' ? '/חודש' : '/mo';

  // Check if we have a manually set database price for this currency
  if (dbPrices && currency === 'ILS' && dbPrices.ILS) {
    const amount = dbPrices.ILS;
    const formatted = `${symbol}${amount.toLocaleString('he-IL')}`;
    return {
      amount,
      symbol,
      formatted,
      periodLabel,
      fullPrice: `${formatted}${periodLabel}`,
    };
  }

  // Auto-convert using store exchange rate (or hardcoded fallback)
  const { amount, formatted } = formatPrice(usdPrice, currency, exchangeRates);

  return {
    amount,
    symbol,
    formatted,
    periodLabel,
    fullPrice: `${formatted}${periodLabel}`,
  };
}

/**
 * Simple currency formatter for payment pages
 * Supports multiple currencies from platform API
 */
const CURRENCY_SYMBOLS: Record<string, string> = {
  USD: "$",
  EUR: "€",
  GBP: "£",
  ILS: "₪",
  JPY: "¥",
};

// Currencies that don't use decimal places
const NO_DECIMAL_CURRENCIES = new Set(["ILS", "JPY"]);

export function formatPriceSimple(amount: number | string, currencyCode: string = "ILS"): string {
  const numAmount = typeof amount === "string" ? parseFloat(amount) : amount;

  if (isNaN(numAmount)) {
    return "0";
  }

  const code = currencyCode.toUpperCase();
  const symbol = CURRENCY_SYMBOLS[code] || currencyCode;
  const decimals = NO_DECIMAL_CURRENCIES.has(code) ? 0 : 2;

  const formatted = numAmount.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  // ILS symbol comes after the number
  if (code === "ILS") {
    return `${formatted} ${symbol}`;
  }

  // Other currencies: symbol before number
  return `${symbol}${formatted}`;
}

/**
 * An amount from a payment-page quote, as money in the buyer's language. Intl places the currency symbol and the
 * minus sign for the locale (so a discount passed as a negative number reads correctly in Hebrew); a code Intl does
 * not know falls back to the number followed by the code.
 */
export function formatQuoteAmount(value: number, currencyCode: string, lang: string = "en"): string {
  const locale = lang === "he" ? "he-IL" : "en-US";
  try {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: currencyCode.toUpperCase(),
      minimumFractionDigits: Number.isInteger(value) ? 0 : 2,
      maximumFractionDigits: 2,
    }).format(value);
  } catch {
    return `${value.toLocaleString(locale)} ${currencyCode}`;
  }
}
