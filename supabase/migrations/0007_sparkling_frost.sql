/*
  # Fix profiles table RLS policies

  1. Changes
    - Add policy to allow users to insert their own profile
    - Update existing policies for better security
  
  2. Security
    - Users can only insert/update their own profile
    - Users can only read their own profile
    - Maintains data isolation between users
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Users can read own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;

-- Create comprehensive policies
CREATE POLICY "Users can manage own profile"
  ON profiles
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Allow profile creation during signup
CREATE POLICY "Users can create their profile"
  ON profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Ensure trigger for new users exists
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, verification_status)
  VALUES (new.id, new.email, 'not-verified')
  ON CONFLICT (id) DO NOTHING;
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Recreate trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();