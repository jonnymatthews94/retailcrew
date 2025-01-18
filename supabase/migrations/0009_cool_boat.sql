/*
  # Add name fields to profiles table

  1. Changes
    - Add first_name and last_name columns to profiles table
    - Update handle_new_user function to split full_name into first_name and last_name
    - Add migration to split existing full_name values
*/

-- Add name columns
ALTER TABLE profiles
ADD COLUMN IF NOT EXISTS first_name text,
ADD COLUMN IF NOT EXISTS last_name text;

-- Update handle_new_user function
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
DECLARE
  _first_name text;
  _last_name text;
BEGIN
  -- Split full name from metadata if available
  IF new.raw_user_meta_data->>'full_name' IS NOT NULL THEN
    _first_name := split_part(new.raw_user_meta_data->>'full_name', ' ', 1);
    _last_name := substring(new.raw_user_meta_data->>'full_name' from (length(_first_name) + 2));
  ELSE
    _first_name := split_part(new.email, '@', 1);
    _last_name := '';
  END IF;

  INSERT INTO public.profiles (
    id,
    email,
    first_name,
    last_name,
    verification_status,
    created_at,
    updated_at
  )
  VALUES (
    new.id,
    new.email,
    _first_name,
    _last_name,
    'not-verified',
    now(),
    now()
  )
  ON CONFLICT (id) DO UPDATE SET
    email = EXCLUDED.email,
    first_name = EXCLUDED.first_name,
    last_name = EXCLUDED.last_name,
    updated_at = now();
  
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Split existing full_name values
DO $$
BEGIN
  UPDATE profiles
  SET
    first_name = split_part(full_name, ' ', 1),
    last_name = substring(full_name from (length(split_part(full_name, ' ', 1)) + 2))
  WHERE full_name IS NOT NULL
    AND (first_name IS NULL OR last_name IS NULL);
END $$;