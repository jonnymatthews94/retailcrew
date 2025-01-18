-- Add company_id to profiles
ALTER TABLE profiles
ADD COLUMN IF NOT EXISTS company_id uuid REFERENCES companies(id);

-- Create function to handle company employee counts
CREATE OR REPLACE FUNCTION handle_company_employee_count()
RETURNS trigger AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    -- Increment employee count
    UPDATE companies
    SET employee_count = employee_count + 1
    WHERE id = NEW.company_id;
  ELSIF TG_OP = 'DELETE' THEN
    -- Decrement employee count
    UPDATE companies
    SET employee_count = employee_count - 1
    WHERE id = OLD.company_id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for employee count updates
DROP TRIGGER IF EXISTS update_company_employee_count ON profiles;
CREATE TRIGGER update_company_employee_count
  AFTER INSERT OR DELETE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION handle_company_employee_count();

-- Add index for company website lookups
CREATE UNIQUE INDEX IF NOT EXISTS idx_companies_normalized_website 
ON companies ((lower(regexp_replace(website, '^https?://(www\.)?|/$', '', 'g'))));

-- Update company policies
DROP POLICY IF EXISTS "Enable public reads for companies" ON companies;
DROP POLICY IF EXISTS "Enable company creation" ON companies;

CREATE POLICY "Allow company reads"
  ON companies
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow company creation"
  ON companies
  FOR INSERT
  TO authenticated
  WITH CHECK (true);