/*
  # Add categories and update brand relationships
  
  1. New Tables
    - categories table for storing brand categories
      - id (uuid, primary key)
      - name (text, unique)
      - description (text)
      - icon (text)
      - timestamps
  
  2. Changes
    - Add category_id to brands table
    - Migrate existing category data
    - Link brands to categories
    
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

-- Add category_id to brands
ALTER TABLE brands 
ADD COLUMN IF NOT EXISTS category_id uuid REFERENCES categories(id);

-- Insert initial categories
WITH inserted_categories AS (
  INSERT INTO categories (name, description, icon) VALUES
    ('Fashion', 'Clothing, accessories, and footwear', 'ShoppingBag'),
    ('Tech', 'Electronics, software, and gadgets', 'Laptop'),
    ('Beauty', 'Skincare, makeup, and beauty products', 'Sparkles'),
    ('Home', 'Furniture, decor, and home improvement', 'Home'),
    ('Health & Fitness', 'Supplements, equipment, and wellness', 'Dumbbell'),
    ('Travel', 'Hotels, flights, and experiences', 'Plane'),
    ('Food & Drink', 'Restaurants, delivery, and groceries', 'Coffee'),
    ('Entertainment', 'Movies, games, and activities', 'Film')
  ON CONFLICT (name) DO UPDATE 
    SET description = EXCLUDED.description,
        icon = EXCLUDED.icon
  RETURNING id, name
)
-- Update brands with their category IDs
UPDATE brands b
SET category_id = c.id
FROM inserted_categories c
WHERE 
  (b.name IN ('Nike', 'Adidas') AND c.name = 'Fashion') OR
  (b.name IN ('Apple', 'Samsung') AND c.name = 'Tech') OR
  (b.name = 'Sephora' AND c.name = 'Beauty') OR
  (b.name = 'IKEA' AND c.name = 'Home') OR
  (b.name = 'Marriott' AND c.name = 'Travel') OR
  (b.name = 'Starbucks' AND c.name = 'Food & Drink');

-- Set default category for any remaining brands
UPDATE brands
SET category_id = (SELECT id FROM categories WHERE name = 'Fashion')
WHERE category_id IS NULL;

-- Now we can safely make category_id required
ALTER TABLE brands 
ALTER COLUMN category_id SET NOT NULL;