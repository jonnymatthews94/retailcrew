/*
  # Fix Profile Creation and Update Process

  1. Changes
    - Update handle_new_user function to populate all required fields
    - Add trigger for profile updates
    - Add validation for required fields
    - Update RLS policies for better security

  2. Security
    - Enable RLS on profiles table
    - Add policies for profile management
    - Add validation constraints
*/

-- Update handle_new_user function to populate all fields
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (
    id,
    email,
    full_name,
    verification_status,
    created_at,
    updated_at
  )
  VALUES (
    new.id,
    new.email,
    COALESCE(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)),
    'not-verified',
    now(),
    now()
  )
  ON CONFLICT (id) DO UPDATE SET
    email = EXCLUDED.email,
    full_name = EXCLUDED.full_name,
    updated_at = now();
  
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Add NOT NULL constraints for required fields
ALTER TABLE profiles
  ALTER COLUMN email SET NOT NULL,
  ALTER COLUMN verification_status SET NOT NULL,
  ALTER COLUMN created_at SET NOT NULL,
  ALTER COLUMN updated_at SET NOT NULL;

-- Add check constraint for verification status
ALTER TABLE profiles ADD CONSTRAINT valid_verification_status
  CHECK (verification_status IN ('verified', 'not-verified', 'verified-expired'));

-- Create function to handle profile updates
CREATE OR REPLACE FUNCTION handle_profile_update()
RETURNS trigger AS $$
BEGIN
  -- Ensure required fields are not nullified
  NEW.email = COALESCE(NEW.email, OLD.email);
  NEW.verification_status = COALESCE(NEW.verification_status, OLD.verification_status);
  NEW.created_at = OLD.created_at;
  NEW.updated_at = now();
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for profile updates
DROP TRIGGER IF EXISTS before_profile_update ON profiles;
CREATE TRIGGER before_profile_update
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION handle_profile_update();

-- Update RLS policies
DROP POLICY IF EXISTS "Users can manage own profile" ON profiles;
DROP POLICY IF EXISTS "Users can create their profile" ON profiles;

-- Allow users to read their own profile
CREATE POLICY "Users can read own profile"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

-- Allow users to update their own profile
CREATE POLICY "Users can update own profile"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Allow profile creation during signup
CREATE POLICY "System can create profiles"
  ON profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);