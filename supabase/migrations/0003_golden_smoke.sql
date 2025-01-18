-- Analytics events table
CREATE TABLE analytics_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_name text NOT NULL,
  properties jsonb DEFAULT '{}'::jsonb,
  user_id uuid REFERENCES auth.users(id),
  session_id text,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE analytics_events ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Enable insert for authenticated users only"
  ON analytics_events
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Enable select for admins only"
  ON analytics_events
  FOR SELECT
  TO authenticated
  USING (is_admin());

-- Create analytics views
CREATE VIEW daily_events AS
SELECT
  date_trunc('day', created_at) as day,
  event_name,
  count(*) as count
FROM analytics_events
GROUP BY 1, 2
ORDER BY 1 DESC;

CREATE VIEW user_activity AS
SELECT
  user_id,
  count(*) as total_events,
  count(DISTINCT date_trunc('day', created_at)) as active_days,
  max(created_at) as last_active
FROM analytics_events
WHERE user_id IS NOT NULL
GROUP BY 1;