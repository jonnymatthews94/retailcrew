import { supabase } from '../supabase';
import type { CouponBatch, CouponCode } from './types';

export async function getUnusedCode(offerId: string): Promise<CouponCode | null> {
  const { data: batch } = await supabase
    .from('coupon_batches')
    .select('id')
    .eq('offer_id', offerId)
    .single();

  if (!batch) return null;

  const { data: code, error } = await supabase
    .from('coupon_codes')
    .select('*')
    .eq('batch_id', batch.id)
    .eq('is_used', false)
    .limit(1)
    .single();

  if (error || !code) return null;

  return {
    id: code.id,
    batchId: code.batch_id,
    code: code.code,
    isUsed: code.is_used,
    usedAt: code.used_at,
    usedBy: code.used_by
  };
}

export async function markCodeAsUsed(codeId: string): Promise<boolean> {
  const { error } = await supabase
    .from('coupon_codes')
    .update({
      is_used: true,
      used_at: new Date().toISOString(),
      used_by: (await supabase.auth.getUser()).data.user?.id
    })
    .eq('id', codeId);

  return !error;
}