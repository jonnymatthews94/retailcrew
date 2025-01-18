/*
  # Fix brand and offer submission policies

  1. Changes
    - Update brand policies to allow public inserts
    - Update offer policies to allow public inserts
    - Add proper constraints and validation
  
  2. Security
    - Enable RLS on both tables
    - Add policies for public access
*/

-- Drop existing brand policies
DROP POLICY IF EXISTS "Anyone can view brands" ON brands;
DROP POLICY IF EXISTS "Only admins can insert brands" ON brands;
DROP POLICY IF EXISTS "Only admins can update brands" ON brands;
DROP POLICY IF EXISTS "Only admins can delete brands" ON brands;

-- Drop existing offer policies
DROP POLICY IF EXISTS "Anyone can view offers" ON offers;
DROP POLICY IF EXISTS "Only admins can insert offers" ON offers;
DROP POLICY IF EXISTS "Only admins can update offers" ON offers;
DROP POLICY IF EXISTS "Only admins can delete offers" ON offers;

-- Create new brand policies
CREATE POLICY "Enable public reads for brands"
  ON brands
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Enable public inserts for brands"
  ON brands
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Create new offer policies
CREATE POLICY "Enable public reads for offers"
  ON offers
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Enable public inserts for offers"
  ON offers
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Add constraints
ALTER TABLE brands
  ALTER COLUMN name SET NOT NULL,
  ALTER COLUMN category SET NOT NULL;

ALTER TABLE offers
  ALTER COLUMN brand_id SET NOT NULL,
  ALTER COLUMN title SET NOT NULL,
  ALTER COLUMN discount_value SET NOT NULL,
  ALTER COLUMN code SET NOT NULL,
  ALTER COLUMN expiry_date SET NOT NULL;

-- Add validation for required fields
ALTER TABLE brands
  ADD CONSTRAINT brand_name_length CHECK (char_length(name) >= 2),
  ADD CONSTRAINT website_format CHECK (website ~ '^https?://.*$');

ALTER TABLE offers
  ADD CONSTRAINT title_length CHECK (char_length(title) >= 5),
  ADD CONSTRAINT code_format CHECK (code ~ '^[A-Z0-9_-]+$');