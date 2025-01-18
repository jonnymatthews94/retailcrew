/*
  # Fix Retailer Storage Issues

  1. Storage
    - Create proper buckets with correct permissions
    - Fix storage policies for offer codes
  
  2. Security
    - Update RLS policies for brands and offers
    - Add proper validation constraints
*/

-- Create offer codes bucket with proper settings
INSERT INTO storage.buckets (id, name, public)
VALUES ('offer-codes', 'offer-codes', false)
ON CONFLICT (id) DO UPDATE SET public = false;

-- Drop existing storage policies
DROP POLICY IF EXISTS "Allow offer code uploads" ON storage.objects;
DROP POLICY IF EXISTS "Allow offer code downloads" ON storage.objects;

-- Create proper storage policies
CREATE POLICY "Enable code file uploads"
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'offer-codes' AND
    (storage.extension(name) = 'csv')
  );

CREATE POLICY "Enable code file reads"
  ON storage.objects
  FOR SELECT
  TO authenticated
  USING (bucket_id = 'offer-codes');

-- Update brand policies
DROP POLICY IF EXISTS "Allow brand creation" ON brands;
DROP POLICY IF EXISTS "Allow brand reads" ON brands;

CREATE POLICY "Enable brand management"
  ON brands
  USING (true)
  WITH CHECK (true);

-- Update offer policies
DROP POLICY IF EXISTS "Allow offer creation" ON offers;
DROP POLICY IF EXISTS "Allow offer reads" ON offers;

CREATE POLICY "Enable offer management"
  ON offers
  USING (true)
  WITH CHECK (true);

-- Add validation constraints
ALTER TABLE brands
  DROP CONSTRAINT IF EXISTS brand_name_length,
  DROP CONSTRAINT IF EXISTS website_format,
  ADD CONSTRAINT brand_name_length CHECK (char_length(name) >= 2),
  ADD CONSTRAINT website_format CHECK (website ~ '^https?://.*$');

ALTER TABLE offers
  DROP CONSTRAINT IF EXISTS title_length,
  DROP CONSTRAINT IF EXISTS code_format,
  ADD CONSTRAINT title_length CHECK (char_length(title) >= 5),
  ADD CONSTRAINT code_format CHECK (code ~ '^[A-Z0-9_-]+$');

-- Function to process CSV codes
CREATE OR REPLACE FUNCTION process_offer_codes(
  p_offer_id uuid,
  p_brand_id uuid,
  p_codes text[]
)
RETURNS void AS $$
BEGIN
  INSERT INTO offer_codes (offer_id, brand_id, code)
  SELECT p_offer_id, p_brand_id, unnest(p_codes);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;