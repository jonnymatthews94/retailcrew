/*
  # Fix Code Upload Functionality

  1. Storage
    - Create temporary bucket for code uploads
    - Set proper permissions for authenticated users
  
  2. Security
    - Update storage policies
    - Add proper RLS policies for code management
*/

-- Create temporary bucket for code uploads
INSERT INTO storage.buckets (id, name, public)
VALUES ('temp-codes', 'temp-codes', false)
ON CONFLICT (id) DO UPDATE SET public = false;

-- Drop existing policies
DROP POLICY IF EXISTS "Enable code file uploads" ON storage.objects;
DROP POLICY IF EXISTS "Enable code file reads" ON storage.objects;

-- Create proper storage policies
CREATE POLICY "Allow temp code uploads"
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'temp-codes' AND
    (storage.extension(name) = 'csv')
  );

CREATE POLICY "Allow temp code reads"
  ON storage.objects
  FOR SELECT
  TO authenticated
  USING (bucket_id = 'temp-codes');

CREATE POLICY "Allow temp code deletes"
  ON storage.objects
  FOR DELETE
  TO authenticated
  USING (bucket_id = 'temp-codes');

-- Function to validate and process codes
CREATE OR REPLACE FUNCTION validate_codes(codes text[])
RETURNS text[] AS $$
BEGIN
  RETURN ARRAY(
    SELECT code FROM unnest(codes) AS code
    WHERE code ~ '^[A-Z0-9_-]+$'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;