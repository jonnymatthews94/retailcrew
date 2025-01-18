import { useState, useEffect } from 'react';
import { getBrand } from '../lib/brands';
import type { Brand } from '../types/brand';
import { debugLog } from '../components/debug/logger';

export function useBrand(brandId: string) {
  const [brand, setBrand] = useState<Brand | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchBrand() {
      try {
        debugLog('info', 'Fetching brand', { brandId });
        const data = await getBrand(brandId);
        setBrand(data);
        debugLog('success', 'Brand fetched successfully');
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to fetch brand';
        setError(message);
        debugLog('error', 'Failed to fetch brand', { error: message });
      } finally {
        setLoading(false);
      }
    }

    fetchBrand();
  }, [brandId]);

  return {
    brand,
    loading,
    error
  };
}