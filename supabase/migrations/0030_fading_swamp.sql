-- First, ensure all required columns have values
UPDATE brands
SET 
  category_id = (SELECT id FROM categories WHERE name = 'Fashion' LIMIT 1)
WHERE category_id IS NULL;

UPDATE profiles
SET 
  verification_status = 'not-verified'
WHERE verification_status IS NULL;

-- Insert dummy companies
INSERT INTO companies (name, website, type, employee_count)
VALUES 
  ('ASOS', 'asos.com', 'retailer', 500),
  ('Shopify', 'shopify.com', 'tech', 1000),
  ('Nike', 'nike.com', 'brand', 2000),
  ('RetailAgency', 'retailagency.com', 'agency', 100)
ON CONFLICT DO NOTHING;

-- Insert dummy brand managers
WITH demo_user AS (
  SELECT id FROM auth.users LIMIT 1
), demo_brands AS (
  SELECT id FROM brands LIMIT 3
)
INSERT INTO brand_managers (user_id, brand_id, status, approved_at)
SELECT 
  (SELECT id FROM demo_user),
  id,
  'approved',
  now()
FROM demo_brands
ON CONFLICT DO NOTHING;

-- Fix brand_managers policies to prevent recursion
DROP POLICY IF EXISTS "Allow manager reads" ON brand_managers;

CREATE POLICY "Allow manager reads"
  ON brand_managers
  FOR SELECT
  TO authenticated
  USING (
    user_id = auth.uid() OR
    EXISTS (
      SELECT 1 FROM brand_managers bm2
      WHERE bm2.brand_id = brand_managers.brand_id
      AND bm2.user_id = auth.uid()
      AND bm2.status = 'approved'
    )
  );

-- Add some dummy offers if none exist
INSERT INTO offers (
  brand_id,
  title,
  description,
  discount_value,
  code,
  start_date,
  expiry_date,
  status,
  is_draft
)
SELECT 
  b.id,
  'Welcome Offer',
  'Special discount for retail professionals',
  '25% off',
  'WELCOME25',
  now(),
  now() + interval '1 year',
  'approved',
  false
FROM brands b
WHERE NOT EXISTS (
  SELECT 1 FROM offers o WHERE o.brand_id = b.id
)
LIMIT 5;

-- Ensure all offers have required fields
UPDATE offers
SET
  start_date = COALESCE(start_date, now()),
  status = COALESCE(status, 'approved'),
  is_draft = COALESCE(is_draft, false)
WHERE start_date IS NULL OR status IS NULL OR is_draft IS NULL;