import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackEvent } from '../lib/analytics';

export function usePageTracking() {
  const location = useLocation();

  useEffect(() => {
    trackEvent('page_view', { 
      path: location.pathname,
      search: location.search
    });
  }, [location]);
}

export function useEventTracking() {
  return {
    trackEvent
  };
}