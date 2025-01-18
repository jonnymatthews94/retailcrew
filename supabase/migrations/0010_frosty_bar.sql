/*
  # Fix Waitlist Policies

  1. Changes
    - Drop existing waitlist policies
    - Create new policies allowing public inserts and admin reads
    - Add NOT NULL constraints for required fields
    - Add check constraint for valid waitlist types

  2. Security
    - Enable RLS
    - Allow public inserts
    - Restrict reads to admins
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Anyone can join waitlist" ON waitlist;
DROP POLICY IF EXISTS "Only admins can view waitlist" ON waitlist;

-- Add constraints
ALTER TABLE waitlist
  ALTER COLUMN email SET NOT NULL,
  ALTER COLUMN type SET NOT NULL;

-- Add check constraint for type
ALTER TABLE waitlist 
  ADD CONSTRAINT valid_waitlist_type 
  CHECK (type IN ('chrome_extension', 'country'));

-- Create new policies
CREATE POLICY "Enable insert for everyone"
  ON waitlist
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Enable select for admins"
  ON waitlist
  FOR SELECT
  TO authenticated
  USING (is_admin());