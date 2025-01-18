import { useState, useEffect } from 'react';
import { getCategories } from '../lib/categories';
import type { Category } from '../types/category';
import { debugLog } from '../components/debug/logger';

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCategories() {
      try {
        debugLog('info', 'Fetching categories');
        const data = await getCategories();
        setCategories(data);
        debugLog('success', 'Categories fetched successfully', { count: data.length });
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to fetch categories';
        setError(message);
        debugLog('error', 'Failed to fetch categories', { error: message });
      } finally {
        setLoading(false);
      }
    }

    fetchCategories();
  }, []);

  return {
    categories,
    loading,
    error
  };
}