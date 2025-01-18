import { useEventTracking } from '../use-analytics';

export type WaitlistType = 'chrome_extension' | 'country';

export function useWaitlistTracking() {
  const { trackEvent } = useEventTracking();

  const trackWaitlistJoin = (type: WaitlistType, data: {
    email: string;
    countryCode?: string;
  }) => {
    trackEvent('waitlist_join', {
      type,
      hasCountryCode: !!data.countryCode,
      emailDomain: data.email.split('@')[1]
    });
  };

  return {
    trackWaitlistJoin
  };
}