/*
  # Secure Admin Access System

  1. New Tables
    - `admin_users`
      - `id` (uuid, primary key)
      - `email` (text, unique) - Email address of authorized admin
      - `created_at` (timestamptz) - When admin was added
      - `created_by` (uuid) - Reference to auth.users who created this entry
  
  2. Security Changes
    - Enable RLS on `admin_users` table
    - Add policy to allow only admins to read admin list
    - Update e_cards policies to restrict INSERT/UPDATE/DELETE to admins only
    - Public can still SELECT e_cards (for viewing)
  
  3. Data
    - Insert your email as the first admin
  
  4. Important Notes
    - Only users with emails in admin_users table can modify e_cards
    - Admin list can only be viewed by existing admins
    - This creates a secure admin system
*/

-- Create admin_users table
CREATE TABLE IF NOT EXISTS admin_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now(),
  created_by uuid REFERENCES auth.users(id)
);

-- Enable RLS
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Policy: Only admins can view the admin list
CREATE POLICY "Admins can view admin list"
  ON admin_users
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.email = auth.jwt()->>'email'
    )
  );

-- Policy: Only admins can add other admins
CREATE POLICY "Admins can add other admins"
  ON admin_users
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.email = auth.jwt()->>'email'
    )
  );

-- Drop existing permissive e_cards policies
DROP POLICY IF EXISTS "Authenticated users can create e-cards" ON e_cards;
DROP POLICY IF EXISTS "Authenticated users can update e-cards" ON e_cards;
DROP POLICY IF EXISTS "Authenticated users can delete e-cards" ON e_cards;

-- Create new restrictive policies for e_cards (only admins can modify)
CREATE POLICY "Only admins can create e-cards"
  ON e_cards
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.email = auth.jwt()->>'email'
    )
  );

CREATE POLICY "Only admins can update e-cards"
  ON e_cards
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.email = auth.jwt()->>'email'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.email = auth.jwt()->>'email'
    )
  );

CREATE POLICY "Only admins can delete e-cards"
  ON e_cards
  FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.email = auth.jwt()->>'email'
    )
  );

-- Insert the first admin (you will need to replace this with your actual email)
-- This is a bootstrap entry - you can add more admins later through the admin panel
INSERT INTO admin_users (email, created_by)
VALUES ('leila.khallaf@example.com', NULL)
ON CONFLICT (email) DO NOTHING;
