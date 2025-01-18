import { useState, useEffect } from 'react';
import { getBrands } from '../lib/brands';
import type { Brand } from '../types/brand';
import { debugLog } from '../components/debug/logger';

export function useBrands(categoryId?: string) {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchBrands() {
      try {
        debugLog('info', 'Fetching brands', { categoryId });
        const data = await getBrands(categoryId);
        setBrands(data);
        debugLog('success', 'Brands fetched successfully', { count: data.length });
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to fetch brands';
        setError(message);
        debugLog('error', 'Failed to fetch brands', { error: message });
      } finally {
        setLoading(false);
      }
    }

    fetchBrands();
  }, [categoryId]);

  return {
    brands,
    loading,
    error
  };
}