import { useParams } from 'react-router-dom';
import { Building2, Globe, Loader2 } from 'lucide-react';
import { OfferCard } from '../../../components/brands/offer-card';
import { SimilarBrands } from '../../../components/brands/similar-brands';
import { MetaTags } from '../../../components/seo/meta-tags';
import { EmptyState } from '../../../components/ui/empty-state';
import { useUser } from '../../../contexts/user-context';
import { useBrand } from '../../../hooks/use-brand';

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
          description="The brand you're looking for doesn't exist or has been removed."
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
        description={`Get exclusive ${brand.name} discount codes for retail professionals.`}
        brandName={brand.name}
        discountValue={brand.offers[0]?.discountValue}
      />

      {/* Rest of the component JSX */}
    </div>
  );
}