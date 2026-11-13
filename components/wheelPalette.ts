import { readableTextOn } from '../utils/contrast';

/**
 * Slice colors from docs/tasarim/tasarim-sistemi.md, section 3. Labels are dark or white, whichever
 * reaches 4.5:1 on the slice (see labelColorFor).
 */
export const WHEEL_PALETTE = {
  light: {
    slices: ['#4F46E5', '#06B6D4', '#10B981', '#F59E0B', '#FB7185', '#A855F7'],
    boundary: '#FFFFFF',
  },
  dark: {
    slices: ['#818CF8', '#22D3EE', '#34D399', '#FBBF24', '#FDA4AF', '#C084FC'],
    boundary: '#1E293B',
  },
} as const;

/** Hub, pointer and ring colors for each theme. */
export const WHEEL_CHROME = {
  light: { ring: "#E2E8F0", hub: "#4F46E5", hubText: "#FFFFFF", pointer: "#0F172A", pointerEdge: "#FFFFFF" },
  dark: { ring: "#334155", hub: "#818CF8", hubText: "#0F172A", pointer: "#F8FAFC", pointerEdge: "#0F172A" },
} as const;

export type WheelTheme = keyof typeof WHEEL_PALETTE;

const LABEL_CANDIDATES = ['#0F172A', '#FFFFFF'] as const;

/** The label color that reads best on a slice: dark slate or white. */
export const labelColorFor = (fill: string): string => readableTextOn(fill, LABEL_CANDIDATES);

/**
 * Colors for every slice in wheel order. `fixed` holds the color of a fixed slice, or null for a participant slice.
 * Participants take palette colors in turn, and no two neighbors share a color, the last and first slice included.
 */
export function assignSliceColors(fixed: readonly (string | null)[], palette: readonly string[]): string[] {
  const out: string[] = [];
  let ordinal = 0;
  for (const fixedColor of fixed) {
    if (fixedColor) {
      out.push(fixedColor);
      continue;
    }
    const previous = out[out.length - 1];
    let color = palette[ordinal % palette.length];
    for (let step = 0; step < palette.length && color === previous; step++) {
      color = palette[(ordinal + step + 1) % palette.length];
    }
    out.push(color);
    ordinal++;
  }

  // The last slice touches the first one again, so it must differ from both neighbors.
  const last = out.length - 1;
  const participantAt = (i: number) => fixed[i] === null;
  if (out.length > 2 && participantAt(last) && out[last] === out[0]) {
    const neighbor = out[last - 1];
    out[last] = palette.find((c) => c !== neighbor && c !== out[0]) ?? out[last];
  }
  return out;
}
