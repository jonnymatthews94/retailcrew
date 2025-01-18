import { useState } from 'react';
import { Search } from 'lucide-react';
import { MetaTags } from '../../../components/seo/meta-tags';
import { BrandCard, BrandCardSkeleton } from '../../../components/brands/brand-card';
import { ListBrandCard } from '../../../components/brands/promo-cards/list-brand-card';
import { ChromeExtensionCard } from '../../../components/brands/promo-cards/chrome-extension-card';
import { Pagination } from '../../../components/ui/pagination/pagination';
import { usePagination } from '../../../hooks/use-pagination';
import { useBrands } from '../../../hooks/use-brands';
import { useBrandSearch } from '../../../hooks/use-brand-search';

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

  return (
    <div className="container mx-auto px-4 py-12">
      <MetaTags 
        title="All Offers"
        description="Browse exclusive discounts from hundreds of brands for retail professionals."
      />
      
      {/* Rest of the component JSX */}
    </div>
  );
}