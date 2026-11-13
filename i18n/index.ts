import { MESSAGES, type MessageKey } from './messages';

export const LOCALES = ['en', 'tr', 'de', 'es', 'ja', 'zh-CN'] as const;
export type Locale = (typeof LOCALES)[number];

/** English is the default, and the fallback for any missing translation. */
export const DEFAULT_LOCALE: Locale = 'en';

const STORAGE_KEY = 'kurala-locale';
const CJK_FONT_ID = 'kurala-cjk-font';

/** Google Fonts family that carries the glyphs Plus Jakarta Sans and Inter lack, per language. */
const CJK_FONTS: Partial<Record<Locale, string>> = {
  ja: 'Noto+Sans+JP:wght@400;500;700',
  'zh-CN': 'Noto+Sans+SC:wght@400;500;700',
};

export const isLocale = (value: unknown): value is Locale =>
  typeof value === 'string' && (LOCALES as readonly string[]).includes(value);

/** The language chosen before, or English on a first visit (the browser language is not used). */
export function savedLocale(): Locale {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (isLocale(saved)) return saved;
  } catch {
    // Storage can be blocked: English is the fallback.
  }
  return DEFAULT_LOCALE;
}

export function saveLocale(locale: Locale): void {
  try {
    localStorage.setItem(STORAGE_KEY, locale);
  } catch {
    // Storage can be blocked: the choice lasts for this visit only.
  }
}

/** The text for a key in a language, with {placeholders} filled in. Missing text falls back to English. */
export function translate(locale: Locale, key: MessageKey, vars: Record<string, string | number> = {}): string {
  const text = MESSAGES[key][locale] || MESSAGES[key][DEFAULT_LOCALE];
  return text.replace(/\{(\w+)\}/g, (match, name: string) => (name in vars ? String(vars[name]) : match));
}

/** A number as a percentage in the language's own format, e.g. 16.7 becomes "16.7" in English and "16,7" in German. */
export function formatNumber(value: number, locale: Locale): string {
  return new Intl.NumberFormat(locale, { maximumFractionDigits: 1 }).format(value);
}

/** Sets the page language, and loads the CJK font for Japanese and Chinese (only when they are chosen). */
export function applyLocale(locale: Locale): void {
  document.documentElement.lang = locale;

  const family = CJK_FONTS[locale];
  let link = document.getElementById(CJK_FONT_ID) as HTMLLinkElement | null;
  if (!family) {
    link?.remove();
    return;
  }
  if (!link) {
    link = document.createElement('link');
    link.id = CJK_FONT_ID;
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }
  link.href = `https://fonts.googleapis.com/css2?family=${family}&display=swap`;
}
