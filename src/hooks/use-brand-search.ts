import { useState, useEffect } from 'react';
import { searchBrands } from '../lib/brands/search';
import type { Brand } from '../types/brand';
import { debugLog } from '../components/debug/logger';

export function useBrandSearch(query: string) {
  const [results, setResults] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const searchTimeout = setTimeout(async () => {
      try {
        setLoading(true);
        setError(null);
        debugLog('info', 'Searching brands', { query });
        const brands = await searchBrands(query);
        setResults(brands);
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Search failed';
        setError(message);
        debugLog('error', 'Search failed', { error: message });
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(searchTimeout);
  }, [query]);

  return { results, loading, error };
}