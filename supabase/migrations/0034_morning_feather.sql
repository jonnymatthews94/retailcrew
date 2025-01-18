/*
  # Fix Company Policies and RLS
  
  1. Changes
    - Drop existing policies
    - Create new comprehensive policies for companies table
    - Add proper website normalization
    - Add validation triggers
  
  2. Security
    - Enable RLS
    - Add proper policies for public and authenticated users
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Enable public company reads" ON companies;
DROP POLICY IF EXISTS "Enable authenticated company creation" ON companies;
DROP POLICY IF EXISTS "Allow company reads" ON companies;
DROP POLICY IF EXISTS "Allow company creation" ON companies;

-- Ensure RLS is enabled
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;

-- Create comprehensive policies
CREATE POLICY "Allow anyone to read companies"
  ON companies
  FOR SELECT
  USING (true);

CREATE POLICY "Allow authenticated users to create companies"
  ON companies
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow company employees to update"
  ON companies
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.company_id = companies.id
      AND profiles.id = auth.uid()
    )
  );

-- Add function to normalize websites
CREATE OR REPLACE FUNCTION normalize_website(url text)
RETURNS text AS $$
BEGIN
  RETURN lower(regexp_replace(
    regexp_replace(url, '^https?://(www\.)?', ''),
    '/$', ''
  ));
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- Add index for normalized website lookups
DROP INDEX IF EXISTS idx_companies_normalized_website;
CREATE INDEX idx_companies_normalized_website 
  ON companies (normalize_website(website));

-- Add trigger function to prevent duplicate websites
CREATE OR REPLACE FUNCTION check_duplicate_website()
RETURNS trigger AS $$
DECLARE
  normalized_website text;
BEGIN
  normalized_website := normalize_website(NEW.website);
  
  IF EXISTS (
    SELECT 1 FROM companies 
    WHERE id != NEW.id 
    AND normalize_website(website) = normalized_website
  ) THEN
    RAISE EXCEPTION 'A company with this website already exists';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for website validation
DROP TRIGGER IF EXISTS prevent_duplicate_website ON companies;
CREATE TRIGGER prevent_duplicate_website
  BEFORE INSERT OR UPDATE ON companies
  FOR EACH ROW
  EXECUTE FUNCTION check_duplicate_website();