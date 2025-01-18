import { useState } from 'react';
import { supabase } from '../lib/supabase';

type WaitlistType = 'chrome_extension' | 'country';

export function useWaitlist() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addToWaitlist = async (email: string, type: WaitlistType, countryCode?: string) => {
    try {
      setLoading(true);
      setError(null);

      const { error: submitError } = await supabase
        .from('waitlist')
        .insert({
          email,
          type,
          country_code: countryCode
        });

      if (submitError) {
        console.error('Waitlist error:', submitError);
        throw submitError;
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to join waitlist';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    addToWaitlist
  };
}