/*
  # Create admin login attempts tracking table

  1. New Tables
    - `admin_login_attempts`
      - `id` (uuid, primary key)
      - `email` (text) - Email attempted
      - `ip_address` (text) - IP address of attempt
      - `user_agent` (text) - Browser/client info
      - `success` (boolean) - Whether login succeeded
      - `honeypot_triggered` (boolean) - Whether honeypot was filled
      - `created_at` (timestamptz) - Timestamp of attempt
  
  2. Security
    - Enable RLS on `admin_login_attempts` table
    - Only authenticated admin users can read attempts
    - Public can insert (for logging failed attempts)
  
  3. Indexes
    - Index on email for quick lookups
    - Index on ip_address for rate limiting
    - Index on created_at for time-based queries
*/

CREATE TABLE IF NOT EXISTS admin_login_attempts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text,
  ip_address text,
  user_agent text,
  success boolean DEFAULT false,
  honeypot_triggered boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE admin_login_attempts ENABLE ROW LEVEL SECURITY;

-- Admins can read all attempts
CREATE POLICY "Admins can view login attempts"
  ON admin_login_attempts
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.email = auth.jwt()->>'email'
    )
  );

-- Anyone can insert attempts (for logging)
CREATE POLICY "Anyone can log login attempts"
  ON admin_login_attempts
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_admin_login_attempts_email ON admin_login_attempts(email);
CREATE INDEX IF NOT EXISTS idx_admin_login_attempts_ip ON admin_login_attempts(ip_address);
CREATE INDEX IF NOT EXISTS idx_admin_login_attempts_created_at ON admin_login_attempts(created_at DESC);
