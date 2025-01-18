import { supabase } from '../supabase';

// Helper to build search conditions
export function buildSearchFilter(searchTerm: string) {
  return `or=(name.ilike.${searchTerm},description.ilike.${searchTerm},offers.title.ilike.${searchTerm},offers.description.ilike.${searchTerm})`;
}

// Base query builder with common filters
export function baseQuery() {
  return supabase
    .from('brands')
    .select(`
      *,
      category:categories(name),
      offers(*)
    `)
    .eq('status', 'approved')
    .eq('offers.status', 'approved');
}