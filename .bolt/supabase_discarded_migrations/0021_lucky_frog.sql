/*
  # Add categories and update brand relationships

  1. New Tables
    - `categories` table for storing brand categories
      - `id` (uuid, primary key)
      - `name` (text, unique)
      - `description` (text)
      - `icon` (text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Changes
    - Add `category_id` to brands table
    - Migrate existing category data
    - Set up foreign key relationship

  3. Security
    - Enable RLS on categories table
    - Add public read policy
*/

-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  description text,
  icon text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow public reads for categories"
  ON categories
  FOR SELECT
  TO public
  USING (true);

-- Insert initial categories
INSERT INTO categories (name, description, icon) VALUES
  ('Fashion', 'Clothing, accessories, and footwear', 'ShoppingBag'),
  ('Tech', 'Electronics, software, and gadgets', 'Laptop'),
  ('Beauty', 'Skincare, makeup, and beauty products', 'Sparkles'),
  ('Home', 'Furniture, decor, and home improvement', 'Home'),
  ('Health & Fitness', 'Supplements, equipment, and wellness', 'Dumbbell'),
  ('Travel', 'Hotels, flights, and experiences', 'Plane'),
  ('Food & Drink', 'Restaurants, delivery, and groceries', 'Coffee'),
  ('Entertainment', 'Movies, games, and activities', 'Film')
ON CONFLICT (name) DO NOTHING;

-- Add category_id to brands
ALTER TABLE brands 
ADD COLUMN IF NOT EXISTS category_id uuid;

-- Create temporary mapping table
CREATE TEMP TABLE category_mapping (
  old_category text,
  new_category text
);

-- Insert category mappings
INSERT INTO category_mapping (old_category, new_category) VALUES
  ('Fashion', 'Fashion'),
  ('Tech', 'Tech'),
  ('Beauty', 'Beauty'),
  ('Home', 'Home'),
  ('Health & Fitness', 'Health & Fitness'),
  ('Travel', 'Travel'),
  ('Food & Drink', 'Food & Drink'),
  ('Entertainment', 'Entertainment');

-- Update brands with new category IDs using a DO block for safety
DO $$
DECLARE
  v_category_id uuid;
  v_mapping RECORD;
BEGIN
  FOR v_mapping IN SELECT * FROM category_mapping LOOP
    -- Get category ID
    SELECT id INTO v_category_id
    FROM categories
    WHERE name = v_mapping.new_category;

    -- Update brands
    IF v_category_id IS NOT NULL THEN
      UPDATE brands
      SET category_id = v_category_id
      WHERE category = v_mapping.old_category;
    END IF;
  END LOOP;
END $$;

-- Drop temporary table
DROP TABLE category_mapping;

-- Add foreign key constraint
ALTER TABLE brands
ADD CONSTRAINT brands_category_id_fkey 
FOREIGN KEY (category_id) 
REFERENCES categories(id);

-- Now we can safely set NOT NULL constraint
ALTER TABLE brands
ALTER COLUMN category_id SET NOT NULL;