-- First update existing company types to valid values
UPDATE companies 
SET type = 'other'
WHERE type NOT IN ('agency', 'retailer', 'tech', 'publisher', 'other');

-- Drop existing policies
DROP POLICY IF EXISTS "Enable company reads" ON companies;
DROP POLICY IF EXISTS "Enable company creation" ON companies;

-- Create proper policies with better names and clearer intent
CREATE POLICY "anyone_can_read_companies"
  ON companies
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "authenticated_users_can_create_companies"
  ON companies
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Add better validation for company data
ALTER TABLE companies
ADD CONSTRAINT company_name_length CHECK (length(name) >= 2),
ADD CONSTRAINT company_type_valid CHECK (type IN ('agency', 'retailer', 'tech', 'publisher', 'other'));

-- Add function to handle company creation
CREATE OR REPLACE FUNCTION handle_company_creation()
RETURNS trigger AS $$
BEGIN
  -- Set initial employee count
  NEW.employee_count := 1;
  
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

-- Create trigger for company creation
DROP TRIGGER IF EXISTS company_creation_trigger ON companies;
CREATE TRIGGER company_creation_trigger
  BEFORE INSERT ON companies
  FOR EACH ROW
  EXECUTE FUNCTION handle_company_creation();