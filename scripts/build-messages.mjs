// Builds i18n/messages.ts from docs/tasarim/metin-sozlugu.md, so the copy is written once.
// Run with: npm run i18n
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const source = join(root, 'docs', 'tasarim', 'metin-sozlugu.md');
const target = join(root, 'i18n', 'messages.ts');

const LOCALES = ['en', 'tr', 'de', 'es', 'ja', 'zh-CN'];

const cellsOf = (line) => line.trim().replace(/^\|/, '').replace(/\|$/, '').split('|').map((cell) => cell.trim());

const messages = {};
let header = null;

for (const line of readFileSync(source, 'utf8').split('\n')) {
  if (!line.startsWith('|')) {
    header = null;
    continue;
  }
  const cells = cellsOf(line);
  if (cells[0] === 'key') {
    header = cells.slice(1);
    if (JSON.stringify(header) !== JSON.stringify(LOCALES)) {
      throw new Error(`Unexpected language columns: ${header.join(', ')}`);
    }
    continue;
  }
  if (!header || cells[0].startsWith('---')) continue;

  const [key, ...values] = cells;
  if (values.length !== LOCALES.length) throw new Error(`${key}: expected ${LOCALES.length} languages, got ${values.length}`);
  if (messages[key]) throw new Error(`Duplicate key: ${key}`);
  messages[key] = Object.fromEntries(LOCALES.map((locale, i) => [locale, values[i]]));
}

const body = Object.entries(messages)
  .map(([key, values]) => {
    const fields = LOCALES.map((locale) => `    ${JSON.stringify(locale)}: ${JSON.stringify(values[locale])},`);
    return `  ${JSON.stringify(key)}: {\n${fields.join('\n')}\n  },`;
  })
  .join('\n');

writeFileSync(
  target,
  `// Generated from docs/tasarim/metin-sozlugu.md by scripts/build-messages.mjs. Do not edit by hand.\n` +
    `export const MESSAGES = {\n${body}\n} as const;\n\n` +
    `export type MessageKey = keyof typeof MESSAGES;\n`
);
console.log(`Wrote ${Object.keys(messages).length} keys to i18n/messages.ts`);
