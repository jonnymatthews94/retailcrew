/*
  # Add initial brands and offers

  1. New Data
    - Add initial brands and their offers
    - Categories: Fashion, Tech, Beauty, Home, Travel, Food & Drink
  
  2. Changes
    - Insert sample data for testing and development
    - Each brand has at least one offer
*/

-- Insert initial brands
WITH brand_inserts AS (
  INSERT INTO brands (name, logo_url, website, category, description) VALUES
    ('Nike', 'https://logo.clearbit.com/nike.com', 'https://nike.com', 'Fashion', 'Global leader in athletic footwear and apparel'),
    ('Adidas', 'https://logo.clearbit.com/adidas.com', 'https://adidas.com', 'Fashion', 'Leading sportswear manufacturer'),
    ('Apple', 'https://logo.clearbit.com/apple.com', 'https://apple.com', 'Tech', 'Leading technology company'),
    ('Samsung', 'https://logo.clearbit.com/samsung.com', 'https://samsung.com', 'Tech', 'Global electronics manufacturer'),
    ('Sephora', 'https://logo.clearbit.com/sephora.com', 'https://sephora.com', 'Beauty', 'Leading beauty retailer'),
    ('IKEA', 'https://logo.clearbit.com/ikea.com', 'https://ikea.com', 'Home', 'Global furniture and home accessories retailer'),
    ('Marriott', 'https://logo.clearbit.com/marriott.com', 'https://marriott.com', 'Travel', 'Global hotel chain'),
    ('Starbucks', 'https://logo.clearbit.com/starbucks.com', 'https://starbucks.com', 'Food & Drink', 'Global coffee chain')
  RETURNING id, name
)
-- Insert offers for each brand
INSERT INTO offers (brand_id, title, description, discount_value, code, unique_per_user, expiry_date, terms)
SELECT 
  id as brand_id,
  CASE name
    WHEN 'Nike' THEN '30% off for industry professionals'
    WHEN 'Adidas' THEN '25% off full-price items'
    WHEN 'Apple' THEN '15% off for professionals'
    WHEN 'Samsung' THEN '25% off mobile devices'
    WHEN 'Sephora' THEN '25% off all beauty'
    WHEN 'IKEA' THEN '20% off furniture'
    WHEN 'Marriott' THEN '20% off room rates'
    WHEN 'Starbucks' THEN '25% off drinks'
  END as title,
  CASE name
    WHEN 'Nike' THEN 'Exclusive discount on Nike gear'
    WHEN 'Adidas' THEN 'Professional discount on Adidas products'
    WHEN 'Apple' THEN 'Special pricing on Apple products'
    WHEN 'Samsung' THEN 'Professional discount on Samsung products'
    WHEN 'Sephora' THEN 'Professional beauty discount'
    WHEN 'IKEA' THEN 'Professional discount on IKEA products'
    WHEN 'Marriott' THEN 'Professional discount on stays'
    WHEN 'Starbucks' THEN 'Professional discount on beverages'
  END as description,
  CASE name
    WHEN 'Nike' THEN '30% off'
    WHEN 'Adidas' THEN '25% off'
    WHEN 'Apple' THEN '15% off'
    WHEN 'Samsung' THEN '25% off'
    WHEN 'Sephora' THEN '25% off'
    WHEN 'IKEA' THEN '20% off'
    WHEN 'Marriott' THEN '20% off'
    WHEN 'Starbucks' THEN '25% off'
  END as discount_value,
  CASE name
    WHEN 'Nike' THEN 'RETAIL30'
    WHEN 'Adidas' THEN 'CREW25'
    WHEN 'Apple' THEN 'RETAIL15'
    WHEN 'Samsung' THEN 'CREW25'
    WHEN 'Sephora' THEN 'BEAUTY25'
    WHEN 'IKEA' THEN 'HOME20'
    WHEN 'Marriott' THEN 'CREW20'
    WHEN 'Starbucks' THEN 'COFFEE25'
  END as code,
  false as unique_per_user,
  '2024-12-31'::timestamptz as expiry_date,
  CASE name
    WHEN 'Nike' THEN ARRAY['Valid on nike.com only', 'Excludes limited editions']
    WHEN 'Adidas' THEN ARRAY['Valid on full-price items only', 'Cannot be combined with other offers']
    WHEN 'Apple' THEN ARRAY['Valid on select products', 'Not valid with education pricing']
    WHEN 'Samsung' THEN ARRAY['Valid on smartphones and tablets', 'Maximum discount applies']
    WHEN 'Sephora' THEN ARRAY['Valid on all brands', 'Cannot be combined with other offers']
    WHEN 'IKEA' THEN ARRAY['Valid on furniture only', 'Excludes gift cards']
    WHEN 'Marriott' THEN ARRAY['Subject to availability', 'Valid at participating hotels']
    WHEN 'Starbucks' THEN ARRAY['Valid at participating locations', 'Excludes food items']
  END as terms
FROM brand_inserts;