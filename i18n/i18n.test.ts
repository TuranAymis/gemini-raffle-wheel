import { describe, expect, it } from 'vitest';
import { MESSAGES, type MessageKey } from './messages';
import { DEFAULT_LOCALE, LOCALES, formatNumber, isLocale, translate } from './index';

const keys = Object.keys(MESSAGES) as MessageKey[];
const placeholders = (text: string) => [...text.matchAll(/\{(\w+)\}/g)].map((m) => m[1]).sort().join(',');

describe('messages', () => {
  it('have text in every language', () => {
    for (const key of keys) {
      for (const locale of LOCALES) {
        expect(MESSAGES[key][locale], `${key} / ${locale}`).toBeTruthy();
      }
    }
  });

  it('use the same placeholders in every language', () => {
    for (const key of keys) {
      const expected = placeholders(MESSAGES[key][DEFAULT_LOCALE]);
      for (const locale of LOCALES) {
        expect(placeholders(MESSAGES[key][locale]), `${key} / ${locale}`).toBe(expected);
      }
    }
  });

  it('keep the product name the same everywhere', () => {
    for (const locale of LOCALES) expect(MESSAGES['app.name'][locale]).toBe('Kurala');
  });
});

describe('translate', () => {
  it('defaults to English', () => {
    expect(DEFAULT_LOCALE).toBe('en');
    expect(translate('en', 'action.clear')).toBe('Clear');
  });

  it('returns the text for the chosen language', () => {
    expect(translate('tr', 'action.clear')).toBe('Temizle');
    expect(translate('de', 'action.clear')).toBe('Leeren');
    expect(translate('ja', 'action.clear')).toBe('クリア');
    expect(translate('zh-CN', 'action.clear')).toBe('清空');
  });

  it('fills in placeholders', () => {
    expect(translate('en', 'list.count', { n: 6 })).toBe('6 options');
    expect(translate('tr', 'import.result', { n: 3, k: 1 })).toBe('3 yeni seçenek eklendi, 1 mükerrer kayıt atlandı.');
  });

  it('leaves an unknown placeholder as it is', () => {
    expect(translate('en', 'list.count')).toBe('{n} options');
  });
});

describe('formatNumber', () => {
  it('uses the language decimal separator', () => {
    expect(formatNumber(16.7, 'en')).toBe('16.7');
    expect(formatNumber(16.7, 'de')).toBe('16,7');
  });
});

describe('isLocale', () => {
  it('accepts only the supported languages', () => {
    expect(isLocale('zh-CN')).toBe(true);
    expect(isLocale('fr')).toBe(false);
    expect(isLocale(null)).toBe(false);
  });
});
