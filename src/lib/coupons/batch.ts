import { supabase } from '../supabase';
import type { CouponBatch } from './types';

export async function getBatchStats(batchId: string): Promise<CouponBatch | null> {
  const { data, error } = await supabase
    .from('coupon_batches')
    .select('*')
    .eq('id', batchId)
    .single();

  if (error || !data) return null;

  return {
    id: data.id,
    offerId: data.offer_id,
    name: data.name,
    totalCodes: data.total_codes,
    usedCodes: data.used_codes,
    alertThreshold: data.alert_threshold,
    createdAt: data.created_at
  };
}

export async function updateBatchStats(batchId: string): Promise<void> {
  const { count } = await supabase
    .from('coupon_codes')
    .select('id', { count: 'exact' })
    .eq('batch_id', batchId)
    .eq('is_used', true);

  await supabase
    .from('coupon_batches')
    .update({ used_codes: count || 0 })
    .eq('id', batchId);
}