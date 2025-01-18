import { MetaTags } from '../components/seo/meta-tags';
import { HeroSection } from '../components/home/hero-section';
import { CategorySection } from '../components/home/category-section';
import { CTASection } from '../components/home/cta-section';
import { FeaturedOffers } from '../components/home/featured-offers';

export function HomePage() {
  return (
    <div>
      <MetaTags
        title="RetailCrew - Exclusive Discounts for Ecommerce Professionals"
        description="Access exclusive discounts at hundreds of brands for people working in the ecommerce industry. Free to join for all retail professionals."
      />

      <HeroSection />
      <FeaturedOffers />
      <CategorySection />
      <CTASection />
    </div>
  );
}