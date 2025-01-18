import { debugLog } from '../../components/debug/logger';
import type { VerificationStatus } from '../../types/user';

export function isVerified(status: VerificationStatus | undefined): boolean {
  debugLog('info', 'Checking verification status', { status });
  return status === 'verified';
}

export function getVerificationMessage(status: VerificationStatus | undefined): string {
  switch (status) {
    case 'verified':
      return 'Get Code';
    case 'not-verified':
      return 'Get verified to view code';
    case 'verified-expired':
      return 'Renew verification to view code';
    default:
      return 'Sign in to view code';
  }
}