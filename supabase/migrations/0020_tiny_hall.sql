/*
  # Update brand and offer status

  1. Changes
    - Updates all existing brands to 'approved' status
    - Updates all existing offers to 'approved' status
    - Sets moderation timestamps
  
  2. Security
    - Only affects existing records
    - Preserves all constraints and policies
*/

-- Update all existing brands to approved status
UPDATE brands
SET 
  status = 'approved',
  moderated_at = NOW()
WHERE status = 'pending';

-- Update all existing offers to approved status
UPDATE offers
SET 
  status = 'approved',
  moderated_at = NOW()
WHERE status = 'pending';