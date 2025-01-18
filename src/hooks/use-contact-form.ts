import { useState } from 'react';
import { supabase } from '../lib/supabase';

export function useContactForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitMessage = async (email: string, message: string) => {
    try {
      setLoading(true);
      setError(null);

      const { error: submitError } = await supabase
        .from('contact_messages')
        .insert({ email, message });

      if (submitError) throw submitError;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send message');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    submitMessage
  };
}