import { useEventTracking } from '../use-analytics';

export function useJoinFlowTracking() {
  const { trackEvent } = useEventTracking();

  const trackStepComplete = (step: number, data: Record<string, any>) => {
    trackEvent('join_step_complete', {
      step,
      ...data
    });
  };

  const trackJoinComplete = (data: {
    companyType: string;
    hasVerification: boolean;
  }) => {
    trackEvent('join_complete', data);
  };

  return {
    trackStepComplete,
    trackJoinComplete
  };
}