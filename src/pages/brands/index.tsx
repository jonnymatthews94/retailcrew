import { BrandCard, BrandCardSkeleton } from '../../components/brands/brand-card';
import { ListBrandCard } from '../../components/brands/promo-cards/list-brand-card';
import { ChromeExtensionCard } from '../../components/brands/promo-cards/chrome-extension-card';
import { MetaTags } from '../../components/seo/meta-tags';
import { useState } from 'react';
import { Search } from 'lucide-react';
import { Pagination } from '../../components/ui/pagination/pagination';
import { usePagination } from '../../hooks/use-pagination';
import { useBrands } from '../../hooks/use-brands';
import { useBrandSearch } from '../../hooks/use-brand-search';

const ITEMS_PER_PAGE = 12;

export function BrandsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'latest' | 'popular'>('latest');
  const { brands, loading } = useBrands();
  const { results: searchResults, loading: searchLoading } = useBrandSearch(searchQuery);

  // Use search results if there's a query, otherwise use all brands
  const filteredBrands = searchQuery ? searchResults : brands;

  // Sort brands
  const sortedBrands = [...filteredBrands].sort((a, b) => {
    if (sortBy === 'popular') {
      const aValue = parseInt(a.offers[0]?.discountValue ?? '0');
      const bValue = parseInt(b.offers[0]?.discountValue ?? '0');
      return bValue - aValue;
    }
    // Latest by default
    return b.id.localeCompare(a.id);
  });

  const {
    currentPage,
    totalPages,
    currentItems,
    setCurrentPage
  } = usePagination({
    items: sortedBrands,
    itemsPerPage: ITEMS_PER_PAGE
  });

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold">All Offers</h1>
            <p className="mt-2 text-gray-600">Loading offers...</p>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <BrandCardSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <MetaTags 
        title="All Offers"
        description="Browse exclusive discounts from hundreds of brands for retail professionals. Find the best deals on fashion, tech, beauty, and more."
      />
      
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold">All Offers</h1>
          <p className="mt-2 text-gray-600">
            {filteredBrands.length} exclusive discounts for retail professionals
          </p>
        </div>

        <div className="flex gap-4">
          <div className="relative flex-1 sm:w-64 sm:flex-none">
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search offers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-gray-300 pl-10 pr-4 py-2 focus:border-primary-600 focus:outline-none focus:ring-1 focus:ring-primary-600"
            />
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'latest' | 'popular')}
            className="rounded-lg border border-gray-300 px-4 py-2 focus:border-primary-600 focus:outline-none focus:ring-1 focus:ring-primary-600"
          >
            <option value="latest">Latest</option>
            <option value="popular">Most Popular</option>
          </select>
        </div>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {searchLoading ? (
          [...Array(6)].map((_, i) => (
            <BrandCardSkeleton key={i} />
          ))
        ) : currentItems.length > 0 ? (
          currentItems.map((brand) => (
            <BrandCard key={brand.id} brand={brand} />
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500 py-12">
            No offers found
          </div>
        )}
      </div>

      {totalPages > 1 && (
        <div className="mt-12">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      )}
    </div>
  );
}