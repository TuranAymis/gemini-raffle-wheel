import React from 'react';
import { LOCALES, isLocale, type Locale } from '../i18n';
import { MESSAGES, type MessageKey } from '../i18n/messages';
import type { Theme } from '../theme/tokens';

type Translate = (key: MessageKey, vars?: Record<string, string | number>) => string;

interface TopBarProps {
  t: Translate;
  locale: Locale;
  onLocale: (locale: Locale) => void;
  theme: Theme;
  onToggleTheme: () => void;
  onWheel: () => void;
  onTemplates: () => void;
  onHistory: () => void;
}

const navClass = 'min-h-[44px] rounded-control px-md text-label-lg text-ink-secondary hover:text-ink hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus';

/** Brand, privacy note, navigation, language and theme. */
const TopBar: React.FC<TopBarProps> = ({ t, locale, onLocale, theme, onToggleTheme, onWheel, onTemplates, onHistory }) => (
  <header className="w-full border-b border-line-subtle bg-surface">
    <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-sm px-md py-xs md:py-sm md:px-lg">
      <p className="font-display text-headline-md font-extrabold tracking-tight mr-sm">{t('app.name')}</p>
      <p className="hidden lg:block rounded-full bg-tint text-ink-tint text-label-sm px-md py-xs">{t('privacy.badge')}</p>

      <nav aria-label={t('app.name')} className="hidden md:flex ml-auto flex-wrap items-center gap-xs">
        <button type="button" onClick={onWheel} aria-current="page" className={navClass}>{t('nav.wheel')}</button>
        <button type="button" onClick={onTemplates} className={navClass}>{t('templates.title')}</button>
        <button type="button" onClick={onHistory} className={navClass}>{t('history.title')}</button>
      </nav>

      <div className="flex items-center gap-xs">
        <label className="sr-only" htmlFor="language-select">{t('nav.language')}</label>
        <select
          id="language-select"
          value={locale}
          onChange={(event) => {
            if (isLocale(event.target.value)) onLocale(event.target.value);
          }}
          className="min-h-[44px] rounded-control border border-line-control bg-surface-muted px-sm text-label-md text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
        >
          {LOCALES.map((code) => (
            <option key={code} value={code}>{MESSAGES['lang.name'][code]}</option>
          ))}
        </select>
        <button
          type="button"
          onClick={onToggleTheme}
          aria-label={t('nav.theme')}
          aria-pressed={theme === 'dark'}
          className="min-h-[44px] min-w-[44px] rounded-control border border-line-control text-ink hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
        >
          {theme === 'dark' ? '☀' : '☾'}
        </button>
      </div>
    </div>
  </header>
);

export default TopBar;
