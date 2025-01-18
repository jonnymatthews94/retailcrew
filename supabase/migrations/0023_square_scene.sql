-- Create composite primary key for country_codes
ALTER TABLE country_codes
DROP CONSTRAINT IF EXISTS country_codes_pkey,
ADD PRIMARY KEY (code, name);

-- Add unique constraint on id
ALTER TABLE country_codes
ADD CONSTRAINT country_codes_id_key UNIQUE (id);

-- Recreate country codes with proper composite key
TRUNCATE country_codes;
INSERT INTO country_codes (code, name, flag) VALUES
  ('+44', 'United Kingdom', '🇬🇧'),
  ('+1', 'United States', '🇺🇸'),
  ('+1', 'Canada', '🇨🇦'), 
  ('+61', 'Australia', '🇦🇺'),
  ('+64', 'New Zealand', '🇳🇿'),
  ('+65', 'Singapore', '🇸🇬'),
  ('+33', 'France', '🇫🇷'),
  ('+49', 'Germany', '🇩🇪');

-- Add validation check for phone codes
ALTER TABLE country_codes
ADD CONSTRAINT valid_phone_code CHECK (code ~ '^\+[0-9]+$');

-- Add validation for country names
ALTER TABLE country_codes
ADD CONSTRAINT valid_country_name CHECK (length(name) >= 2);

-- Add validation for flags (must be exactly 2 flag emojis)
ALTER TABLE country_codes
ADD CONSTRAINT valid_flag CHECK (flag ~ '^[🇦-🇿]{2}$');