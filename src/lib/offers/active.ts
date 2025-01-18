import { supabase } from '../supabase';
import type { Offer } from '../../types/brand';

export function isOfferActive(offer: Offer): boolean {
  const now = new Date();
  const start = new Date(offer.startDate);
  const end = new Date(offer.expiryDate);
  return now >= start && now <= end;
}

export async function getActiveOffers(brandId?: string) {
  const now = new Date().toISOString();
  
  let query = supabase
    .from('offers')
    .select('*')
    .eq('status', 'approved')
    .lte('start_date', now)
    .gte('expiry_date', now);

  if (brandId) {
    query = query.eq('brand_id', brandId);
  }

  const { data, error } = await query;
  if (error) throw error;

  return data?.map(transformOffer) || [];
}

function transformOffer(offer: any): Offer {
  return {
    id: offer.id,
    title: offer.title,
    description: offer.description || '',
    code: offer.code,
    discountValue: offer.discount_value,
    startDate: offer.start_date,
    expiryDate: offer.expiry_date,
    terms: offer.terms || [],
    uniquePerUser: offer.unique_per_user
  };
}