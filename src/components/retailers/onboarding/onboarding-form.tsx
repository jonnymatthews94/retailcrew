import { useState } from 'react';
import { BrandSelection } from './steps/brand-selection';
import { BrandInfoStep } from './steps/brand-info';
import { OfferDetailsStep } from './steps/offer-details';
import { AffiliateStep } from './steps/affiliate';
import { EmployeeDiscountStep } from './steps/employee-discount';
import { SuccessState } from './success-state';
import { useRetailerOnboarding } from '../../../hooks/use-retailer-onboarding';
import { useRetailerValidation } from '../../../hooks/use-retailer-validation';
import type { RetailerOnboardingData } from '../../../types/retailer';

const INITIAL_DATA: RetailerOnboardingData = {
  brandName: '',
  brandLogo: '',
  brandWebsite: '',
  offerTitle: '',
  offerDescription: '',
  discountValue: '',
  discountCode: '',
  isUniqueCode: true,
  uniqueCodes: [],
  expiryDate: '',
  terms: [],
  useAffiliateLinks: false,
  affiliateNetwork: '',
  quote: '',
  joinEmployeeDiscountBeta: false,
};

export function OnboardingForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<RetailerOnboardingData>(INITIAL_DATA);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const { submitOffer, loading, error } = useRetailerOnboarding();
  const { validateStep1, validateStep2, validateStep3 } = useRetailerValidation();

  const updateFields = (fields: Partial<RetailerOnboardingData>) => {
    setFormData(prev => ({ ...prev, ...fields }));
  };

  const next = () => {
    let errors = {};
    
    // Validate current step
    switch (currentStep) {
      case 1:
        errors = validateStep1(formData);
        break;
      case 2:
        errors = validateStep2(formData);
        break;
      case 3:
        errors = validateStep3(formData);
        break;
    }

    setValidationErrors(errors);
    if (Object.keys(errors).length === 0) {
      setCurrentStep(c => Math.min(c + 1, 4));
    }
  };

  const back = () => {
    setCurrentStep(c => Math.max(c - 1, 0));
  };

  const handleSubmit = async () => {
    try {
      await submitOffer(formData);
      setCurrentStep(5); // Show success state
    } catch (err) {
      // Error handling is done in the hook
    }
  };

  const steps = [
    <BrandSelection 
      onSelectBrand={(brand) => {
        if (brand) {
          updateFields({
            brandName: brand.name,
            brandLogo: brand.logo,
            brandWebsite: brand.website
          });
          setCurrentStep(2); // Skip brand info step
        }
      }}
      onCreateNew={() => setCurrentStep(1)}
    />,
    <BrandInfoStep {...formData} updateFields={updateFields} errors={validationErrors} />,
    <OfferDetailsStep {...formData} updateFields={updateFields} errors={validationErrors} />,
    <AffiliateStep {...formData} updateFields={updateFields} errors={validationErrors} />,
    <EmployeeDiscountStep {...formData} updateFields={updateFields} />
  ];

  if (currentStep === 5) {
    return <SuccessState />;
  }

  return (
    <div className="mx-auto max-w-2xl">
      <div className="text-center">
        <h1 className="text-2xl font-bold">List your offer</h1>
        <p className="mt-2 text-sm text-gray-600">
          Get your exclusive discount in front of thousands of retail professionals
        </p>
        
        <div className="mt-8 flex items-center justify-center gap-2">
          {[1, 2, 3, 4].map((step) => (
            <div
              key={step}
              className={`h-2 w-2 rounded-full ${
                step <= currentStep ? 'bg-primary-600' : 'bg-gray-200'
              }`}
            />
          ))}
        </div>
      </div>

      <div className="mt-8">
        {error && (
          <div className="mb-6 rounded-lg bg-red-50 p-4 text-sm text-red-600">
            {error}
          </div>
        )}

        {steps[currentStep]}

        <div className="mt-8 flex gap-4">
          {currentStep > 0 && (
            <button
              type="button"
              onClick={back}
              className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50"
            >
              Back
            </button>
          )}
          <button
            type="button"
            onClick={currentStep === steps.length - 1 ? handleSubmit : next}
            disabled={loading}
            className="flex-1 rounded-lg bg-primary-600 px-4 py-2 text-white hover:bg-primary-700 disabled:opacity-50"
          >
            {currentStep === steps.length - 1 ? 'Submit offer' : 'Continue'}
          </button>
        </div>
      </div>
    </div>
  );
}