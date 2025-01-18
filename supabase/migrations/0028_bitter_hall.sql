/*
  # Companies and Brand Management Setup

  1. New Tables
    - `companies` - Where users work
    - `company_employees` - Links users to companies
    - `brand_managers` - Users who can manage brands

  2. Changes
    - Add draft status to offers
    - Add website normalization
    - Add employee counting
    - Add notification system
    - Add RLS policies
*/

-- Create companies table
CREATE TABLE companies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  website text NOT NULL,
  type text NOT NULL,
  employee_count integer DEFAULT 0,
  verified_employee_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create company_employees table
CREATE TABLE company_employees (
  company_id uuid REFERENCES companies(id) ON DELETE CASCADE,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  PRIMARY KEY (company_id, user_id)
);

-- Create brand_managers table
CREATE TABLE brand_managers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  brand_id uuid REFERENCES brands(id) ON DELETE CASCADE,
  status text NOT NULL DEFAULT 'pending',
  approved_at timestamptz,
  approved_by uuid REFERENCES auth.users(id),
  rejection_reason text,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, brand_id)
);

-- Add draft status to offers
ALTER TABLE offers
ADD COLUMN is_draft boolean DEFAULT true;

-- Create function to normalize website URLs
CREATE OR REPLACE FUNCTION normalize_website(url text)
RETURNS text AS $$
DECLARE
  normalized text;
BEGIN
  -- Remove protocol
  normalized := regexp_replace(url, '^https?://', '');
  -- Remove www
  normalized := regexp_replace(normalized, '^www\.', '');
  -- Remove trailing slash
  normalized := rtrim(normalized, '/');
  -- Extract base domain (remove subdomains)
  normalized := regexp_replace(normalized, '^.*?([^.]+\.[^.]+)$', '\1');
  RETURN normalized;
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- Create unique index for normalized websites
CREATE UNIQUE INDEX companies_normalized_website_idx ON companies ((normalize_website(website)));

-- Create function to handle company employee counts
CREATE OR REPLACE FUNCTION handle_company_employee_count()
RETURNS trigger AS $$
BEGIN
  -- Update employee count
  UPDATE companies
  SET 
    employee_count = (
      SELECT count(*) 
      FROM company_employees 
      WHERE company_id = NEW.company_id
    ),
    verified_employee_count = (
      SELECT count(*) 
      FROM company_employees ce
      JOIN profiles p ON p.id = ce.user_id
      WHERE ce.company_id = NEW.company_id
      AND p.verification_status = 'verified'
    ),
    updated_at = now()
  WHERE id = NEW.company_id;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for employee count updates
CREATE TRIGGER update_company_employee_count
  AFTER INSERT OR DELETE ON company_employees
  FOR EACH ROW
  EXECUTE FUNCTION handle_company_employee_count();

-- Create function to notify about brand management requests
CREATE OR REPLACE FUNCTION notify_brand_management_request()
RETURNS trigger AS $$
BEGIN
  IF NEW.status = 'pending' THEN
    -- In production this would send an actual email
    RAISE NOTICE 'New brand management request: User % for Brand %', 
      NEW.user_id, 
      NEW.brand_id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for brand management notifications
CREATE TRIGGER notify_brand_management
  AFTER INSERT ON brand_managers
  FOR EACH ROW
  EXECUTE FUNCTION notify_brand_management_request();

-- Enable RLS
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE company_employees ENABLE ROW LEVEL SECURITY;
ALTER TABLE brand_managers ENABLE ROW LEVEL SECURITY;

-- Companies policies
CREATE POLICY "Enable public reads for companies"
  ON companies
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Enable company creation"
  ON companies
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Company employees policies
CREATE POLICY "Enable employee reads"
  ON company_employees
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Enable employee inserts"
  ON company_employees
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

-- Brand managers policies
CREATE POLICY "Enable manager reads"
  ON brand_managers
  FOR SELECT
  TO authenticated
  USING (
    user_id = auth.uid() OR
    EXISTS (
      SELECT 1 FROM brand_managers
      WHERE brand_id = brand_managers.brand_id
      AND user_id = auth.uid()
      AND status = 'approved'
    )
  );

CREATE POLICY "Enable manager requests"
  ON brand_managers
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

-- Update offer policies for draft state
DROP POLICY IF EXISTS "Allow offer reads" ON offers;
CREATE POLICY "Allow offer reads"
  ON offers
  FOR SELECT
  TO public
  USING (
    status = 'approved' AND 
    NOT is_draft AND
    start_date <= CURRENT_TIMESTAMP AND
    expiry_date > CURRENT_TIMESTAMP
  );

-- Add policy for brand managers to manage offers
CREATE POLICY "Allow offer management by brand managers"
  ON offers
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM brand_managers
      WHERE brand_id = offers.brand_id
      AND user_id = auth.uid()
      AND status = 'approved'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM brand_managers
      WHERE brand_id = offers.brand_id
      AND user_id = auth.uid()
      AND status = 'approved'
    )
  );