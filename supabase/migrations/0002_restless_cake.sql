/*
  # Core Tables Setup

  1. New Tables
    - brands
    - offers
    - waitlist
    - contact_messages

  2. Security
    - Enable RLS on all tables
    - Add appropriate policies for each table
    - Use auth.jwt() -> app_metadata -> is_admin for admin checks
*/

-- Brands table
CREATE TABLE IF NOT EXISTS brands (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  logo_url text,
  website text,
  category text NOT NULL,
  description text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Offers table
CREATE TABLE IF NOT EXISTS offers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  brand_id uuid REFERENCES brands(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  discount_value text NOT NULL,
  code text NOT NULL,
  unique_per_user boolean DEFAULT false,
  expiry_date timestamptz NOT NULL,
  terms text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Waitlist table
CREATE TABLE IF NOT EXISTS waitlist (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  type text NOT NULL,
  country_code text,
  created_at timestamptz DEFAULT now()
);

-- Contact messages table
CREATE TABLE IF NOT EXISTS contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  message text NOT NULL,
  status text DEFAULT 'new',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE brands ENABLE ROW LEVEL SECURITY;
ALTER TABLE offers ENABLE ROW LEVEL SECURITY;
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Create admin check function
CREATE OR REPLACE FUNCTION is_admin()
RETURNS boolean AS $$
BEGIN
  RETURN (auth.jwt() ->> 'app_metadata')::jsonb ->> 'is_admin' = 'true';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Brands policies
CREATE POLICY "Anyone can view brands"
  ON brands
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Only admins can insert brands"
  ON brands
  FOR INSERT
  TO authenticated
  WITH CHECK (is_admin());

CREATE POLICY "Only admins can update brands"
  ON brands
  FOR UPDATE
  TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

CREATE POLICY "Only admins can delete brands"
  ON brands
  FOR DELETE
  TO authenticated
  USING (is_admin());

-- Offers policies
CREATE POLICY "Anyone can view offers"
  ON offers
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Only admins can insert offers"
  ON offers
  FOR INSERT
  TO authenticated
  WITH CHECK (is_admin());

CREATE POLICY "Only admins can update offers"
  ON offers
  FOR UPDATE
  TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

CREATE POLICY "Only admins can delete offers"
  ON offers
  FOR DELETE
  TO authenticated
  USING (is_admin());

-- Waitlist policies
CREATE POLICY "Anyone can join waitlist"
  ON waitlist
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Only admins can view waitlist"
  ON waitlist
  FOR SELECT
  TO authenticated
  USING (is_admin());

-- Contact messages policies
CREATE POLICY "Anyone can submit contact messages"
  ON contact_messages
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Only admins can view messages"
  ON contact_messages
  FOR SELECT
  TO authenticated
  USING (is_admin());

-- Updated at trigger function
CREATE OR REPLACE FUNCTION handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER brands_updated_at
  BEFORE UPDATE ON brands
  FOR EACH ROW
  EXECUTE FUNCTION handle_updated_at();

CREATE TRIGGER offers_updated_at
  BEFORE UPDATE ON offers
  FOR EACH ROW
  EXECUTE FUNCTION handle_updated_at();

CREATE TRIGGER contact_messages_updated_at
  BEFORE UPDATE ON contact_messages
  FOR EACH ROW
  EXECUTE FUNCTION handle_updated_at();