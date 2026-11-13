import { describe, expect, it } from 'vitest';
import { WHEEL_PALETTE, assignSliceColors, labelColorFor } from './wheelPalette';
import { contrastRatio } from '../utils/contrast';

// The two fixed slices in App.tsx.
const FIXED_FILLS = ['#064e3b', '#7f1d1d'];

describe('slice labels', () => {
  for (const theme of ['light', 'dark'] as const) {
    it(`${theme}: every palette slice reaches 4.5:1 with its label`, () => {
      for (const fill of WHEEL_PALETTE[theme].slices) {
        const label = labelColorFor(fill);
        expect(contrastRatio(label, fill), `${theme} ${fill} with ${label}`).toBeGreaterThanOrEqual(4.5);
      }
    });
  }

  it('fixed slices keep readable labels too', () => {
    for (const fill of FIXED_FILLS) {
      expect(contrastRatio(labelColorFor(fill), fill)).toBeGreaterThanOrEqual(4.5);
    }
  });

  it('uses white on dark slices and slate on light ones', () => {
    expect(labelColorFor('#4F46E5')).toBe('#FFFFFF');
    expect(labelColorFor('#06B6D4')).toBe('#0F172A');
  });
});

describe('assignSliceColors', () => {
  const palette = WHEEL_PALETTE.dark.slices;

  const neighborsDiffer = (colors: string[]) =>
    colors.every((color, i) => color !== colors[(i + 1) % colors.length]);

  it('never gives two touching slices the same color, for 2 to 200 participants', () => {
    for (let n = 2; n <= 200; n++) {
      const colors = assignSliceColors(Array(n).fill(null), palette);
      expect(neighborsDiffer(colors), `${n} participants`).toBe(true);
    }
  });

  it('keeps fixed slices where they are and never repeats them next to participants', () => {
    const fixed = ['#064e3b', null, null, '#7f1d1d', null, null, null];
    const colors = assignSliceColors(fixed, palette);
    expect(colors[0]).toBe('#064e3b');
    expect(colors[3]).toBe('#7f1d1d');
    expect(neighborsDiffer(colors)).toBe(true);
  });

  it('cycles through the palette in order', () => {
    expect(assignSliceColors([null, null, null], palette)).toEqual([palette[0], palette[1], palette[2]]);
  });
});
