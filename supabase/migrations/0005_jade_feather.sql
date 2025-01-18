/*
  # Add storage and sharing analytics
  
  1. New Tables
    - `share_clicks` - Track sharing button clicks
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `brand_id` (uuid, references brands)
      - `platform` (text) - e.g., 'email', 'slack'
      - `created_at` (timestamptz)
  
  2. Storage
    - Create bucket for brand logos
    
  3. Security
    - Enable RLS on share_clicks table
    - Add policies for inserting and viewing share data
*/

-- Create share_clicks table
CREATE TABLE IF NOT EXISTS share_clicks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id),
  brand_id uuid REFERENCES brands(id),
  platform text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE share_clicks ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Anyone can insert share clicks"
  ON share_clicks
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Only admins can view share clicks"
  ON share_clicks
  FOR SELECT
  TO authenticated
  USING (is_admin());

-- Create storage bucket
INSERT INTO storage.buckets (id, name)
VALUES ('brand-logos', 'brand-logos')
ON CONFLICT DO NOTHING;

-- Storage policies
CREATE POLICY "Public can view brand logos"
  ON storage.objects
  FOR SELECT
  TO public
  USING (bucket_id = 'brand-logos');

CREATE POLICY "Authenticated users can upload brand logos"
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'brand-logos');

-- Create share analytics views
CREATE OR REPLACE VIEW share_metrics AS
SELECT
  b.name as brand_name,
  sc.platform,
  count(*) as share_count,
  count(DISTINCT sc.user_id) as unique_users,
  date_trunc('day', sc.created_at) as share_date
FROM share_clicks sc
JOIN brands b ON b.id = sc.brand_id
GROUP BY b.name, sc.platform, date_trunc('day', sc.created_at)
ORDER BY share_date DESC;