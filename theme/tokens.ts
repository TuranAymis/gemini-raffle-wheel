/**
 * Color tokens for both themes. These hex values are the single source for the design system
 * (docs/tasarim/tasarim-sistemi.md, section 2). They are written to the page as CSS variables
 * and the Tailwind config in index.html refers to them by name.
 */

export type Theme = 'light' | 'dark';

export const TOKENS = {
  light: {
    canvas: '#F8FAFC',
    surface: '#FFFFFF',
    'surface-muted': '#F1F5F9',
    tint: '#E0E7FF',
    'text-primary': '#0F172A',
    'text-secondary': '#475569',
    'text-on-primary': '#FFFFFF',
    'text-tint': '#3730A3',
    primary: '#4F46E5',
    'primary-hover': '#4338CA',
    'border-control': '#64748B',
    'border-subtle': '#E2E8F0',
    success: '#047857',
    warning: '#B45309',
    error: '#B91C1C',
    'focus-ring': '#4F46E5',
    overlay: '#0F172A',
  },
  dark: {
    canvas: '#0F172A',
    surface: '#1E293B',
    'surface-muted': '#273449',
    tint: '#312E81',
    'text-primary': '#F8FAFC',
    'text-secondary': '#94A3B8',
    'text-on-primary': '#0F172A',
    'text-tint': '#C7D2FE',
    primary: '#818CF8',
    'primary-hover': '#A5B4FC',
    'border-control': '#64748B',
    'border-subtle': '#334155',
    success: '#34D399',
    warning: '#FBBF24',
    error: '#F87171',
    'focus-ring': '#818CF8',
    overlay: '#020617',
  },
} as const satisfies Record<Theme, Record<string, string>>;

export type TokenName = keyof (typeof TOKENS)['light'];

const hexToTriplet = (hex: string): string => {
  const value = hex.replace('#', '');
  return [0, 2, 4].map((i) => parseInt(value.slice(i, i + 2), 16)).join(' ');
};

/** CSS custom properties for both themes. Values are "r g b" triplets so Tailwind can add opacity. */
export const tokenCss = (): string => {
  const block = (theme: Theme) =>
    (Object.keys(TOKENS[theme]) as TokenName[])
      .map((name) => `  --color-${name}: ${hexToTriplet(TOKENS[theme][name])};`)
      .join('\n');
  return `:root {\n${block('light')}\n}\n:root.dark {\n${block('dark')}\n}`;
};

export const THEME_STORAGE_KEY = 'kurala-theme';
const STYLE_ID = 'kurala-tokens';

/** The saved choice, or the system preference when nothing is saved yet (the first visit). */
export const initialTheme = (): Theme => {
  try {
    const saved = localStorage.getItem(THEME_STORAGE_KEY);
    if (saved === 'light' || saved === 'dark') return saved;
  } catch {
    // Storage can be blocked: fall back to the system preference.
  }
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

/** Writes the token variables into the page and switches the root class to the theme. */
export const applyTheme = (theme: Theme): void => {
  let style = document.getElementById(STYLE_ID);
  if (!style) {
    style = document.createElement('style');
    style.id = STYLE_ID;
    document.head.appendChild(style);
  }
  style.textContent = tokenCss();
  document.documentElement.classList.toggle('dark', theme === 'dark');
};
