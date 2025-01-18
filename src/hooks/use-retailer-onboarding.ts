import { useState } from 'react';
import { supabase } from '../lib/supabase';
import type { RetailerOnboardingData } from '../types/retailer';
import { debugLog } from '../components/debug/logger';

// Validation constants
const CODE_PATTERN = /^[A-Z0-9_-]+$/;
const WEBSITE_PATTERN = /^https?:\/\/.+/;

export function useRetailerOnboarding() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateData = (data: RetailerOnboardingData) => {
    if (!data.brandName || data.brandName.length < 2) {
      throw new Error('Brand name must be at least 2 characters');
    }

    if (!WEBSITE_PATTERN.test(data.brandWebsite)) {
      throw new Error('Website must start with http:// or https://');
    }

    if (!data.offerTitle || data.offerTitle.length < 5) {
      throw new Error('Offer title must be at least 5 characters');
    }

    if (!CODE_PATTERN.test(data.discountCode)) {
      throw new Error('Discount code can only contain uppercase letters, numbers, underscores and hyphens');
    }

    if (!data.discountValue) {
      throw new Error('Discount value is required');
    }

    if (!data.expiryDate) {
      throw new Error('Expiry date is required');
    }
  };

  const submitOffer = async (data: RetailerOnboardingData) => {
    try {
      setLoading(true);
      setError(null);

      // Validate data before submission
      validateData(data);

      debugLog('info', 'Starting retailer offer submission', {
        brandName: data.brandName,
        offerType: data.isUniqueCode ? 'unique' : 'single'
      });

      // Format discount code to match requirements
      const formattedCode = data.discountCode.toUpperCase();

      // First create the brand
      const { data: brand, error: brandError } = await supabase
        .from('brands')
        .insert({
          name: data.brandName,
          logo_url: data.brandLogo,
          website: data.brandWebsite,
          category: 'pending',
          description: data.quote || null
        })
        .select()
        .single();

      if (brandError) {
        debugLog('error', 'Brand creation failed', { error: brandError });
        throw brandError;
      }

      // Then create the offer
      const { error: offerError } = await supabase
        .from('offers')
        .insert({
          brand_id: brand.id,
          title: data.offerTitle,
          description: data.offerDescription,
          discount_value: data.discountValue,
          code: formattedCode,
          unique_per_user: data.isUniqueCode,
          expiry_date: data.expiryDate,
          terms: data.terms
        });

      if (offerError) {
        debugLog('error', 'Offer creation failed', { error: offerError });
        throw offerError;
      }

      debugLog('success', 'Retailer offer submitted successfully', {
        brandId: brand.id
      });

    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to submit offer';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    submitOffer,
    loading,
    error
  };
}