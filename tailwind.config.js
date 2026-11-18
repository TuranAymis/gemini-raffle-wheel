// Tailwind settings for Kurala. The values are the ones the page used to load from the Tailwind CDN at run time;
// now the classes are generated at build time, so only the classes the code uses end up in the stylesheet.
const token = (name) => `rgb(var(--color-${name}) / <alpha-value>)`;

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './**/*.{ts,tsx}', '!./node_modules/**', '!./dist/**'],
  theme: {
    extend: {
      colors: {
        canvas: token('canvas'),
        surface: token('surface'),
        'surface-muted': token('surface-muted'),
        tint: token('tint'),
        ink: {
          DEFAULT: token('text-primary'),
          secondary: token('text-secondary'),
          tint: token('text-tint'),
          'on-primary': token('text-on-primary'),
        },
        primary: {
          DEFAULT: token('primary'),
          hover: token('primary-hover'),
        },
        line: {
          control: token('border-control'),
          subtle: token('border-subtle'),
        },
        focus: token('focus-ring'),
        success: token('success'),
        warning: token('warning'),
        error: token('error'),
        overlay: token('overlay'),
      },
      fontFamily: {
        display: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        display: ['2.5rem', { lineHeight: '3rem', letterSpacing: '-0.02em', fontWeight: '800' }],
        'headline-lg': ['2rem', { lineHeight: '2.5rem', letterSpacing: '-0.015em', fontWeight: '700' }],
        'headline-md': ['1.375rem', { lineHeight: '1.875rem', fontWeight: '600' }],
        'headline-sm': ['1.125rem', { lineHeight: '1.625rem', fontWeight: '600' }],
        'body-lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'body-md': ['1rem', { lineHeight: '1.5rem' }],
        'body-sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'label-lg': ['1rem', { lineHeight: '1.25rem', fontWeight: '600', letterSpacing: '0.01em' }],
        'label-md': ['0.875rem', { lineHeight: '1.125rem', fontWeight: '600', letterSpacing: '0.01em' }],
        'label-sm': ['0.75rem', { lineHeight: '1rem', fontWeight: '500', letterSpacing: '0.02em' }],
      },
      spacing: {
        xs: '0.25rem',
        sm: '0.5rem',
        md: '1rem',
        lg: '1.5rem',
        xl: '2.5rem',
      },
      borderRadius: {
        control: '8px',
        card: '16px',
        modal: '24px',
      },
      boxShadow: {
        1: 'var(--shadow-1)',
        2: 'var(--shadow-2)',
        3: 'var(--shadow-3)',
      },
    },
  },
  plugins: [],
};
