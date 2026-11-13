/**
 * Advertising settings. Nothing here is set by default: AdSense stays off until a publisher id is given
 * in the build environment (VITE_ADSENSE_CLIENT, e.g. ca-pub-1234567890123456).
 */

export const ADSENSE_CLIENT: string = import.meta.env.VITE_ADSENSE_CLIENT ?? '';
export const ADSENSE_ENABLED = /^ca-pub-\d+$/.test(ADSENSE_CLIENT);

/** The ad unit id for each slot. Without one, the slot goes straight to the house ads. */
export const ADSENSE_SLOTS: Record<AdPlacement, string> = {
  sidebar: import.meta.env.VITE_ADSENSE_SLOT_SIDEBAR ?? '',
  footer: import.meta.env.VITE_ADSENSE_SLOT_FOOTER ?? '',
};

export type AdPlacement = 'sidebar' | 'footer';

export interface HouseAd {
  id: 'devtoolbox' | 'vento';
  /** The address to open. An ad without an address is not shown. */
  url: string;
}

/** Our own apps. They are plain links: no tracking, no cookies. */
export const HOUSE_ADS: HouseAd[] = [
  { id: 'devtoolbox', url: 'https://dev-toolbox.site/' },
  { id: 'vento', url: 'https://ventoride.com/' },
];
