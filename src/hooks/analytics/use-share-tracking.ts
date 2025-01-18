import { useEventTracking } from '../use-analytics';
import { supabase } from '../../lib/supabase';

type SharePlatform = 'email' | 'slack' | 'copy';

export function useShareTracking() {
  const { trackEvent } = useEventTracking();

  const trackShare = async (brandId: string, platform: SharePlatform) => {
    try {
      // Track in analytics events
      trackEvent('offer_share', { brandId, platform });

      // Record share click
      await supabase
        .from('share_clicks')
        .insert({
          brand_id: brandId,
          platform
        });
    } catch (err) {
      console.error('Failed to track share:', err);
    }
  };

  return {
    trackShare
  };
}