import { useState, useEffect } from 'react';
import { getCountryCodes } from '../lib/country-codes';
import type { CountryCode } from '../lib/country-codes';
import { debugLog } from '../components/debug/logger';

export function useCountryCodes() {
  const [countryCodes, setCountryCodes] = useState<CountryCode[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCountryCodes() {
      try {
        debugLog('info', 'Fetching country codes');
        const codes = await getCountryCodes();
        setCountryCodes(codes);
        debugLog('success', 'Country codes fetched successfully', { count: codes.length });
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to fetch country codes';
        setError(message);
        debugLog('error', 'Failed to fetch country codes', { error: message });
      } finally {
        setLoading(false);
      }
    }

    fetchCountryCodes();
  }, []);

  return {
    countryCodes,
    loading,
    error
  };
}