/*
  # Fix waitlist policies and cleanup

  1. Changes
    - Remove analytics tables and views
    - Clean up duplicate waitlist entries
    - Add unique constraint for email per type
    - Update waitlist policies
  
  2. Security
    - Enable RLS
    - Add policies for public access
*/

-- Drop analytics tables and views
DROP TABLE IF EXISTS analytics_events CASCADE;
DROP VIEW IF EXISTS daily_events CASCADE;
DROP VIEW IF EXISTS daily_events_by_type CASCADE;
DROP VIEW IF EXISTS user_activity CASCADE;
DROP VIEW IF EXISTS user_engagement CASCADE;
DROP VIEW IF EXISTS waitlist_metrics CASCADE;

-- Clean up duplicate waitlist entries before adding constraint
DELETE FROM waitlist a USING waitlist b
WHERE a.id > b.id 
  AND a.email = b.email 
  AND a.type = b.type;

-- Add unique constraint for email per type
ALTER TABLE waitlist
ADD CONSTRAINT waitlist_email_type_unique UNIQUE (email, type);

-- Recreate waitlist policies
DROP POLICY IF EXISTS "Enable insert for everyone" ON waitlist;
DROP POLICY IF EXISTS "Enable select for admins" ON waitlist;

CREATE POLICY "Allow public inserts"
  ON waitlist
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Enable public reads"
  ON waitlist
  FOR SELECT
  TO public
  USING (true);