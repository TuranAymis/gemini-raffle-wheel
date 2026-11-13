import { describe, expect, it } from 'vitest';
import { HISTORY_LIMIT, addToHistory, type HistoryEntry } from './history';

const entry = (n: number): HistoryEntry => ({ id: `e${n}`, winner: `Winner ${n}`, at: n, slices: 6, chance: 16.7 });

describe('history', () => {
  it('puts the newest decision first', () => {
    const list = addToHistory([entry(1)], entry(2));
    expect(list.map((e) => e.id)).toEqual(['e2', 'e1']);
  });

  it('keeps at most the limit and drops the oldest', () => {
    let list: HistoryEntry[] = [];
    for (let i = 1; i <= HISTORY_LIMIT + 1; i++) list = addToHistory(list, entry(i));
    expect(list).toHaveLength(HISTORY_LIMIT);
    expect(list[0].id).toBe(`e${HISTORY_LIMIT + 1}`);
    expect(list.some((e) => e.id === 'e1')).toBe(false);
  });
});
