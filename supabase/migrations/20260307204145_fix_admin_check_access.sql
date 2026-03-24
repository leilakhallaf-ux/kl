/*
  # Fix Admin Check Access

  1. Changes
    - Allow authenticated users to check if THEIR OWN email is in admin_users
    - Users can only see if their own email exists (not the full list)
    - Maintains security while allowing login validation

  2. Security
    - Users can only check their own email
    - Cannot enumerate all admins
    - Still requires authentication
*/

-- Drop the overly restrictive policy
DROP POLICY IF EXISTS "Admins can view admin list" ON admin_users;

-- Create a new policy that allows users to check if THEIR email is admin
CREATE POLICY "Users can check their own admin status"
  ON admin_users
  FOR SELECT
  TO authenticated
  USING (email = auth.jwt() ->> 'email');
