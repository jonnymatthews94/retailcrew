import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { normalizeWebsite } from '../lib/companies';
import { validateCompanyData } from '../lib/validation/company';
import { debugLog } from '../components/debug/logger';

export function useCompanyCreation() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createCompany = async (data: {
    name: string;
    website: string;
    type: string;
  }) => {
    try {
      setLoading(true);
      setError(null);

      // Validate data
      const errors = validateCompanyData(data);
      if (Object.keys(errors).length > 0) {
        throw new Error(Object.values(errors)[0]);
      }

      debugLog('info', 'Creating company', { 
        name: data.name,
        type: data.type 
      });

      // Normalize website before insert
      const website = normalizeWebsite(data.website);

      // Check if company exists first
      const { data: existing } = await supabase
        .from('companies')
        .select('id')
        .eq('website', website)
        .maybeSingle();

      if (existing) {
        return existing;
      }

      // Create new company
      const { data: company, error: createError } = await supabase
        .from('companies')
        .insert({
          name: data.name,
          website,
          type: data.type
        })
        .select()
        .single();

      if (createError) throw createError;

      debugLog('success', 'Company created successfully', { id: company.id });
      return company;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to create company';
      setError(message);
      debugLog('error', 'Company creation failed', { error: message });
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    createCompany,
    loading,
    error
  };
}