/*
  # Add country codes table
  
  1. New Tables
    - country_codes
      - id (uuid, primary key) - Added to handle multiple countries with same code
      - code (text) - e.g., '+44'
      - name (text) - e.g., 'United Kingdom' 
      - flag (text) - emoji flag
  
  2. Changes
    - Add index on code for faster lookups
    - Add trigger for updated_at
    
  3. Security
    - Enable RLS
    - Add public read policy
*/

-- Create country_codes table
CREATE TABLE IF NOT EXISTS country_codes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code text NOT NULL,
  name text NOT NULL,
  flag text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Add index on code for faster lookups
CREATE INDEX IF NOT EXISTS idx_country_codes_code ON country_codes(code);

-- Enable RLS
ALTER TABLE country_codes ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow public reads for country_codes"
  ON country_codes
  FOR SELECT
  TO public
  USING (true);

-- Add updated_at trigger for country_codes
CREATE TRIGGER country_codes_updated_at
  BEFORE UPDATE ON country_codes
  FOR EACH ROW
  EXECUTE FUNCTION handle_updated_at();

-- Insert initial country codes
INSERT INTO country_codes (code, name, flag) VALUES
  ('+44', 'United Kingdom', '🇬🇧'),
  ('+1', 'United States', '🇺🇸'),
  ('+1', 'Canada', '🇨🇦'),
  ('+61', 'Australia', '🇦🇺'),
  ('+64', 'New Zealand', '🇳🇿'),
  ('+65', 'Singapore', '🇸🇬'),
  ('+33', 'France', '🇫🇷'),
  ('+49', 'Germany', '🇩🇪');

-- Add index on categories.name for faster lookups
CREATE INDEX IF NOT EXISTS idx_categories_name ON categories(name);

-- Add updated_at trigger for categories if not exists
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger 
    WHERE tgname = 'categories_updated_at'
  ) THEN
    CREATE TRIGGER categories_updated_at
      BEFORE UPDATE ON categories
      FOR EACH ROW
      EXECUTE FUNCTION handle_updated_at();
  END IF;
END $$;

-- Verify brands-categories relationship
DO $$ 
BEGIN
  -- Check for any brands without categories
  IF EXISTS (
    SELECT 1 FROM brands WHERE category_id IS NULL
  ) THEN
    RAISE EXCEPTION 'Found brands without categories';
  END IF;

  -- Verify foreign key constraint exists
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints
    WHERE table_name = 'brands'
    AND constraint_name = 'brands_category_id_fkey'
  ) THEN
    RAISE EXCEPTION 'Missing foreign key constraint on brands.category_id';
  END IF;
END $$;