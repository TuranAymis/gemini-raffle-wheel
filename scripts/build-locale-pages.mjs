// Writes the Turkish and English pages (/tr/ and /en/) from the built index.html, after `vite build`.
// Each page gets its own language, title, description, canonical address, hreflang links and starting text, so a
// crawler that does not run JavaScript still sees the right language. The app itself then runs as before.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..', 'dist');
const SITE = 'https://kurala.fun';

const PAGES = {
  en: {
    lang: 'en',
    ogLocale: 'en_US',
    title: 'Kurala: Free Online Raffle and Random Picker Wheel',
    description:
      'Kurala is a free online raffle and random picker wheel. Add names or options, spin the wheel and pick a winner. Runs in your browser.',
    ogDescription: 'Add names or options, spin the wheel and pick a winner. Free, runs in your browser.',
    twitterDescription: 'Add names or options, spin the wheel and pick a winner.',
    heading: 'Kurala: free online raffle and random picker wheel',
    paragraphs: [
      'Kurala is a free wheel for raffles, team draws and random picks. Add names or options, spin the wheel and pick a winner.',
      'It runs entirely in your browser. Nothing you type is sent to a server.',
    ],
  },
  tr: {
    lang: 'tr',
    ogLocale: 'tr_TR',
    title: 'Kurala: Ücretsiz Online Kura ve Rastgele Seçim Çarkı',
    description:
      'Kurala ile ücretsiz online kura çekin ve rastgele seçim yapın. İsimleri ya da seçenekleri ekleyin, çarkı çevirin ve kazananı belirleyin. Tarayıcınızda çalışır.',
    ogDescription: 'İsimleri ya da seçenekleri ekleyin, çarkı çevirin ve kazananı belirleyin. Ücretsiz, tarayıcınızda çalışır.',
    twitterDescription: 'İsimleri ya da seçenekleri ekleyin, çarkı çevirin ve kazananı belirleyin.',
    heading: 'Kurala: ücretsiz online kura ve rastgele seçim çarkı',
    paragraphs: [
      'Kurala; kura, takım çekimi ve rastgele seçimler için ücretsiz bir çarktır. İsimleri veya seçenekleri ekleyin, çarkı çevirin ve kazananı belirleyin.',
      'Her şey tarayıcınızda çalışır. Yazdıklarınız bir sunucuya gönderilmez.',
    ],
  },
};

const template = readFileSync(join(root, 'index.html'), 'utf8');

// The address each page answers at, and the page that the root address is treated as.
const addressOf = (locale) => `${SITE}/${locale}/`;

function render(locale, { canonicalLocale }) {
  const page = PAGES[locale];
  const canonical = addressOf(canonicalLocale);
  const block = [
    `    <meta name="description" content="${page.description}" />`,
    `    <link rel="canonical" href="${canonical}" />`,
    `    <link rel="alternate" hreflang="tr" href="${addressOf('tr')}" />`,
    `    <link rel="alternate" hreflang="en" href="${addressOf('en')}" />`,
    `    <link rel="alternate" hreflang="x-default" href="${SITE}/" />`,
    `    <meta property="og:locale" content="${page.ogLocale}" />`,
    `    <meta property="og:title" content="${page.title}" />`,
    `    <meta property="og:description" content="${page.ogDescription}" />`,
    `    <meta property="og:url" content="${addressOf(locale)}" />`,
    `    <meta name="twitter:title" content="${page.title}" />`,
    `    <meta name="twitter:description" content="${page.twitterDescription}" />`,
  ].join('\n');

  const main = `
      <main style="max-width: 40rem; margin: 3rem auto; padding: 0 1rem; font-family: Inter, system-ui, sans-serif">
        <h1 style="font-size: 2rem; font-weight: 700; margin: 0 0 0.75rem">${page.heading}</h1>
${page.paragraphs.map((text, index) => `        <p style="margin: ${index === page.paragraphs.length - 1 ? '0' : '0 0 0.75rem'}">${text}</p>`).join('\n')}
      </main>
    `;

  let html = template
    .replace(/<html lang="[^"]*"/, `<html lang="${page.lang}"`)
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${page.title}</title>`)
    // Tags this script owns are taken out and written again below.
    .replace(/<meta\s+(?:name|property)="(?:description|og:locale|og:title|og:description|og:url|twitter:title|twitter:description)"[\s\S]*?>\s*/g, '')
    .replace(/<link rel="canonical"[^>]*>\s*/g, '')
    .replace(/<\/head>/, `${block}\n  </head>`)
    .replace(/<div id="root">[\s\S]*?<\/main>\s*<\/div>/, `<div id="root">${main}</div>`);

  if (html === template) throw new Error(`Nothing changed for ${locale}: the built index.html has an unexpected shape.`);
  return html;
}

// The root address keeps the English text and points its canonical at the English page.
writeFileSync(join(root, 'index.html'), render('en', { canonicalLocale: 'en' }));
for (const locale of ['tr', 'en']) {
  mkdirSync(join(root, locale), { recursive: true });
  writeFileSync(join(root, locale, 'index.html'), render(locale, { canonicalLocale: locale }));
}
console.log('Wrote dist/index.html, dist/tr/index.html and dist/en/index.html');
