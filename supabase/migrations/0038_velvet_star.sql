-- Drop existing policies and start fresh
DROP POLICY IF EXISTS "Allow public company reads" ON companies;
DROP POLICY IF EXISTS "Allow company creation during signup" ON companies;

-- Create comprehensive policies
CREATE POLICY "Enable company reads"
  ON companies
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Enable company creation"
  ON companies
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Add validation trigger for company websites
CREATE OR REPLACE FUNCTION validate_company_website()
RETURNS trigger AS $$
BEGIN
  -- Normalize website
  NEW.website := normalize_website(NEW.website);
  
  -- Check for duplicates
  IF EXISTS (
    SELECT 1 FROM companies 
    WHERE id != NEW.id 
    AND website = NEW.website
  ) THEN
    RAISE EXCEPTION 'Company with this website already exists';
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for website validation
DROP TRIGGER IF EXISTS company_website_validation ON companies;
CREATE TRIGGER company_website_validation
  BEFORE INSERT OR UPDATE ON companies
  FOR EACH ROW
  EXECUTE FUNCTION validate_company_website();