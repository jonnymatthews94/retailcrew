-- Drop existing policy
DROP POLICY IF EXISTS "Allow manager reads" ON brand_managers;

-- Create new simplified policy
CREATE POLICY "Allow manager reads"
  ON brand_managers
  FOR SELECT
  TO authenticated
  USING (
    -- User can see their own requests
    user_id = auth.uid() OR
    -- Admins can see all requests
    is_admin() OR
    -- Approved managers can see other managers for their brands
    EXISTS (
      SELECT 1 
      FROM brand_managers approved
      WHERE approved.brand_id = brand_managers.brand_id
      AND approved.user_id = auth.uid()
      AND approved.status = 'approved'
    )
  );

-- Add index to improve policy performance
CREATE INDEX IF NOT EXISTS idx_brand_managers_user_brand 
ON brand_managers(user_id, brand_id);

-- Add index for status checks
CREATE INDEX IF NOT EXISTS idx_brand_managers_status 
ON brand_managers(status);