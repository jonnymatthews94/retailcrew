import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import type { Offer } from '../types/brand';
import { debugLog } from '../components/debug/logger';

export function useOffers(brandId?: string) {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchOffers() {
      try {
        debugLog('info', 'Fetching approved offers', { brandId });
        
        let query = supabase
          .from('offers')
          .select('*')
          .eq('status', 'approved');
        
        if (brandId) {
          query = query.eq('brand_id', brandId);
        }

        const { data, error: fetchError } = await query;

        if (fetchError) throw fetchError;

        // Transform data to match Offer type
        const transformedOffers: Offer[] = data?.map(offer => ({
          id: offer.id,
          title: offer.title,
          description: offer.description || '',
          code: offer.code,
          discountValue: offer.discount_value,
          expiryDate: offer.expiry_date,
          terms: offer.terms || [],
          uniquePerUser: offer.unique_per_user
        })) || [];

        setOffers(transformedOffers);
        debugLog('success', 'Offers fetched successfully', { count: transformedOffers.length });
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to fetch offers';
        setError(message);
        debugLog('error', 'Failed to fetch offers', { error: message });
      } finally {
        setLoading(false);
      }
    }

    fetchOffers();
  }, [brandId]);

  return {
    offers,
    loading,
    error
  };
}