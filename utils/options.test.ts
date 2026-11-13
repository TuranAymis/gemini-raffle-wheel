import { describe, expect, it } from 'vitest';
import { EXAMPLE_OPTIONS, MAX_OPTIONS, addOptions, cleanName } from './options';

describe('cleanName', () => {
  it('trims, collapses spaces and limits the length', () => {
    expect(cleanName('  Lionel    Messi  ')).toBe('Lionel Messi');
    expect(cleanName('   ')).toBe('');
    expect(cleanName('a'.repeat(100))).toHaveLength(60);
  });
});

describe('addOptions', () => {
  it('skips empty names and names already in the list, ignoring case (Turkish letters too)', () => {
    const first = addOptions([], ['Pelé', '', '  ', 'Messi']);
    expect(first).toEqual({ list: ['Pelé', 'Messi'], added: 2, duplicates: 0, overflow: 0 });

    const second = addOptions(first.list, ['pelé', 'MESSİ', 'Ronaldo']);
    expect(second.list).toEqual(['Pelé', 'Messi', 'Ronaldo']);
    expect(second.duplicates).toBe(2);
    expect(second.added).toBe(1);
  });

  it('never grows past the limit and counts what did not fit', () => {
    const many = Array.from({ length: MAX_OPTIONS + 5 }, (_, i) => `Seçenek ${i}`);
    const result = addOptions([], many);
    expect(result.list).toHaveLength(MAX_OPTIONS);
    expect(result.overflow).toBe(5);
  });
});

describe('example options', () => {
  it('are a short list of distinct names', () => {
    expect(EXAMPLE_OPTIONS.length).toBeGreaterThanOrEqual(5);
    expect(addOptions([], EXAMPLE_OPTIONS).duplicates).toBe(0);
  });
});
