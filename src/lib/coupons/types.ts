export interface CouponBatch {
  id: string;
  offerId: string;
  name: string;
  totalCodes: number;
  usedCodes: number;
  alertThreshold: number;
  createdAt: string;
}

export interface CouponCode {
  id: string;
  batchId: string;
  code: string;
  isUsed: boolean;
  usedAt?: string;
  usedBy?: string;
}