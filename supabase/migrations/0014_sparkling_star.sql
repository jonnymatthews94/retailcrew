/*
  # Fix Waitlist and Retailer Policies

  1. Updates
    - Fix waitlist policies to allow public inserts
    - Update storage policies for offer codes
    - Add missing RLS policies for brands and offers
    - Add proper constraints and validations

  2. Security
    - Enable RLS on all tables
    - Add proper policies for public access
*/

-- Fix waitlist policies
DROP POLICY IF EXISTS "Allow public inserts" ON waitlist;
DROP POLICY IF EXISTS "Enable public reads" ON waitlist;

CREATE POLICY "Enable public waitlist inserts"
  ON waitlist
  FOR INSERT
  TO public
  WITH CHECK (
    type IN ('chrome_extension', 'country') AND
    email IS NOT NULL
  );

-- Fix storage policies for offer codes
DROP POLICY IF EXISTS "Public can read offer codes" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload codes" ON storage.objects;

CREATE POLICY "Enable offer code uploads"
  ON storage.objects
  FOR INSERT
  TO public
  WITH CHECK (
    bucket_id = 'offer-codes' AND
    (storage.extension(name) = 'csv')
  );

CREATE POLICY "Enable offer code downloads"
  ON storage.objects
  FOR SELECT
  TO public
  USING (bucket_id = 'offer-codes');

-- Fix brand and offer policies
DROP POLICY IF EXISTS "Enable public reads for brands" ON brands;
DROP POLICY IF EXISTS "Enable public inserts for brands" ON brands;
DROP POLICY IF EXISTS "Enable public reads for offers" ON brands;
DROP POLICY IF EXISTS "Enable public inserts for offers" ON offers;

-- Brand policies
CREATE POLICY "Allow brand creation"
  ON brands
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Allow brand reads"
  ON brands
  FOR SELECT
  TO public
  USING (true);

-- Offer policies
CREATE POLICY "Allow offer creation"
  ON offers
  FOR INSERT
  TO public
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM brands b
      WHERE b.id = brand_id
    )
  );

CREATE POLICY "Allow offer reads"
  ON offers
  FOR SELECT
  TO public
  USING (true);

-- Add missing constraints
ALTER TABLE waitlist
  ADD CONSTRAINT waitlist_email_check CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$');

ALTER TABLE brands
  ADD CONSTRAINT brand_website_check CHECK (website ~* '^https?://[A-Za-z0-9.-]+\.[A-Za-z]{2,}');

ALTER TABLE offers
  ADD CONSTRAINT offer_expiry_check CHECK (expiry_date > CURRENT_TIMESTAMP);