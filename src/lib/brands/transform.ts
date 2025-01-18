import type { Brand } from '../../types/brand';

export function transformBrandData(data: any): Brand {
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

export function transformBrandsData(data: any[]): Brand[] {
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