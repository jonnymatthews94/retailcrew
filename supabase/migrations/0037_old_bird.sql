-- Drop existing policies
DROP POLICY IF EXISTS "Enable public reads" ON companies;
DROP POLICY IF EXISTS "Enable authenticated inserts" ON companies;
DROP POLICY IF EXISTS "Enable authenticated updates" ON companies;

-- Create proper policies
CREATE POLICY "Allow public company reads"
  ON companies
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow company creation during signup"
  ON companies
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Add function to normalize website URLs
CREATE OR REPLACE FUNCTION normalize_website(url text)
RETURNS text AS $$
BEGIN
  RETURN lower(regexp_replace(
    regexp_replace(url, '^https?://(www\.)?', ''),
    '/$', ''
  ));
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- Add unique index for normalized websites
DROP INDEX IF EXISTS idx_companies_normalized_website;
CREATE UNIQUE INDEX idx_companies_normalized_website 
  ON companies (normalize_website(website));