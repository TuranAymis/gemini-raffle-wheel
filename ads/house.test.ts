import { describe, expect, it } from 'vitest';
import { availableHouseAds, houseAdFor } from './house';
import type { HouseAd } from './config';

const devtoolbox: HouseAd = { id: 'devtoolbox', url: 'https://dev-toolbox.site/' };
const vento: HouseAd = { id: 'vento', url: 'https://example.test/vento' };
const noVento: HouseAd = { id: 'vento', url: '' };

describe('house ads', () => {
  it('leave out an ad that has no address yet', () => {
    expect(availableHouseAds([devtoolbox, noVento]).map((ad) => ad.id)).toEqual(['devtoolbox']);
  });

  it('give the sidebar the first app and the footer the second one', () => {
    expect(houseAdFor('sidebar', [devtoolbox, vento])?.id).toBe('devtoolbox');
    expect(houseAdFor('footer', [devtoolbox, vento])?.id).toBe('vento');
  });

  it('leave the footer empty when only one app is available, so the same app is not shown twice', () => {
    expect(houseAdFor('footer', [devtoolbox, noVento])).toBeNull();
    expect(houseAdFor('sidebar', [devtoolbox, noVento])?.id).toBe('devtoolbox');
  });

  it('show nothing when no app has an address', () => {
    expect(houseAdFor('sidebar', [noVento])).toBeNull();
  });
});
