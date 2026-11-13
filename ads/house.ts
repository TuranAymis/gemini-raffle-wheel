import { HOUSE_ADS, type AdPlacement, type HouseAd } from './config';

/** The house ads that have an address, in order. */
export const availableHouseAds = (ads: readonly HouseAd[] = HOUSE_ADS): HouseAd[] => ads.filter((ad) => ad.url.trim() !== '');

/**
 * The house ad for a slot. The footer shows the second app, so the two slots never repeat the same one:
 * when only one app has an address, the footer stays empty.
 */
export function houseAdFor(placement: AdPlacement, ads: readonly HouseAd[] = HOUSE_ADS): HouseAd | null {
  const available = availableHouseAds(ads);
  if (placement === 'footer') return available[1] ?? null;
  return available[0] ?? null;
}
