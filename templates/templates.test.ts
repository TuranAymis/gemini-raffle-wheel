import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { CATEGORIES, TEMPLATES } from './data';
import { LOCALES } from '../i18n';

const source = JSON.parse(
  readFileSync(new URL('../docs/sablonlar/hazir-sablonlar.json', import.meta.url), 'utf8')
) as {
  templates: { id: string; title: string; description: string; options: string[]; requiresCustomization: boolean }[];
};

const PLACEHOLDER = /^(Katılımcı|Öğrenci) \d+$/;

describe('ready-made templates', () => {
  it('match the Turkish source file, template by template', () => {
    expect([...TEMPLATES.map((t) => t.id)].sort()).toEqual(source.templates.map((t) => t.id).sort());
    for (const template of TEMPLATES) {
      const original = source.templates.find((s) => s.id === template.id)!;
      expect(template.title.tr, template.id).toBe(original.title);
      expect(template.description.tr, template.id).toBe(original.description);
      expect(template.options.map((o) => o.tr), template.id).toEqual(original.options);
      expect(template.requiresCustomization, template.id).toBe(original.requiresCustomization);
    }
  });

  it('have text in every language', () => {
    for (const template of TEMPLATES) {
      for (const locale of LOCALES) {
        expect(template.title[locale], `${template.id} title ${locale}`).toBeTruthy();
        expect(template.description[locale], `${template.id} description ${locale}`).toBeTruthy();
        for (const option of template.options) {
          expect(option[locale], `${template.id} option ${locale}`).toBeTruthy();
        }
      }
    }
  });

  it('keep every option within the app limits in every language', () => {
    for (const template of TEMPLATES) {
      expect(template.options.length, template.id).toBeGreaterThanOrEqual(2);
      expect(template.options.length, template.id).toBeLessThanOrEqual(200);
      for (const locale of LOCALES) {
        const names = template.options.map((o) => o[locale]);
        for (const name of names) {
          expect(name.length, `${template.id} ${locale}: ${name}`).toBeLessThanOrEqual(60);
          expect(name, `${template.id} ${locale}`).toBe(name.trim());
        }
        expect(new Set(names.map((n) => n.toLocaleLowerCase(locale))).size, `${template.id} duplicates in ${locale}`).toBe(
          names.length
        );
      }
    }
  });

  it('use placeholders only where the template asks for customization', () => {
    for (const template of TEMPLATES) {
      const hasPlaceholder = template.options.some((o) => PLACEHOLDER.test(o.tr));
      expect(hasPlaceholder, template.id).toBe(template.requiresCustomization);
    }
  });

  it('belong to a known category', () => {
    const known = new Set(CATEGORIES.map((c) => c.id));
    for (const template of TEMPLATES) expect(known.has(template.category), template.id).toBe(true);
  });

  it('keep proper names the same in every language', () => {
    const protectedNames = [
      'Galatasaray', 'Fenerbahçe', 'Beşiktaş', 'Real Madrid', 'Bayern Münih', 'Valorant', 'Minecraft', 'Jett',
      'Mirage', 'Dust2', 'Inception', 'Breaking Bad', 'Premier League', 'Lahmacun', 'Mantı', 'Döner', 'ADC', 'Overcooked',
    ];
    for (const name of protectedNames) {
      const found = TEMPLATES.flatMap((t) => t.options).find((o) => o.tr === name);
      if (!found) continue;
      for (const locale of LOCALES) expect(found[locale], `${name} in ${locale}`).toBe(name);
    }
  });
});
