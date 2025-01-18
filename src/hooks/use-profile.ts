import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import type { Profile } from '../types/database';
import { useAuthContext } from '../contexts/auth-context';
import { debugLog } from '../components/debug/logger';

export function useProfile() {
  const { user } = useAuthContext();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      setProfile(null);
      setLoading(false);
      return;
    }

    async function fetchProfile() {
      try {
        debugLog('info', 'Fetching user profile', { userId: user.id });
        
        const { data, error: fetchError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (fetchError) {
          debugLog('error', 'Profile fetch failed', { error: fetchError });
          throw fetchError;
        }

        setProfile(data);
        debugLog('success', 'Profile fetched successfully');
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to fetch profile';
        setError(message);
        debugLog('error', 'Profile error', { error: message });
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, [user]);

  const updateProfile = async (updates: Partial<Profile>) => {
    if (!user) throw new Error('No user logged in');

    try {
      debugLog('info', 'Updating profile', { updates });

      const { error: updateError } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.id);

      if (updateError) throw updateError;

      setProfile(prev => prev ? { ...prev, ...updates } : null);
      debugLog('success', 'Profile updated successfully');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to update profile';
      debugLog('error', 'Profile update failed', { error: message });
      throw err;
    }
  };

  return {
    profile,
    loading,
    error,
    updateProfile,
  };
}