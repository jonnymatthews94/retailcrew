import { useEventTracking } from '../use-analytics';

export function useVerificationTracking() {
  const { trackEvent } = useEventTracking();

  const trackVerificationStart = () => {
    trackEvent('verification_start', {
      timestamp: new Date().toISOString()
    });
  };

  const trackVerificationComplete = (success: boolean, reason?: string) => {
    trackEvent('verification_complete', {
      success,
      reason,
      timestamp: new Date().toISOString()
    });
  };

  return {
    trackVerificationStart,
    trackVerificationComplete
  };
}