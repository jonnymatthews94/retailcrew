import { supabase } from '../supabase';
import { transformBrandsData } from './transform';
import type { Brand } from '../../types/brand';

export async function searchBrands(query: string): Promise<Brand[]> {
  if (!query.trim()) {
    return [];
  }

  try {
    const searchTerm = `%${query.trim().toLowerCase()}%`;
    
    const { data, error } = await supabase
      .from('brands')
      .select(`
        *,
        category:categories(name),
        offers(*)
      `)
      .eq('status', 'approved')
      .eq('offers.status', 'approved')
      .or(`name.ilike.${searchTerm},description.ilike.${searchTerm}`);

    if (error) throw error;
    return transformBrandsData(data || []);
  } catch (err) {
    console.error('Search failed:', err);
    return [];
  }
}