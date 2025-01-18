import { OnboardingForm } from '../../components/retailers/onboarding/onboarding-form';
import { MetaTags } from '../../components/seo/meta-tags';

export function RetailerOnboardingPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <MetaTags
        title="List Your Offer"
        description="Submit your exclusive discount to RetailCrew's marketplace for retail professionals."
      />
      <OnboardingForm />
    </div>
  );
}