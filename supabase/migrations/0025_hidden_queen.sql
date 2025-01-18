/*
  # Add coupon batches and tracking

  1. New Tables
    - `coupon_batches`
      - Tracks groups of uploaded coupon codes
      - Monitors usage and alerts thresholds
    - `coupon_codes`
      - Stores individual unique codes
      - Tracks usage and assignment

  2. Changes
    - Added relations to offers and users
    - Added tracking for code usage
    - Added alert thresholds

  3. Security
    - Enable RLS
    - Add policies for access control
*/

-- Create coupon batches table
CREATE TABLE coupon_batches (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  offer_id uuid REFERENCES offers(id) ON DELETE CASCADE,
  uploaded_by uuid REFERENCES auth.users(id),
  name text NOT NULL,
  total_codes integer NOT NULL,
  used_codes integer DEFAULT 0,
  alert_threshold integer DEFAULT 25,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create coupon codes table
CREATE TABLE coupon_codes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  batch_id uuid REFERENCES coupon_batches(id) ON DELETE CASCADE,
  code text NOT NULL,
  is_used boolean DEFAULT false,
  used_at timestamptz,
  used_by uuid REFERENCES auth.users(id),
  created_at timestamptz DEFAULT now(),
  UNIQUE(batch_id, code)
);

-- Enable RLS
ALTER TABLE coupon_batches ENABLE ROW LEVEL SECURITY;
ALTER TABLE coupon_codes ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own batches"
  ON coupon_batches
  FOR SELECT
  TO authenticated
  USING (uploaded_by = auth.uid() OR EXISTS (
    SELECT 1 FROM offers o 
    WHERE o.id = offer_id AND o.status = 'approved'
  ));

CREATE POLICY "Users can insert batches"
  ON coupon_batches
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Users can view available codes"
  ON coupon_codes
  FOR SELECT
  TO authenticated
  USING (
    NOT is_used OR used_by = auth.uid()
  );

-- Create function to check batch threshold
CREATE OR REPLACE FUNCTION check_batch_threshold()
RETURNS trigger AS $$
BEGIN
  -- Calculate percentage of codes used
  IF (NEW.used_codes::float / NEW.total_codes * 100) >= NEW.alert_threshold THEN
    -- TODO: Implement notification system
    -- For now, we'll just update a column
    UPDATE coupon_batches
    SET needs_attention = true
    WHERE id = NEW.id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for threshold check
CREATE TRIGGER check_batch_threshold_trigger
  AFTER UPDATE OF used_codes ON coupon_batches
  FOR EACH ROW
  EXECUTE FUNCTION check_batch_threshold();

-- Add indexes
CREATE INDEX idx_coupon_codes_batch_unused 
  ON coupon_codes(batch_id) 
  WHERE NOT is_used;

CREATE INDEX idx_coupon_batches_offer 
  ON coupon_batches(offer_id);