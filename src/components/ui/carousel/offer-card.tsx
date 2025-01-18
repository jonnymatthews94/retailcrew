import { Link } from 'react-router-dom';
import type { Brand } from '../../../types/brand';
import { LazyImage } from '../lazy-image';

interface OfferCardProps {
  brand: Brand;
}

export function OfferCard({ brand }: OfferCardProps) {
  return (
    <Link
      to={`/brands/${brand.id}`}
      className="flex-none w-[300px] group rounded-lg border p-6 hover:bg-primary-50 transition-colors"
    >
      <LazyImage
        src={brand.logo}
        alt={brand.name}
        className="h-16 w-16 rounded-lg object-contain bg-white"
        loadingClassName="animate-pulse"
      />
      <h3 className="mt-4 font-semibold text-gray-900">{brand.name}</h3>
      <p className="mt-1 text-sm text-gray-500">{brand.category}</p>
      {brand.offers[0] && (
        <p className="mt-2 text-primary-600">{brand.offers[0].discountValue}</p>
      )}
    </Link>
  );
}