import { useState } from 'react';
import { getUnusedCode, markCodeAsUsed } from '../../../lib/coupons/codes';

export function useOfferCode(offerId: string) {
  const [isLoading, setIsLoading] = useState(false);
  const [showCouponDialog, setShowCouponDialog] = useState(false);
  const [currentCode, setCurrentCode] = useState('');

  const handleGetCode = async () => {
    setIsLoading(true);

    try {
      const uniqueCode = await getUnusedCode(offerId);
      if (!uniqueCode) {
        throw new Error('No codes available');
      }

      await markCodeAsUsed(uniqueCode.id);
      setCurrentCode(uniqueCode.code);
      setShowCouponDialog(true);
    } catch (error) {
      console.error('Failed to get code:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    currentCode,
    showCouponDialog,
    setShowCouponDialog,
    handleGetCode
  };
}