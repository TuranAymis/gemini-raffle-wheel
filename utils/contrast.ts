/** WCAG 2.x contrast helpers. Colors are "#rrggbb" strings. */

export const hexToRgb = (hex: string): [number, number, number] => {
  const value = hex.replace('#', '');
  if (!/^[0-9a-fA-F]{6}$/.test(value)) throw new Error(`Not a 6-digit hex color: ${hex}`);
  return [0, 2, 4].map((i) => parseInt(value.slice(i, i + 2), 16)) as [number, number, number];
};

const channel = (value: number): number => {
  const c = value / 255;
  return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
};

/** Relative luminance (0 for black, 1 for white). */
export const luminance = (hex: string): number => {
  const [r, g, b] = hexToRgb(hex).map(channel);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

/** Contrast ratio between two colors, from 1 to 21. */
export const contrastRatio = (a: string, b: string): number => {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};

/** The candidate text color with the highest contrast on the given background. */
export const readableTextOn = (background: string, candidates: readonly string[]): string =>
  candidates.reduce((best, next) => (contrastRatio(next, background) > contrastRatio(best, background) ? next : best));
