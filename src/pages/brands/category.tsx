import { useParams } from 'react-router-dom';
import { BrandCard, BrandCardSkeleton } from '../../components/brands/brand-card';
import { ListBrandCard } from '../../components/brands/promo-cards/list-brand-card';
import { ChromeExtensionCard } from '../../components/brands/promo-cards/chrome-extension-card';
import { MetaTags } from '../../components/seo/meta-tags';
import { useInfiniteScroll } from '../../hooks/use-infinite-scroll';
import { PullToRefresh } from '../../components/ui/pull-to-refresh';
import { useCategories } from '../../hooks/use-categories';
import { useBrands } from '../../hooks/use-brands';
import { Loader2, Building2 } from 'lucide-react';
import { useMemo } from 'react';
import { getIconComponent } from '../../lib/icons';
import { EmptyState } from '../../components/ui/empty-state';

export function CategoryPage() {
  const { category } = useParams<{ category: string }>();
  const { categories, loading: categoriesLoading } = useCategories();
  const { brands, loading: brandsLoading } = useBrands();

  const categoryInfo = useMemo(() => {
    return categories.find(
      c => c.name.toLowerCase() === category?.toLowerCase()
    );
  }, [categories, category]);

  const categoryBrands = useMemo(() => {
    return brands.filter(
      brand => brand.category.toLowerCase() === category?.toLowerCase()
    );
  }, [brands, category]);

  const handleRefresh = async () => {
    window.location.reload();
  };

  // Show loading state while data is being fetched
  if (categoriesLoading || brandsLoading) {
    return (
      <div className="container mx-auto px-4 py-12 flex justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
      </div>
    );
  }

  // Show not found state if category doesn't exist
  if (!categoryInfo) {
    return (
      <div className="container mx-auto px-4 py-12">
        <EmptyState
          icon={Building2}
          title="Category not found"
          description="The category you're looking for doesn't exist. Check out our other categories for exclusive discounts."
          action={{
            label: "View all categories",
            href: "/brands"
          }}
        />
      </div>
    );
  }

  const Icon = getIconComponent(categoryInfo.icon);

  return (
    <PullToRefresh onRefresh={handleRefresh}>
      <div className="bg-gradient-to-b from-primary-50 to-white">
        <div className="container mx-auto px-4 py-12">
          <MetaTags 
            title={`${categoryInfo.name} Discounts`}
            description={categoryInfo.description || `Exclusive ${categoryInfo.name.toLowerCase()} discounts for retail professionals`}
          />
          
          <div className="mx-auto max-w-2xl text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-xl bg-primary-100">
              <Icon className="h-8 w-8 text-primary-600" />
            </div>
            <h1 className="text-3xl font-bold">{categoryInfo.name} Offers</h1>
            <p className="mt-4 text-lg text-gray-600">
              {categoryInfo.description || `Exclusive ${categoryInfo.name.toLowerCase()} discounts for retail professionals`}
            </p>
            <div className="mt-4 text-sm text-primary-600">
              {categoryBrands.length} offers available
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {categoryBrands.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {categoryBrands.map((brand) => (
              <BrandCard key={brand.id} brand={brand} />
            ))}
            {categoryBrands.length >= 8 && (
              <>
                <ListBrandCard />
                <ChromeExtensionCard />
              </>
            )}
          </div>
        ) : (
          <EmptyState
            icon={Icon}
            title={`No ${categoryInfo.name} offers yet`}
            description="We're working on adding exclusive discounts in this category. Check back soon or browse other categories."
            action={{
              label: "Browse all offers",
              href: "/brands"
            }}
          />
        )}
      </div>
    </PullToRefresh>
  );
}