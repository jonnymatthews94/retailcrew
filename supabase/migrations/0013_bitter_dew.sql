/*
  # Add unique codes support

  1. New Tables
    - `offer_codes` - Stores unique discount codes for offers
      - `id` (uuid, primary key)
      - `offer_id` (uuid, references offers)
      - `code` (text, unique)
      - `used` (boolean)
      - `used_at` (timestamptz)
      - `used_by` (uuid, references auth.users)
      - `created_at` (timestamptz)

  2. Storage
    - Add bucket for CSV files
    - Add policies for upload/download

  3. Security
    - Enable RLS
    - Add policies for code management
*/

-- Create offer_codes table
CREATE TABLE IF NOT EXISTS offer_codes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  offer_id uuid REFERENCES offers(id) ON DELETE CASCADE,
  code text NOT NULL,
  used boolean DEFAULT false,
  used_at timestamptz,
  used_by uuid REFERENCES auth.users(id),
  created_at timestamptz DEFAULT now(),
  UNIQUE(offer_id, code)
);

-- Enable RLS
ALTER TABLE offer_codes ENABLE ROW LEVEL SECURITY;

-- Create storage bucket for CSV files
INSERT INTO storage.buckets (id, name)
VALUES ('offer-codes', 'offer-codes')
ON CONFLICT DO NOTHING;

-- Storage policies
CREATE POLICY "Public can read offer codes"
  ON storage.objects
  FOR SELECT
  TO public
  USING (bucket_id = 'offer-codes');

CREATE POLICY "Authenticated users can upload codes"
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'offer-codes');

-- Table policies
CREATE POLICY "Enable insert for authenticated users"
  ON offer_codes
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Enable select for authenticated users"
  ON offer_codes
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Enable update for code owners"
  ON offer_codes
  FOR UPDATE
  TO authenticated
  USING (used_by = auth.uid())
  WITH CHECK (used_by = auth.uid());

-- Add code format check
ALTER TABLE offer_codes
  ADD CONSTRAINT code_format CHECK (code ~ '^[A-Z0-9_-]+$');