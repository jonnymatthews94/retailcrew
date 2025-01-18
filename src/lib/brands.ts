import { supabase } from './supabase';
import type { Brand } from '../types/brand';

export async function getBrands(categoryId?: string): Promise<Brand[]> {
  let query = supabase
    .from('brands')
    .select(`
      *,
      category:categories(name),
      offers(*)
    `)
    .eq('status', 'approved')
    .eq('offers.status', 'approved');

  if (categoryId) {
    query = query.eq('category_id', categoryId);
  }

  const { data, error } = await query;
  if (error) throw error;

  return transformBrandsData(data || []);
}

export async function getBrand(brandId: string): Promise<Brand | null> {
  const { data, error } = await supabase
    .from('brands')
    .select(`
      *,
      category:categories(name),
      offers(*)
    `)
    .eq('id', brandId)
    .eq('status', 'approved')
    .eq('offers.status', 'approved')
    .single();

  if (error) throw error;
  if (!data) return null;

  return transformBrandData(data);
}

export async function searchBrands(query: string): Promise<Brand[]> {
  // Clean and format the search query
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
    .or(`name.ilike.${searchTerm},description.ilike.${searchTerm},offers.title.ilike.${searchTerm},offers.description.ilike.${searchTerm}`);

  if (error) throw error;
  return transformBrandsData(data || []);
}

function transformBrandData(data: any): Brand {
  return {
    id: data.id,
    name: data.name,
    logo: data.logo_url,
    category: data.category.name,
    description: data.description || '',
    website: data.website || '',
    offers: data.offers
      .filter((offer: any) => offer.status === 'approved')
      .map(transformOfferData)
  };
}

function transformBrandsData(data: any[]): Brand[] {
  return data.map(transformBrandData);
}

function transformOfferData(offer: any) {
  return {
    id: offer.id,
    title: offer.title,
    description: offer.description || '',
    code: offer.code,
    discountValue: offer.discount_value,
    expiryDate: offer.expiry_date,
    terms: offer.terms || [],
    uniquePerUser: offer.unique_per_user
  };
}