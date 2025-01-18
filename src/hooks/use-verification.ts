import { useEffect } from 'react';
import { useUser } from '../contexts/user-context';
import { debugLog } from '../components/debug/logger';
import type { VerificationStatus } from '../types/user';

export function useVerification() {
  const { user, setUser } = useUser();

  useEffect(() => {
    if (user?.verificationStatus) {
      debugLog('info', 'Verification status loaded', {
        status: user.verificationStatus,
        expiry: user.verificationExpiry
      });
    }
  }, [user?.verificationStatus]);

  const updateStatus = (status: VerificationStatus) => {
    debugLog('info', 'Updating verification status', {
      from: user?.verificationStatus,
      to: status
    });

    if (user) {
      setUser({
        ...user,
        verificationStatus: status
      });
    }
  };

  return {
    status: user?.verificationStatus,
    expiry: user?.verificationExpiry,
    updateStatus
  };
}