import type { RetailerOnboardingData } from '../types/retailer';

const WEBSITE_PATTERN = /^https?:\/\/.+/;
const CODE_PATTERN = /^[A-Z0-9_-]+$/;

export function useRetailerValidation() {
  const validateStep1 = (data: Partial<RetailerOnboardingData>) => {
    const errors: Record<string, string> = {};

    if (!data.brandName?.trim()) {
      errors.brandName = 'Brand name is required';
    } else if (data.brandName.length < 2) {
      errors.brandName = 'Brand name must be at least 2 characters';
    }

    if (!data.brandWebsite?.trim()) {
      errors.brandWebsite = 'Website URL is required';
    } else if (!WEBSITE_PATTERN.test(data.brandWebsite)) {
      errors.brandWebsite = 'Please enter a valid website URL (e.g., https://example.com)';
    }

    return errors;
  };

  const validateStep2 = (data: Partial<RetailerOnboardingData>) => {
    const errors: Record<string, string> = {};

    if (!data.offerTitle?.trim()) {
      errors.offerTitle = 'Offer title is required';
    } else if (data.offerTitle.length < 5) {
      errors.offerTitle = 'Offer title must be at least 5 characters';
    }

    if (!data.offerDescription?.trim()) {
      errors.offerDescription = 'Offer description is required';
    }

    if (!data.discountValue?.trim()) {
      errors.discountValue = 'Discount value is required';
    }

    if (data.isUniqueCode) {
      if (!data.uniqueCodes?.length) {
        errors.uniqueCodes = 'Please upload discount codes';
      }
    } else {
      if (!data.discountCode?.trim()) {
        errors.discountCode = 'Discount code is required';
      } else if (!CODE_PATTERN.test(data.discountCode)) {
        errors.discountCode = 'Code can only contain uppercase letters, numbers, underscores and hyphens';
      }
    }

    if (!data.expiryDate) {
      errors.expiryDate = 'Expiry date is required';
    } else {
      const expiryDate = new Date(data.expiryDate);
      const today = new Date();
      if (expiryDate <= today) {
        errors.expiryDate = 'Expiry date must be in the future';
      }
    }

    return errors;
  };

  const validateStep3 = (data: Partial<RetailerOnboardingData>) => {
    const errors: Record<string, string> = {};

    if (data.useAffiliateLinks && !data.affiliateNetwork?.trim()) {
      errors.affiliateNetwork = 'Please select your affiliate network';
    }

    return errors;
  };

  return {
    validateStep1,
    validateStep2,
    validateStep3
  };
}