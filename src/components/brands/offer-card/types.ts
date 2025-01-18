import type { Offer } from '../../../types/brand';

export interface OfferCardProps {
  offer: Offer;
  brandWebsite: string;
}

export interface OfferCodeState {
  isLoading: boolean;
  currentCode: string;
  showDialog: boolean;
}