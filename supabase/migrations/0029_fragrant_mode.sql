-- Drop problematic policies
DROP POLICY IF EXISTS "Enable manager reads" ON brand_managers;

-- Create proper policies for brand managers
CREATE POLICY "Allow manager reads"
  ON brand_managers
  FOR SELECT
  TO authenticated
  USING (
    user_id = auth.uid() OR
    EXISTS (
      SELECT 1 FROM brands b
      WHERE b.id = brand_managers.brand_id
      AND EXISTS (
        SELECT 1 FROM brand_managers bm
        WHERE bm.brand_id = b.id
        AND bm.user_id = auth.uid()
        AND bm.status = 'approved'
      )
    )
  );

-- Add missing routes to App.tsx