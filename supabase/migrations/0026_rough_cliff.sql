-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view available codes" ON coupon_codes;
DROP POLICY IF EXISTS "Users can claim codes" ON coupon_codes;

-- Update existing table structure
ALTER TABLE coupon_codes
ADD COLUMN IF NOT EXISTS offer_id uuid REFERENCES offers(id) ON DELETE CASCADE,
ADD COLUMN IF NOT EXISTS is_used boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS used_at timestamptz,
ADD COLUMN IF NOT EXISTS used_by uuid REFERENCES auth.users(id),
ADD COLUMN IF NOT EXISTS created_at timestamptz DEFAULT now();

-- Add unique constraint if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint 
    WHERE conname = 'coupon_codes_offer_id_code_key'
  ) THEN
    ALTER TABLE coupon_codes
    ADD CONSTRAINT coupon_codes_offer_id_code_key UNIQUE (offer_id, code);
  END IF;
END $$;

-- Recreate policies with updated logic
CREATE POLICY "Users can view available codes"
  ON coupon_codes
  FOR SELECT
  TO authenticated
  USING (NOT is_used OR used_by = auth.uid());

CREATE POLICY "Users can claim codes"
  ON coupon_codes
  FOR UPDATE
  TO authenticated
  USING (NOT is_used)
  WITH CHECK (auth.uid() = used_by);

-- Add index if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_indexes 
    WHERE indexname = 'idx_coupon_codes_unused'
  ) THEN
    CREATE INDEX idx_coupon_codes_unused 
      ON coupon_codes(offer_id) 
      WHERE NOT is_used;
  END IF;
END $$;