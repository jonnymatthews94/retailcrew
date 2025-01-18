import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { Company } from '../types/company';
import { debugLog } from '../components/debug/logger';

export function useCompanies(search?: string) {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCompanies() {
      try {
        setLoading(true);
        debugLog('info', 'Fetching companies', { search });
        
        let query = supabase
          .from('companies')
          .select('*');

        if (search) {
          const searchTerm = `%${search.toLowerCase()}%`;
          query = query.or(`name.ilike.${searchTerm},website.ilike.${searchTerm}`);
        }

        const { data, error: fetchError } = await query;

        if (fetchError) throw fetchError;
        setCompanies(data || []);
        
        debugLog('success', 'Companies fetched successfully', { count: data?.length });
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to fetch companies';
        setError(message);
        debugLog('error', 'Failed to fetch companies', { error: message });
      } finally {
        setLoading(false);
      }
    }

    // Only fetch if search is 3+ characters or empty
    if (!search || search.length >= 3) {
      fetchCompanies();
    }
  }, [search]);

  return {
    companies,
    loading,
    error
  };
}