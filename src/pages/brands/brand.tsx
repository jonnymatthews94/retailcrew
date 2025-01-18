import { useParams } from 'react-router-dom';
import { Building2, Globe, Loader2 } from 'lucide-react';
import { OfferCard } from '../../components/brands/offer-card';
import { SimilarBrands } from '../../components/brands/similar-brands';
import { MetaTags } from '../../components/seo/meta-tags';
import { EmptyState } from '../../components/ui/empty-state';
import { useUser } from '../../contexts/user-context';
import { useBrand } from '../../hooks/use-brand';

export function BrandPage() {
  const { brandId } = useParams<{ brandId: string }>();
  const { brand, loading, error } = useBrand(brandId || '');
  const { user } = useUser();

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 flex justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
      </div>
    );
  }

  if (error || !brand) {
    return (
      <div className="container mx-auto px-4 py-12">
        <EmptyState
          icon={Building2}
          title="Brand not found"
          description="The brand you're looking for doesn't exist or has been removed. Browse our other partner brands for exclusive discounts."
          action={{
            label: "Browse all brands",
            href: "/brands"
          }}
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <MetaTags
        title={`${brand.name} Discount Codes`}
        description={`Get exclusive ${brand.name} discount codes for retail professionals. ${brand.offers[0]?.discountValue} off and more special offers.`}
        brandName={brand.name}
        discountValue={brand.offers[0]?.discountValue}
      />

      {/* Brand Header */}
      <div className="mb-12">
        <div className="flex items-center gap-6">
          <img
            src={brand.logo}
            alt={brand.name}
            className="h-24 w-24 rounded-lg object-contain bg-white p-2 border"
          />
          <div>
            <h1 className="text-3xl font-bold">{brand.name} Discount Codes</h1>
            <p className="mt-2 text-gray-600">
              Exclusive {brand.name} discount codes for retail and e-commerce professionals
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {brand.offers.length > 0 ? (
            <div className="space-y-6">
              {brand.offers.map((offer) => (
                <OfferCard
                  key={offer.id}
                  offer={offer}
                  brandWebsite={brand.website}
                />
              ))}
            </div>
          ) : (
            <EmptyState
              icon={Building2}
              title="No active offers"
              description={`${brand.name} doesn't have any active offers at the moment. Check back soon for exclusive discounts.`}
              action={{
                label: "Browse other brands",
                href: "/brands"
              }}
            />
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          <div className="rounded-lg border p-6">
            <h2 className="text-lg font-semibold">About {brand.name}</h2>
            <p className="mt-4 text-gray-600">{brand.description}</p>
            
            <div className="mt-6">
              <h3 className="font-medium">Category</h3>
              <p className="mt-1 text-gray-600">{brand.category}</p>
            </div>

            <div className="mt-6">
              <h3 className="font-medium">Website</h3>
              <a
                href={brand.website}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 inline-flex items-center gap-2 text-primary-600 hover:text-primary-700"
              >
                <Globe className="h-4 w-4" />
                {new URL(brand.website).hostname}
              </a>
            </div>
          </div>

          <SimilarBrands currentBrand={brand} />
        </div>
      </div>
    </div>
  );
}