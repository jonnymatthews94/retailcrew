export type VerificationStatus = 'verified' | 'not-verified' | 'verified-expired';

export interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  companyName?: string;
  companyWebsite?: string;
  companyType?: string;
  verificationStatus: VerificationStatus;
  verificationExpiry?: string;
}