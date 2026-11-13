import { ADSENSE_CLIENT } from './config';

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

let loading: Promise<void> | null = null;

/** Loads Google's ad script once. Only called when a publisher id is set. */
export function loadAdsense(): Promise<void> {
  if (loading) return loading;
  loading = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.async = true;
    script.crossOrigin = 'anonymous';
    script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${encodeURIComponent(ADSENSE_CLIENT)}`;
    script.onload = () => resolve();
    script.onerror = () => {
      loading = null;
      reject(new Error('AdSense script failed to load'));
    };
    document.head.appendChild(script);
  });
  return loading;
}

/** Asks AdSense to fill one ad unit. */
export function requestAd(): void {
  try {
    (window.adsbygoogle = window.adsbygoogle ?? []).push({});
  } catch {
    // The script may be blocked: the slot then falls back to a house ad.
  }
}
