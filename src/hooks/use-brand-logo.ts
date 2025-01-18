import { useState } from 'react';
import { supabase } from '../lib/supabase';

export function useBrandLogo() {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const uploadLogo = async (file: File, brandId: string) => {
    try {
      setUploading(true);
      setError(null);

      const fileExt = file.name.split('.').pop();
      const filePath = `${brandId}/logo.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('brand-logos')
        .upload(filePath, file, {
          upsert: true,
          cacheControl: '3600'
        });

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('brand-logos')
        .getPublicUrl(filePath);

      return publicUrl;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error uploading logo');
      throw err;
    } finally {
      setUploading(false);
    }
  };

  return {
    uploadLogo,
    uploading,
    error
  };
}