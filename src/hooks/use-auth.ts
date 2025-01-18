import { useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import { debugLog } from '../components/debug/logger';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string) => {
    try {
      debugLog('info', 'Starting signup process', { email });
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });
      
      if (error) {
        debugLog('error', 'Signup failed', { error: error.message });
        throw error;
      }
      
      debugLog('success', 'Signup successful', { userId: data.user?.id });
      return data;
    } catch (error) {
      debugLog('error', 'Signup error', { error });
      throw error;
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      debugLog('info', 'Starting signin process', { email });
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        debugLog('error', 'Signin failed', { error: error.message });
        throw error;
      }
      
      debugLog('success', 'Signin successful', { userId: data.user?.id });
      return data;
    } catch (error) {
      debugLog('error', 'Signin error', { error });
      throw error;
    }
  };

  const signOut = async () => {
    try {
      debugLog('info', 'Starting signout process');
      
      const { error } = await supabase.auth.signOut();
      if (error) {
        debugLog('error', 'Signout failed', { error: error.message });
        throw error;
      }
      
      debugLog('success', 'Signout successful');
    } catch (error) {
      debugLog('error', 'Signout error', { error });
      throw error;
    }
  };

  return {
    user,
    loading,
    signUp,
    signIn,
    signOut,
  };
}