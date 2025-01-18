import { supabase } from '../supabase';
import { updateBatchStats } from './batch';
import type { CouponCode } from './types';

export async function getUnusedCode(offerId: string): Promise<CouponCode | null> {
  // First get an available batch
  const { data: batch } = await supabase
    .from('coupon_batches')
    .select('id')
    .eq('offer_id', offerId)
    .lt('used_codes', supabase.raw('total_codes'))
    .order('created_at')
    .limit(1)
    .single();

  if (!batch) return null;

  // Get unused code from batch
  const { data: code, error } = await supabase
    .from('coupon_codes')
    .select('*')
    .eq('batch_id', batch.id)
    .eq('is_used', false)
    .limit(1)
    .single();

  if (error || !code) return null;

  return transformCode(code);
}

export async function markCodeAsUsed(codeId: string): Promise<boolean> {
  const { data: code, error } = await supabase
    .from('coupon_codes')
    .update({
      is_used: true,
      used_at: new Date().toISOString(),
      used_by: (await supabase.auth.getUser()).data.user?.id
    })
    .eq('id', codeId)
    .select('batch_id')
    .single();

  if (error || !code) return false;

  // Update batch stats
  await updateBatchStats(code.batch_id);
  return true;
}

function transformCode(code: any): CouponCode {
  return {
    id: code.id,
    batchId: code.batch_id,
    code: code.code,
    isUsed: code.is_used,
    usedAt: code.used_at,
    usedBy: code.used_by
  };
}