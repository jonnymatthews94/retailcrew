import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import type { Brand } from '../../types/brand';
import { useBrands } from '../../hooks/use-brands';
import { LazyImage } from '../ui/lazy-image';

interface SimilarBrandsProps {
  currentBrand: Brand;
  maxBrands?: number;
}

export function SimilarBrands({ currentBrand, maxBrands = 3 }: SimilarBrandsProps) {
  const { brands, loading } = useBrands();

  if (loading) {
    return (
      <div className="mt-12 rounded-lg border p-6">
        <h2 className="text-lg font-semibold">Similar brands on RetailCrew</h2>
        <div className="mt-6 space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="animate-pulse flex items-center gap-4 rounded-lg border p-4">
              <div className="h-12 w-12 rounded-lg bg-gray-200" />
              <div className="flex-1">
                <div className="h-4 w-24 bg-gray-200 rounded" />
                <div className="mt-1 h-3 w-16 bg-gray-200 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const similarBrands = brands
    .filter(brand => 
      brand.id !== currentBrand.id && 
      brand.category === currentBrand.category
    )
    .slice(0, maxBrands);

  if (similarBrands.length === 0) return null;

  return (
    <div className="mt-12 rounded-lg border p-6">
      <h2 className="text-lg font-semibold">Similar brands on RetailCrew</h2>
      <p className="mt-2 text-sm text-gray-600">
        Check out these similar {currentBrand.category.toLowerCase()} brands offering exclusive discounts
      </p>

      <div className="mt-6 space-y-4">
        {similarBrands.map((brand) => (
          <Link
            key={brand.id}
            to={`/brands/${brand.id}`}
            className="flex items-center gap-4 rounded-lg border p-4 hover:bg-primary-50 transition-colors"
          >
            <LazyImage
              src={brand.logo}
              alt={brand.name}
              className="h-12 w-12 rounded-lg object-contain bg-white p-1"
              loadingClassName="animate-pulse"
            />
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-gray-900 truncate">{brand.name}</h3>
              {brand.offers[0] && (
                <p className="mt-1 text-sm text-primary-600 truncate">
                  {brand.offers[0].discountValue}
                </p>
              )}
            </div>
            <ArrowRight className="h-5 w-5 text-gray-400" />
          </Link>
        ))}
      </div>
    </div>
  );
}