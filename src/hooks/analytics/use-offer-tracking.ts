import { useEventTracking } from '../use-analytics';
import type { Offer } from '../../types/brand';

export function useOfferTracking() {
  const { trackEvent } = useEventTracking();

  const trackOfferView = (offerId: string, brandName: string) => {
    trackEvent('offer_view', { offerId, brandName });
  };

  const trackOfferCopy = (offer: Offer, brandName: string) => {
    trackEvent('offer_copy', {
      offerId: offer.id,
      brandName,
      discountValue: offer.discountValue,
      uniqueCode: offer.uniquePerUser
    });
  };

  return {
    trackOfferView,
    trackOfferCopy
  };
}