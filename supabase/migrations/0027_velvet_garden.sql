-- Create initial batches for all approved offers
WITH initial_batches AS (
  INSERT INTO coupon_batches (
    offer_id,
    uploaded_by,
    name,
    total_codes,
    used_codes,
    alert_threshold
  )
  SELECT 
    id as offer_id,
    (SELECT id FROM auth.users LIMIT 1) as uploaded_by,
    'Initial Batch - ' || title as name,
    1000 as total_codes,
    0 as used_codes,
    25 as alert_threshold
  FROM offers
  WHERE status = 'approved'
  AND start_date <= CURRENT_TIMESTAMP
  AND expiry_date > CURRENT_TIMESTAMP
  RETURNING id, offer_id
)
-- Generate codes for each batch
INSERT INTO coupon_codes (
  batch_id,
  offer_id,
  code
)
SELECT 
  b.id as batch_id,
  b.offer_id,
  o.code || '-' || lpad(generate_series(1, 1000)::text, 4, '0') as code
FROM initial_batches b
JOIN offers o ON o.id = b.offer_id;