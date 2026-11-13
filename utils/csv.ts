const HEADER_WORDS = new Set(['ad', 'adı', 'adi', 'isim', 'name', 'seçenek', 'secenek', 'option', 'options', 'kişi', 'kisi']);

/** Reads CSV bytes as UTF-8, or as Windows-1254 (Turkish Excel's default) when they are not valid UTF-8. */
export function decodeCsv(bytes: ArrayBuffer): string {
  let text: string;
  try {
    text = new TextDecoder('utf-8', { fatal: true }).decode(bytes);
  } catch {
    text = new TextDecoder('windows-1254').decode(bytes);
  }
  return text.replace(/^﻿/, '');
}

/** The separator the first non-empty line uses most: comma, semicolon (Turkish Excel) or tab. */
export function detectDelimiter(text: string): string {
  const firstLine = text.split(/\r?\n/).find((line) => line.trim() !== '') ?? '';
  let best = ',';
  let bestCount = 0;
  for (const delimiter of [',', ';', '\t']) {
    const count = firstLine.split(delimiter).length - 1;
    if (count > bestCount) {
      best = delimiter;
      bestCount = count;
    }
  }
  return best;
}

/** Splits CSV text into rows of cells. Quoted cells may hold separators, line breaks and doubled quotes. */
export function parseDelimited(text: string, delimiter = detectDelimiter(text)): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = '';
  let quoted = false;
  let i = 0;
  while (i < text.length) {
    const ch = text[i];
    if (quoted) {
      if (ch === '"') {
        if (text[i + 1] === '"') {
          cell += '"';
          i += 2;
          continue;
        }
        quoted = false;
      } else {
        cell += ch;
      }
      i++;
      continue;
    }
    if (ch === '"') {
      quoted = true;
    } else if (ch === delimiter) {
      row.push(cell);
      cell = '';
    } else if (ch === '\r' || ch === '\n') {
      row.push(cell);
      rows.push(row);
      row = [];
      cell = '';
      if (ch === '\r' && text[i + 1] === '\n') i++;
    } else {
      cell += ch;
    }
    i++;
  }
  if (cell !== '' || row.length > 0) {
    row.push(cell);
    rows.push(row);
  }
  return rows;
}

/**
 * The names in the first column. A header row ("Ad", "İsim", "Name" ...) at the top is left out. Numbers and other
 * spreadsheet values are written as text.
 */
export function namesFromRows(rows: readonly (readonly unknown[])[]): string[] {
  const names = rows
    .map((row) => (row[0] === null || row[0] === undefined ? '' : String(row[0]).trim()))
    .filter((name) => name !== '');
  if (names.length > 0 && HEADER_WORDS.has(names[0]!.toLocaleLowerCase('tr-TR'))) names.shift();
  return names;
}

export const namesFromCsv = (text: string): string[] => namesFromRows(parseDelimited(text));
