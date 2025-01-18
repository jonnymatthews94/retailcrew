/*
  # Add status fields to brands and offers

  1. New Fields
    - Add status field to brands table
    - Add status field to offers table
    - Add moderation fields for tracking review process
  
  2. Changes
    - Add constraints and validation for status fields
    - Update existing policies to handle status
*/

-- Add status fields to brands
ALTER TABLE brands
ADD COLUMN status text NOT NULL DEFAULT 'pending',
ADD COLUMN moderation_notes text,
ADD COLUMN moderated_at timestamptz,
ADD COLUMN moderated_by uuid REFERENCES auth.users(id);

-- Add status fields to offers
ALTER TABLE offers 
ADD COLUMN status text NOT NULL DEFAULT 'pending',
ADD COLUMN moderation_notes text,
ADD COLUMN moderated_at timestamptz,
ADD COLUMN moderated_by uuid REFERENCES auth.users(id);

-- Add constraints
ALTER TABLE brands
ADD CONSTRAINT valid_brand_status 
  CHECK (status IN ('pending', 'approved', 'rejected'));

ALTER TABLE offers
ADD CONSTRAINT valid_offer_status 
  CHECK (status IN ('pending', 'approved', 'rejected', 'expired'));

-- Create function to handle offer expiry
CREATE OR REPLACE FUNCTION handle_offer_expiry()
RETURNS trigger AS $$
BEGIN
  IF NEW.expiry_date < CURRENT_TIMESTAMP THEN
    NEW.status = 'expired';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for offer expiry
CREATE TRIGGER check_offer_expiry
  BEFORE INSERT OR UPDATE ON offers
  FOR EACH ROW
  EXECUTE FUNCTION handle_offer_expiry();

-- Update policies to only show approved items by default
DROP POLICY IF EXISTS "Enable brand management" ON brands;
DROP POLICY IF EXISTS "Enable offer management" ON offers;

-- Brand policies
CREATE POLICY "Allow brand reads"
  ON brands
  FOR SELECT
  TO public
  USING (status = 'approved');

CREATE POLICY "Allow brand creation"
  ON brands
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow brand updates by admin"
  ON brands
  FOR UPDATE
  TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

-- Offer policies
CREATE POLICY "Allow offer reads"
  ON offers
  FOR SELECT
  TO public
  USING (status = 'approved');

CREATE POLICY "Allow offer creation"
  ON offers
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow offer updates by admin"
  ON offers
  FOR UPDATE
  TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());