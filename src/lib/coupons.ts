import { supabase } from './supabase';

export async function getUnusedCode(offerId: string): Promise<string | null> {
  const { data: code, error } = await supabase
    .from('coupon_codes')
    .select('id, code')
    .eq('offer_id', offerId)
    .eq('is_used', false)
    .limit(1)
    .single();

  if (error || !code) return null;

  // Mark code as used
  const { error: updateError } = await supabase
    .from('coupon_codes')
    .update({
      is_used: true,
      used_at: new Date().toISOString(),
      used_by: (await supabase.auth.getUser()).data.user?.id
    })
    .eq('id', code.id);

  if (updateError) return null;

  return code.code;
}