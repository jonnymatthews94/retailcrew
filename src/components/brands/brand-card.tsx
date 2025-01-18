import { Link } from 'react-router-dom';
import type { Brand } from '../../types/brand';
import { LazyImage } from '../ui/lazy-image';

interface BrandCardProps {
  brand: Brand;
  featured?: boolean;
}

export function BrandCard({ brand, featured }: BrandCardProps) {
  const mainOffer = brand.offers[0];

  return (
    <Link
      to={`/brands/${brand.id}`}
      className={`group rounded-lg border p-6 transition-colors hover:bg-primary-50 ${
        featured ? 'bg-primary-50' : ''
      }`}
    >
      <LazyImage
        src={brand.logo}
        alt={brand.name}
        className="h-16 w-16 rounded-lg object-cover"
        loadingClassName="animate-pulse"
      />
      <h3 className="mt-4 font-semibold text-gray-900">{brand.name}</h3>
      <p className="mt-1 text-sm text-gray-500">{brand.category}</p>
      {mainOffer && (
        <p className="mt-2 text-primary-600">{mainOffer.discountValue}</p>
      )}
    </Link>
  );
}

export function BrandCardSkeleton() {
  return (
    <div className="rounded-lg border p-6">
      <div className="h-16 w-16 animate-pulse rounded-lg bg-gray-200" />
      <div className="mt-4 h-6 w-2/3 animate-pulse rounded bg-gray-200" />
      <div className="mt-1 h-4 w-1/2 animate-pulse rounded bg-gray-200" />
      <div className="mt-2 h-5 w-1/3 animate-pulse rounded bg-gray-200" />
    </div>
  );
}