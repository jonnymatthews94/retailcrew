import { createClient } from '@supabase/supabase-js';
import type { Database } from '../../types/database';

// Validate environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

// Create Supabase client with type safety
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  },
  db: {
    schema: 'public'
  }
});

// Helper to check if user is authenticated
export async function isAuthenticated() {
  const { data: { session } } = await supabase.auth.getSession();
  return !!session;
}

// Helper to check if user is admin
export async function isAdmin() {
  const { data, error } = await supabase.rpc('is_admin');
  if (error) return false;
  return !!data;
}