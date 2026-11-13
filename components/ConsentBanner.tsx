import React from 'react';
import type { MessageKey } from '../i18n/messages';
import type { Consent } from '../ads/consent';

type Translate = (key: MessageKey, vars?: Record<string, string | number>) => string;

interface ConsentBannerProps {
  t: Translate;
  onAnswer: (consent: Consent) => void;
}

/** Asked before any advertising cookie is set. Both answers are equally easy to give. */
const ConsentBanner: React.FC<ConsentBannerProps> = ({ t, onAnswer }) => (
  <section
    aria-labelledby="consent-title"
    className="fixed inset-x-md bottom-24 md:bottom-md md:left-auto md:right-md md:w-[420px] z-40 rounded-card bg-surface p-md shadow-3 border border-line-subtle"
  >
    <h2 id="consent-title" className="font-display text-headline-sm mb-xs">{t('consent.title')}</h2>
    <p className="text-body-sm text-ink-secondary mb-md">{t('consent.body')}</p>
    <div className="grid gap-sm sm:grid-cols-2">
      <button
        type="button"
        onClick={() => onAnswer('declined')}
        className="min-h-[44px] rounded-control border border-line-control px-md font-semibold text-ink hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
      >
        {t('consent.decline')}
      </button>
      <button
        type="button"
        onClick={() => onAnswer('accepted')}
        className="min-h-[44px] rounded-control bg-primary px-md font-semibold text-ink-on-primary hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
      >
        {t('consent.accept')}
      </button>
    </div>
  </section>
);

export default ConsentBanner;
