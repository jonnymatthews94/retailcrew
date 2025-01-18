import { useEventTracking } from '../use-analytics';
import type { SignupFormData } from '../../types/auth';

export function useSignupTracking() {
  const { trackEvent } = useEventTracking();

  const trackSignupStart = (companyType: string) => {
    trackEvent('signup_start', { companyType });
  };

  const trackSignupComplete = (data: SignupFormData) => {
    trackEvent('signup_complete', {
      companyType: data.companyType,
      hasPhone: !!data.phone,
      hasCompanyWebsite: !!data.companyWebsite,
      marketingConsent: data.marketingConsent
    });
  };

  return {
    trackSignupStart,
    trackSignupComplete
  };
}