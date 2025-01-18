-- Drop existing policies
DROP POLICY IF EXISTS "Allow company reads" ON companies;
DROP POLICY IF EXISTS "Allow company creation" ON companies;

-- Create new policies with proper permissions
CREATE POLICY "Enable public company reads"
  ON companies
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Enable authenticated company creation"
  ON companies
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Add function to normalize website URLs
CREATE OR REPLACE FUNCTION normalize_website(url text)
RETURNS text AS $$
BEGIN
  -- Remove protocol and www
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

-- Add some sample companies if none exist
INSERT INTO companies (name, website, type, employee_count)
SELECT 
  'Example Corp',
  'https://example.com',
  'tech',
  0
WHERE NOT EXISTS (SELECT 1 FROM companies LIMIT 1);