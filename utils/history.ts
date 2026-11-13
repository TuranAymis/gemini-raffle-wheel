/** One finished decision, kept in this browser only. */
export interface HistoryEntry {
  id: string;
  winner: string;
  /** Time of the decision, in milliseconds since 1970. */
  at: number;
  /** How many slices the wheel had, and the chance each one had. */
  slices: number;
  chance: number;
}

export const HISTORY_LIMIT = 50;
const KEY = 'kurala-history';

const isEntry = (value: unknown): value is HistoryEntry => {
  if (typeof value !== 'object' || value === null) return false;
  const entry = value as Record<string, unknown>;
  return (
    typeof entry.id === 'string' &&
    typeof entry.winner === 'string' &&
    typeof entry.at === 'number' &&
    typeof entry.slices === 'number' &&
    typeof entry.chance === 'number'
  );
};

/** The saved decisions, newest first. A damaged or missing save gives an empty history. */
export function loadHistory(): HistoryEntry[] {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw === null) return [];
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter(isEntry).slice(0, HISTORY_LIMIT) : [];
  } catch {
    return [];
  }
}

/** Saves the history. Returns false when the browser does not allow saving. */
export function saveHistory(entries: readonly HistoryEntry[]): boolean {
  try {
    localStorage.setItem(KEY, JSON.stringify(entries));
    return true;
  } catch {
    return false;
  }
}

/** A new decision goes first; the oldest ones drop off past the limit. */
export function addToHistory(entries: readonly HistoryEntry[], entry: HistoryEntry): HistoryEntry[] {
  return [entry, ...entries].slice(0, HISTORY_LIMIT);
}
