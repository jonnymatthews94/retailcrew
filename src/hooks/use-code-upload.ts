import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { debugLog } from '../components/debug/logger';

export function useCodeUpload() {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const uploadCodes = async (file: File): Promise<string[]> => {
    try {
      setUploading(true);
      setError(null);

      debugLog('info', 'Starting code upload', { fileName: file.name });

      // Upload to temp bucket
      const filePath = `temp/${Date.now()}-${file.name}`;
      const { error: uploadError } = await supabase.storage
        .from('temp-codes')
        .upload(filePath, file, {
          contentType: 'text/csv'
        });

      if (uploadError) {
        debugLog('error', 'Upload failed', { error: uploadError });
        throw uploadError;
      }

      // Download and parse
      const { data, error: downloadError } = await supabase.storage
        .from('temp-codes')
        .download(filePath);

      if (downloadError) {
        debugLog('error', 'Download failed', { error: downloadError });
        throw downloadError;
      }

      // Parse CSV content
      const text = await data.text();
      const codes = text
        .split('\n')
        .map(code => code.trim().toUpperCase())
        .filter(code => code && /^[A-Z0-9_-]+$/.test(code));

      if (codes.length === 0) {
        throw new Error('No valid codes found in CSV');
      }

      // Cleanup temp file
      await supabase.storage
        .from('temp-codes')
        .remove([filePath]);

      debugLog('success', 'Code upload completed', { 
        codesCount: codes.length 
      });

      return codes;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to upload codes';
      setError(message);
      debugLog('error', 'Code upload failed', { error: message });
      throw err;
    } finally {
      setUploading(false);
    }
  };

  return {
    uploadCodes,
    uploading,
    error
  };
}