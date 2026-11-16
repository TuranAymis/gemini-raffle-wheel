import { describe, expect, it } from 'vitest';
import { localeFromPath, startingLocale } from './index';

describe('the language in the address', () => {
  it('reads /tr/ and /en/, with or without a trailing part', () => {
    expect(localeFromPath('/tr/')).toBe('tr');
    expect(localeFromPath('/tr')).toBe('tr');
    expect(localeFromPath('/en/')).toBe('en');
    expect(localeFromPath('/en/anything')).toBe('en');
  });

  it('is null for the root and for other languages', () => {
    expect(localeFromPath('/')).toBeNull();
    expect(localeFromPath('/de/')).toBeNull();
    expect(localeFromPath('/entry')).toBeNull();
    expect(localeFromPath('/tr-x/')).toBeNull();
  });

  it('starts in the language of the address; without one, in English when nothing is saved', () => {
    expect(startingLocale('/tr/')).toBe('tr');
    expect(startingLocale('/en/')).toBe('en');
    // No storage in this test environment: the saved choice falls back to English.
    expect(startingLocale('/')).toBe('en');
  });
});
