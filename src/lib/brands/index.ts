import { baseQuery, buildSearchFilter } from '../supabase/queries';
import { transformBrandData, transformBrandsData } from './transform';
import type { Brand } from '../../types/brand';

export async function searchBrands(query: string): Promise<Brand[]> {
  if (!query.trim()) {
    return [];
  }

  const searchTerm = `%${query.trim().toLowerCase()}%`;
  
  const { data, error } = await baseQuery()
    .or(buildSearchFilter(searchTerm));

  if (error) {
    console.error('Search error:', error);
    return [];
  }

  return transformBrandsData(data || []);
}

// Rest of the file remains unchanged...