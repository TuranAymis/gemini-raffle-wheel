import { describe, expect, it } from 'vitest';
import { TOKENS, tokenCss, type Theme } from './tokens';
import { contrastRatio } from '../utils/contrast';

const THEMES: Theme[] = ['light', 'dark'];

describe('design tokens', () => {
  it('have the same names in both themes', () => {
    expect(Object.keys(TOKENS.dark).sort()).toEqual(Object.keys(TOKENS.light).sort());
  });

  it('are written as CSS variables for each theme', () => {
    const css = tokenCss();
    expect(css).toContain(':root {');
    expect(css).toContain(':root.dark {');
    expect(css).toContain(`--color-canvas: ${TOKENS.light.canvas.slice(1).match(/../g)!.map((h) => parseInt(h, 16)).join(' ')};`);
  });

  // Pairs and minimum ratios from docs/tasarim/tasarim-sistemi.md, section 2.
  const textPairs: [string, string][] = [
    ['text-primary', 'canvas'],
    ['text-primary', 'surface'],
    ['text-secondary', 'canvas'],
    ['text-secondary', 'surface'],
    ['text-secondary', 'surface-muted'],
    ['text-on-primary', 'primary'],
    ['text-tint', 'tint'],
    ['primary', 'canvas'],
    ['success', 'canvas'],
    ['warning', 'canvas'],
    ['error', 'canvas'],
  ];

  for (const theme of THEMES) {
    it(`${theme}: text pairs reach 4.5:1`, () => {
      for (const [text, background] of textPairs) {
        const ratio = contrastRatio(TOKENS[theme][text as keyof (typeof TOKENS)['light']], TOKENS[theme][background as keyof (typeof TOKENS)['light']]);
        expect(ratio, `${theme} ${text} on ${background}`).toBeGreaterThanOrEqual(4.5);
      }
    });

    it(`${theme}: control borders and focus ring reach 3:1`, () => {
      for (const background of ['canvas', 'surface'] as const) {
        expect(contrastRatio(TOKENS[theme]['border-control'], TOKENS[theme][background]), `${theme} border on ${background}`).toBeGreaterThanOrEqual(3);
        expect(contrastRatio(TOKENS[theme]['focus-ring'], TOKENS[theme][background]), `${theme} focus on ${background}`).toBeGreaterThanOrEqual(3);
      }
    });
  }
});
