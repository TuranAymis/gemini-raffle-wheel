import React, { useEffect, useRef, useState } from 'react';
import { ADSENSE_CLIENT, ADSENSE_ENABLED, ADSENSE_SLOTS, type AdPlacement, type HouseAd } from '../ads/config';
import type { Consent } from '../ads/consent';
import { houseAdFor } from '../ads/house';
import { loadAdsense, requestAd } from '../ads/adsense';
import type { MessageKey } from '../i18n/messages';

type Translate = (key: MessageKey, vars?: Record<string, string | number>) => string;

/** How long AdSense gets to fill the slot before our own ad takes its place. */
const FILL_TIMEOUT_MS = 5000;

interface AdSlotProps {
  placement: AdPlacement;
  t: Translate;
  /** Google is used only after the visitor accepts; otherwise the space shows our own app. */
  consent: Consent | null;
}

/** One of our own apps, as a plain link. It shows nothing that tracks the visitor. */
const HouseCard: React.FC<{ ad: HouseAd; t: Translate }> = ({ ad, t }) => (
  <a
    href={ad.url}
    target="_blank"
    rel="noopener noreferrer"
    className="flex min-h-[44px] flex-col justify-center gap-xs rounded-control p-sm hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
  >
    <span className="font-display text-headline-sm">{t(`ads.${ad.id}.title` as MessageKey)}</span>
    <span className="text-body-sm text-ink-secondary">{t(`ads.${ad.id}.text` as MessageKey)}</span>
    <span className="text-label-md text-primary">{t(`ads.${ad.id}.cta` as MessageKey)} →</span>
  </a>
);

/**
 * A reserved ad space. It shows an AdSense unit when one fills; otherwise (no fill, blocked, or AdSense off) it shows
 * one of our own apps. Nothing is shown when there is neither. The space is reserved while AdSense loads, so the page does not jump.
 */
const AdSlot: React.FC<AdSlotProps> = ({ placement, t, consent }) => {
  const adUnit = ADSENSE_SLOTS[placement];
  const useAdsense = ADSENSE_ENABLED && adUnit !== '' && consent === 'accepted';
  const [mode, setMode] = useState<'pending' | 'adsense' | 'house'>(useAdsense ? 'pending' : 'house');
  const insRef = useRef<HTMLModElement>(null);
  const house = houseAdFor(placement);

  useEffect(() => {
    if (mode !== 'pending') return;
    let cancelled = false;
    loadAdsense()
      .then(() => {
        if (!cancelled) requestAd();
      })
      .catch(() => {
        if (!cancelled) setMode('house');
      });

    const started = Date.now();
    const timer = window.setInterval(() => {
      const status = insRef.current?.getAttribute('data-ad-status');
      if (status === 'filled') setMode('adsense');
      else if (status === 'unfilled' || Date.now() - started > FILL_TIMEOUT_MS) setMode('house');
      else return;
      window.clearInterval(timer);
    }, 300);

    return () => {
      cancelled = true;
      window.clearInterval(timer);
    };
  }, [mode]);

  if (mode === 'house' && !house) return null;

  return (
    <section aria-label={t('ads.label')} className="rounded-card border border-line-subtle bg-surface-muted p-md">
      <p className="mb-xs text-label-sm text-ink-secondary">{t('ads.label')}</p>
      <div className="min-h-[100px]">
        {mode === 'house' && house ? (
          <HouseCard ad={house} t={t} />
        ) : (
          <ins
            ref={insRef}
            className="adsbygoogle block"
            style={{ display: 'block' }}
            data-ad-client={ADSENSE_CLIENT}
            data-ad-slot={adUnit}
            data-ad-format="auto"
            data-full-width-responsive="true"
          />
        )}
      </div>
    </section>
  );
};

export default AdSlot;
