import React from 'react';
import type { MessageKey } from '../i18n/messages';

type Translate = (key: MessageKey, vars?: Record<string, string | number>) => string;

interface BottomNavProps {
  t: Translate;
  onWheel: () => void;
  onOptions: () => void;
  onTemplates: () => void;
  onHistory: () => void;
  /** Which tab is shown: the wheel, or the options sheet while it is open. */
  active: 'wheel' | 'options';
}

const Icon: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <svg aria-hidden="true" viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    {children}
  </svg>
);

const itemClass = (on: boolean) =>
  `flex min-h-[56px] flex-col items-center justify-center gap-1 px-1 text-[12px] leading-tight font-semibold rounded-control focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus ${
    on ? 'text-primary' : 'text-ink-secondary hover:text-ink'
  }`;

/** Tabs at the bottom of the screen on phones: easy to reach with the thumb. Hidden from tablet width up. */
const BottomNav: React.FC<BottomNavProps> = ({ t, onWheel, onOptions, onTemplates, onHistory, active }) => (
  <nav
    aria-label={t('app.name')}
    className="md:hidden fixed inset-x-0 bottom-0 z-30 border-t border-line-subtle bg-surface pb-[env(safe-area-inset-bottom)]"
  >
    <ul className="grid grid-cols-4">
      <li>
        <button type="button" onClick={onWheel} aria-current={active === 'wheel' ? 'page' : undefined} className={`${itemClass(active === 'wheel')} w-full`}>
          <Icon><circle cx="12" cy="12" r="9" /><path d="M12 3v9l6.4 3.7" /></Icon>
          {t('nav.wheel')}
        </button>
      </li>
      <li>
        <button type="button" onClick={onOptions} aria-current={active === 'options' ? 'page' : undefined} className={`${itemClass(active === 'options')} w-full`}>
          <Icon><path d="M4 6h16M4 12h16M4 18h10" /></Icon>
          {t('list.title')}
        </button>
      </li>
      <li>
        <button type="button" onClick={onTemplates} className={`${itemClass(false)} w-full`}>
          <Icon><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /></Icon>
          {t('templates.title')}
        </button>
      </li>
      <li>
        <button type="button" onClick={onHistory} className={`${itemClass(false)} w-full`}>
          <Icon><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></Icon>
          {t('history.title')}
        </button>
      </li>
    </ul>
  </nav>
);

export default BottomNav;
