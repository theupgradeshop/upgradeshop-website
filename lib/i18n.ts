/**
 * NOTE: Language/locale is now determined by the URL via next-intl middleware.
 * These localStorage-based functions are kept for backward compatibility with
 * the currency system. New code should use useLocale() from next-intl.
 */

/**
 * i18n utilities for UpgradeShop marketing website
 *
 * Provides language selection with localStorage persistence
 * and automatic currency switching based on language
 */

export type Language = 'en' | 'he';

export interface LanguageConfig {
  code: Language;
  name: string;
  nativeName: string;
  dir: 'ltr' | 'rtl';
  currency: 'USD' | 'ILS';
  locale: string;
}

export const LANGUAGES: Record<Language, LanguageConfig> = {
  en: {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    dir: 'ltr',
    currency: 'USD',
    locale: 'en-US',
  },
  he: {
    code: 'he',
    name: 'Hebrew',
    nativeName: 'עברית',
    dir: 'rtl',
    currency: 'ILS',
    locale: 'he-IL',
  },
};

const STORAGE_KEY = 'upgradeshop-language';
const COOKIE_NAME = 'language';

/**
 * Get saved language from localStorage
 */
export function getSavedLanguage(): Language | null {
  if (typeof window === 'undefined') return null;

  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved && (saved === 'en' || saved === 'he')) {
    return saved as Language;
  }
  return null;
}

/**
 * Save language to localStorage and cookie
 */
export function saveLanguage(lang: Language): void {
  if (typeof window === 'undefined') return;

  localStorage.setItem(STORAGE_KEY, lang);

  // Also set cookie for potential SSR usage
  document.cookie = `${COOKIE_NAME}=${lang};path=/;max-age=31536000;SameSite=Lax`;
}

/**
 * Detect language from browser settings
 */
export function detectBrowserLanguage(): Language {
  if (typeof window === 'undefined') return 'en';

  const lang = navigator.language || navigator.languages?.[0] || 'en';

  // Hebrew language codes
  if (lang.startsWith('he') || lang.startsWith('iw')) {
    return 'he';
  }

  return 'en';
}

/**
 * Get the current language (saved > detected > default)
 */
export function getCurrentLanguage(): Language {
  const saved = getSavedLanguage();
  if (saved) return saved;

  return detectBrowserLanguage();
}

/**
 * Get the language config for a language code
 */
export function getLanguageConfig(lang: Language): LanguageConfig {
  return LANGUAGES[lang];
}

/**
 * Get currency for a language
 */
export function getCurrencyForLanguage(lang: Language): 'USD' | 'ILS' {
  return LANGUAGES[lang].currency;
}

/**
 * Update the HTML element's lang and dir attributes
 */
export function updateHtmlAttributes(lang: Language): void {
  if (typeof document === 'undefined') return;

  const config = LANGUAGES[lang];
  document.documentElement.lang = lang;
  document.documentElement.dir = config.dir;
}
