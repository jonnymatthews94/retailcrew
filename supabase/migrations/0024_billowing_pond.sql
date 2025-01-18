-- Add start_date column to offers table
ALTER TABLE offers 
ADD COLUMN start_date timestamptz NOT NULL DEFAULT '2024-01-01 00:00:00+00';

-- Update existing offers to start from January 1st, 2024
UPDATE offers 
SET start_date = '2024-01-01 00:00:00+00'
WHERE start_date = '2024-01-01 00:00:00+00';

-- Add check constraint to ensure start_date is before expiry_date
ALTER TABLE offers
ADD CONSTRAINT offer_dates_check 
CHECK (start_date < expiry_date);

-- Update offer expiry function to check both dates
CREATE OR REPLACE FUNCTION handle_offer_expiry()
RETURNS trigger AS $$
BEGIN
  IF NEW.expiry_date < CURRENT_TIMESTAMP THEN
    NEW.status = 'expired';
  END IF;
  IF NEW.start_date > NEW.expiry_date THEN
    RAISE EXCEPTION 'Start date must be before expiry date';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;