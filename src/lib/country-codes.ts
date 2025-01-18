import { supabase } from './supabase';

export interface CountryCode {
  code: string;
  name: string;
  flag: string;
}

export async function getCountryCodes(): Promise<CountryCode[]> {
  const { data, error } = await supabase
    .from('country_codes')
    .select('*')
    .order('name');

  if (error) throw error;
  return data || [];
}