/** Shown the first time the wheel is opened. They are only saved once someone changes the list. */
export const EXAMPLE_OPTIONS = [
  'Cristiano Ronaldo',
  'Lionel Messi',
  'Zlatan İbrahimović',
  'Zinedine Zidane',
  'Pelé',
  'Diego Maradona',
  'Johan Cruyff',
  'Ronaldinho',
  'Franz Beckenbauer',
  'Michel Platini',
];

export const MAX_OPTIONS = 200;
export const MAX_OPTION_LENGTH = 60;

/** Case-insensitive key that treats Turkish letters properly (İ/i, I/ı). */
const keyOf = (name: string) => name.toLocaleLowerCase('tr-TR');

/** Trims, collapses inner spaces and limits the length. Empty names come back as "". */
export const cleanName = (raw: string): string => raw.replace(/\s+/g, ' ').trim().slice(0, MAX_OPTION_LENGTH);

export interface AddResult {
  list: string[];
  added: number;
  duplicates: number;
  overflow: number;
}

/**
 * Adds names to a list. Empty names are skipped, names already in the list are counted as duplicates, and the list
 * never grows past MAX_OPTIONS (the rest are counted as overflow).
 */
export function addOptions(current: readonly string[], incoming: readonly string[]): AddResult {
  const seen = new Set(current.map(keyOf));
  const list = [...current];
  let added = 0;
  let duplicates = 0;
  let overflow = 0;
  for (const raw of incoming) {
    const name = cleanName(raw);
    if (name === '') continue;
    const key = keyOf(name);
    if (seen.has(key)) {
      duplicates++;
      continue;
    }
    if (list.length >= MAX_OPTIONS) {
      overflow++;
      continue;
    }
    seen.add(key);
    list.push(name);
    added++;
  }
  return { list, added, duplicates, overflow };
}
