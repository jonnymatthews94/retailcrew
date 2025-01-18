/*
  # Fix Retailer Onboarding Issues

  1. Storage
    - Fix storage bucket policies for offer codes
    - Add proper RLS policies for file uploads
  
  2. Security
    - Update offer code table policies
    - Add proper constraints and validations
*/

-- Create offer codes bucket if not exists
INSERT INTO storage.buckets (id, name, public)
VALUES ('offer-codes', 'offer-codes', false)
ON CONFLICT (id) DO UPDATE SET public = false;

-- Drop existing storage policies
DROP POLICY IF EXISTS "Enable offer code uploads" ON storage.objects;
DROP POLICY IF EXISTS "Enable offer code downloads" ON storage.objects;

-- Create proper storage policies
CREATE POLICY "Allow offer code uploads"
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'offer-codes' AND
    (storage.extension(name) = 'csv')
  );

CREATE POLICY "Allow offer code downloads"
  ON storage.objects
  FOR SELECT
  TO authenticated
  USING (bucket_id = 'offer-codes');

-- Update offer codes table
ALTER TABLE offer_codes
  ADD COLUMN IF NOT EXISTS brand_id uuid REFERENCES brands(id),
  ADD COLUMN IF NOT EXISTS status text DEFAULT 'active';

-- Add constraints
ALTER TABLE offer_codes
  ADD CONSTRAINT valid_code_status CHECK (status IN ('active', 'used', 'expired')),
  ADD CONSTRAINT valid_code_format CHECK (code ~ '^[A-Z0-9_-]+$');

-- Update offer codes policies
DROP POLICY IF EXISTS "Enable insert for authenticated users" ON offer_codes;
DROP POLICY IF EXISTS "Enable select for authenticated users" ON offer_codes;
DROP POLICY IF EXISTS "Enable update for code owners" ON offer_codes;

CREATE POLICY "Allow code creation"
  ON offer_codes
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow code reads"
  ON offer_codes
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow code updates"
  ON offer_codes
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

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