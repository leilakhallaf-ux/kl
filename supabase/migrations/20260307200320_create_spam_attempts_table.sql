/*
  # Create spam attempts tracking table

  1. New Tables
    - `spam_attempts`
      - `id` (uuid, primary key) - Unique identifier
      - `email` (text) - Email from submission
      - `name` (text) - Name from submission
      - `message` (text) - Message content
      - `honeypot_filled` (boolean) - Whether honeypot was filled
      - `submission_time_ms` (integer) - Time taken to submit in milliseconds
      - `ip_address` (text, nullable) - IP address if available
      - `user_agent` (text, nullable) - User agent if available
      - `created_at` (timestamptz) - When the spam attempt was logged
      - `attempted_at` (timestamptz) - When the submission was attempted

  2. Security
    - Enable RLS on `spam_attempts` table
    - Only authenticated users (admins) can read spam attempts
    - No public access to spam data

  3. Notes
    - This table logs all blocked spam attempts for monitoring
    - All entries are timestamped for analysis
    - Helps identify spam patterns and improve filtering
*/

CREATE TABLE IF NOT EXISTS spam_attempts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  name text NOT NULL,
  message text NOT NULL,
  honeypot_filled boolean DEFAULT false,
  submission_time_ms integer,
  ip_address text,
  user_agent text,
  created_at timestamptz DEFAULT now(),
  attempted_at timestamptz DEFAULT now()
);

ALTER TABLE spam_attempts ENABLE ROW LEVEL SECURITY;

-- Only authenticated users can view spam attempts (for admin monitoring)
CREATE POLICY "Authenticated users can view spam attempts"
  ON spam_attempts
  FOR SELECT
  TO authenticated
  USING (true);

-- Create index for faster queries on created_at
CREATE INDEX IF NOT EXISTS idx_spam_attempts_created_at ON spam_attempts(created_at DESC);