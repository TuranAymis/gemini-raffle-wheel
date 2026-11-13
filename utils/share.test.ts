import { describe, expect, it } from 'vitest';
import { MAX_SHARE_LENGTH, decodeOptions, encodeOptions, optionsFromHash, shareUrl } from './share';

describe('share links', () => {
  it('round-trip the names, Turkish letters and emoji included', () => {
    const names = ['Zlatan İbrahimović', 'Pelé 😀', 'Ayşe & "Mehmet"'];
    expect(decodeOptions(encodeOptions(names))).toEqual(names);
  });

  it('build an address that opens with the same names', () => {
    const url = shareUrl('https://example.test/', ['Messi', 'Ronaldo']);
    expect(url).not.toBeNull();
    expect(optionsFromHash(new URL(url!).hash)).toEqual(['Messi', 'Ronaldo']);
  });

  it('refuse a list too long for an address', () => {
    const names = Array.from({ length: 300 }, (_, i) => `Seçenek numarası ${i}`);
    expect(shareUrl('https://example.test/', names)).toBeNull();
    expect(MAX_SHARE_LENGTH).toBeGreaterThan(1000);
  });

  it('ignore fragments without a list, and tokens that are not lists of names', () => {
    expect(optionsFromHash('#foo=bar')).toBeNull();
    expect(optionsFromHash('')).toBeNull();
    expect(decodeOptions('!!!')).toBeNull();
    expect(decodeOptions('eyJhIjoxfQ')).toBeNull(); // {"a":1}: an object, not a list
  });

  it('find the list among other fragment parts', () => {
    const token = encodeOptions(['Messi']);
    expect(optionsFromHash(`#theme=dark&list=${token}`)).toEqual(['Messi']);
  });
});
