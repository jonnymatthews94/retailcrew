/*
  # Create profiles table

  1. New Tables
    - `profiles`
      - `id` (uuid, primary key)
      - `email` (text)
      - `full_name` (text)
      - `company_name` (text)
      - `company_type` (text)
      - `company_website` (text)
      - `job_title` (text)
      - `phone` (text)
      - `verification_status` (text)
      - `verification_expiry` (timestamptz)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on `profiles` table
    - Add policies for authenticated users to:
      - Read own profile
      - Update own profile
*/

CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  full_name text,
  company_name text,
  company_type text,
  company_website text,
  job_title text,
  phone text,
  verification_status text DEFAULT 'not-verified',
  verification_expiry timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can read own profile"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Create function to handle updated_at
CREATE OR REPLACE FUNCTION handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for updated_at
CREATE TRIGGER profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION handle_updated_at();