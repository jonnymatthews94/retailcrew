/*
  # Analytics Views Setup

  1. New Views
    - `daily_events_by_type` - Event counts grouped by day and type
    - `user_engagement` - User activity metrics
    - `waitlist_metrics` - Waitlist conversion tracking
    - `verification_funnel` - User verification funnel analysis

  2. Functions
    - `get_event_metrics` - Helper function for event aggregation
*/

-- Daily events by type with rolling averages
CREATE OR REPLACE VIEW daily_events_by_type AS
SELECT
  date_trunc('day', created_at) as day,
  event_name,
  count(*) as count,
  avg(count(*)) OVER (
    ORDER BY date_trunc('day', created_at)
    ROWS BETWEEN 6 PRECEDING AND CURRENT ROW
  ) as rolling_7day_avg
FROM analytics_events
GROUP BY 1, 2
ORDER BY 1 DESC, 2;

-- User engagement metrics
CREATE OR REPLACE VIEW user_engagement AS
SELECT
  user_id,
  count(*) as total_events,
  count(DISTINCT date_trunc('day', created_at)) as active_days,
  max(created_at) as last_active,
  min(created_at) as first_active,
  count(DISTINCT session_id) as total_sessions
FROM analytics_events
WHERE user_id IS NOT NULL
GROUP BY 1;

-- Waitlist metrics
CREATE OR REPLACE VIEW waitlist_metrics AS
SELECT
  type,
  count(*) as total_signups,
  count(DISTINCT email) as unique_signups,
  date_trunc('day', created_at) as signup_date
FROM waitlist
GROUP BY type, signup_date
ORDER BY signup_date DESC;

-- Verification funnel
CREATE OR REPLACE VIEW verification_funnel AS
SELECT
  date_trunc('day', created_at) as day,
  count(*) as total_users,
  count(*) FILTER (WHERE verification_status = 'verified') as verified_users,
  count(*) FILTER (WHERE verification_status = 'verified-expired') as expired_users
FROM profiles
GROUP BY 1
ORDER BY 1 DESC;