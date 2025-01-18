import { useEventTracking } from '../use-analytics';
import type { RetailerOnboardingData } from '../../types/retailer';

export function useListBrandTracking() {
  const { trackEvent } = useEventTracking();

  const trackStepComplete = (step: number, data: Partial<RetailerOnboardingData>) => {
    trackEvent('list_brand_step_complete', {
      step,
      hasLogo: !!data.brandLogo,
      isUniqueCode: data.isUniqueCode,
      hasAffiliateLinks: data.useAffiliateLinks,
      joinedBeta: data.joinEmployeeDiscountBeta
    });
  };

  const trackSubmission = (data: RetailerOnboardingData) => {
    trackEvent('list_brand_submit', {
      category: data.brandName,
      hasUniqueCode: data.isUniqueCode,
      hasAffiliateLinks: data.useAffiliateLinks,
      joinedBeta: data.joinEmployeeDiscountBeta
    });
  };

  return {
    trackStepComplete,
    trackSubmission
  };
}