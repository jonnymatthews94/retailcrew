import { Link } from 'react-router-dom';
import { LazyImage } from '../lazy-image';
import type { Brand } from '../../../types/brand';

interface SearchResultsProps {
  results: Brand[];
  loading: boolean;
  onClose: () => void;
}

export function SearchResults({ results, loading, onClose }: SearchResultsProps) {
  if (loading) {
    return (
      <div className="text-center text-gray-500">Searching...</div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="text-center text-gray-500">
        No results found
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4">
      {results.map((brand) => (
        <Link
          key={brand.id}
          to={`/brands/${brand.id}`}
          onClick={onClose}
          className="flex items-center gap-4 rounded-lg border p-4 hover:bg-primary-50 transition-colors"
        >
          <LazyImage
            src={brand.logo}
            alt={brand.name}
            className="h-12 w-12 rounded-lg object-contain bg-white p-1"
          />
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-gray-900 truncate">{brand.name}</h3>
            <p className="text-sm text-gray-500 truncate">{brand.category}</p>
            {brand.offers[0] && (
              <p className="text-sm text-primary-600 mt-1">
                {brand.offers[0].discountValue}
              </p>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
}