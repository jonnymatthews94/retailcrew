import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { BrandManager } from '../types/company';
import { debugLog } from '../components/debug/logger';

export function useBrandManagement(userId?: string) {
  const [managedBrands, setManagedBrands] = useState<BrandManager[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) return;

    async function fetchManagedBrands() {
      try {
        debugLog('info', 'Fetching managed brands', { userId });
        
        const { data, error: fetchError } = await supabase
          .from('brand_managers')
          .select(`
            *,
            brands (*)
          `)
          .eq('user_id', userId)
          .order('created_at', { ascending: false });

        if (fetchError) throw fetchError;
        setManagedBrands(data || []);
        
        debugLog('success', 'Managed brands fetched successfully', { count: data?.length });
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to fetch managed brands';
        setError(message);
        debugLog('error', 'Failed to fetch managed brands', { error: message });
      } finally {
        setLoading(false);
      }
    }

    fetchManagedBrands();
  }, [userId]);

  const requestAccess = async (brandId: string) => {
    try {
      debugLog('info', 'Requesting brand access', { brandId });
      
      const { data, error: requestError } = await supabase
        .from('brand_managers')
        .insert({
          brand_id: brandId,
          user_id: userId,
          status: 'pending'
        })
        .select()
        .single();

      if (requestError) throw requestError;
      
      setManagedBrands(prev => [...prev, data]);
      debugLog('success', 'Access request submitted successfully');
      
      return data;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to request access';
      debugLog('error', 'Failed to request access', { error: message });
      throw err;
    }
  };

  return {
    managedBrands,
    loading,
    error,
    requestAccess
  };
}