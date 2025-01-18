export interface Brand {
  id: string;
  name: string;
  logo: string;
  category: string;
  description: string;
  website: string;
  offers: Offer[];
}

export interface Offer {
  id: string;
  title: string;
  description: string;
  code: string;
  discountValue: string;
  startDate: string;
  expiryDate: string;
  terms: string[];
  uniquePerUser?: boolean;
}