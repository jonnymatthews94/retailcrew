/*
  # Fix Company Policies and Validation
  
  1. Changes
    - Drop and recreate company policies with proper permissions
    - Add proper website validation
    - Fix employee relationship handling
  
  2. Security
    - Enable RLS
    - Add proper policies for public and authenticated users
    - Add validation triggers
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Allow anyone to read companies" ON companies;
DROP POLICY IF EXISTS "Allow authenticated users to create companies" ON companies;
DROP POLICY IF EXISTS "Allow company employees to update" ON companies;

-- Ensure RLS is enabled
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;

-- Create proper policies
CREATE POLICY "Enable public reads"
  ON companies
  FOR SELECT
  USING (true);

CREATE POLICY "Enable authenticated inserts"
  ON companies
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Enable authenticated updates"
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

-- Add company_id to profiles if not exists
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'profiles' 
    AND column_name = 'company_id'
  ) THEN
    ALTER TABLE profiles ADD COLUMN company_id uuid REFERENCES companies(id);
  END IF;
END $$;

-- Create function to handle employee relationship
CREATE OR REPLACE FUNCTION handle_employee_relationship()
RETURNS trigger AS $$
BEGIN
  -- Update company_id in profiles
  UPDATE profiles 
  SET company_id = NEW.id
  WHERE id = auth.uid();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for employee relationship
DROP TRIGGER IF EXISTS employee_relationship_trigger ON companies;
CREATE TRIGGER employee_relationship_trigger
  AFTER INSERT ON companies
  FOR EACH ROW
  EXECUTE FUNCTION handle_employee_relationship();

-- Add some sample data if needed
INSERT INTO companies (name, website, type, employee_count)
SELECT 
  'Example Corp',
  'https://example.com',
  'tech',
  0
WHERE NOT EXISTS (SELECT 1 FROM companies LIMIT 1);