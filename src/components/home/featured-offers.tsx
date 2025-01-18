import { useBrands } from '../../hooks/use-brands';
import { OfferCarousel } from '../ui/carousel/offer-carousel';
import { Loader2 } from 'lucide-react';

export function FeaturedOffers() {
  const { brands, loading } = useBrands();

  if (loading) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4 flex justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
        </div>
      </section>
    );
  }

  // Get latest offers (first 10)
  const latestOffers = [...brands]
    .sort((a, b) => b.id.localeCompare(a.id))
    .slice(0, 10);

  // Get most popular offers (brands with highest discount values)
  const popularOffers = [...brands]
    .sort((a, b) => {
      const aValue = parseInt(a.offers[0]?.discountValue ?? '0');
      const bValue = parseInt(b.offers[0]?.discountValue ?? '0');
      return bValue - aValue;
    })
    .slice(0, 10);

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="space-y-16">
          <OfferCarousel title="Latest offers" brands={latestOffers} />
          <OfferCarousel title="Most popular" brands={popularOffers} />
        </div>
      </div>
    </section>
  );
}