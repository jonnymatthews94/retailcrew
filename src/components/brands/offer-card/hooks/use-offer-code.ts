import { useState } from 'react';
import { useUser } from '../../../../contexts/user-context';
import { getUnusedCode, markCodeAsUsed } from '../../../../lib/coupons';
import type { OfferCodeState } from '../types';

export function useOfferCode(offerId: string) {
  const { user } = useUser();
  const [state, setState] = useState<OfferCodeState>({
    isLoading: false,
    currentCode: '',
    showDialog: false
  });

  const handleGetCode = async () => {
    // Only proceed if user is verified
    if (!user || user.verificationStatus !== 'verified') {
      return;
    }

    setState(prev => ({ ...prev, isLoading: true }));

    try {
      const uniqueCode = await getUnusedCode(offerId);
      if (!uniqueCode) throw new Error('No codes available');

      await markCodeAsUsed(uniqueCode.id);
      setState({
        isLoading: false,
        currentCode: uniqueCode.code,
        showDialog: true
      });
    } catch (error) {
      console.error('Failed to get code:', error);
      setState(prev => ({ ...prev, isLoading: false }));
    }
  };

  const closeDialog = () => {
    setState(prev => ({ ...prev, showDialog: false }));
  };

  return {
    ...state,
    handleGetCode,
    closeDialog
  };
}