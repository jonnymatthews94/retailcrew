import type { Offer } from '../../../types/brand';

interface OfferDetailsProps {
  offer: Offer;
}

export function OfferDetails({ offer }: OfferDetailsProps) {
  return (
    <>
      <h3 className="text-lg font-semibold text-gray-900">{offer.title}</h3>
      <p className="mt-2 text-gray-600">{offer.description}</p>
    </>
  );
}