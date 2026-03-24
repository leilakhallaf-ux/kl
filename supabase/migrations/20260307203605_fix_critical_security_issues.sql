/*
  # Fix Critical Security Issues
  
  ## Issues Fixed
  
  1. **E-Cards Table**
    - Remove permissive policies that allow any authenticated user to modify e-cards
    - Keep ONLY the admin-restricted policies
  
  2. **Contact Messages Table**
    - Remove policies allowing all authenticated users to read/update messages
    - Add restrictive admin-only policies for reading and updating
  
  ## Changes
  
  1. Drop all existing policies on e_cards and contact_messages
  2. Recreate only secure, admin-restricted policies
  
  ## Security Notes
  
  - Only users in the admin_users table can now modify e-cards
  - Only admins can read and update contact messages
  - Public users can still view published e-cards and submit contact messages
*/

-- Drop all existing policies on e_cards
DROP POLICY IF EXISTS "Anyone can view published e-cards" ON e_cards;
DROP POLICY IF EXISTS "Authenticated admins can delete e-cards" ON e_cards;
DROP POLICY IF EXISTS "Authenticated admins can insert e-cards" ON e_cards;
DROP POLICY IF EXISTS "Authenticated admins can update e-cards" ON e_cards;
DROP POLICY IF EXISTS "Only admins can create e-cards" ON e_cards;
DROP POLICY IF EXISTS "Only admins can delete e-cards" ON e_cards;
DROP POLICY IF EXISTS "Only admins can update e-cards" ON e_cards;

-- Drop all existing policies on contact_messages
DROP POLICY IF EXISTS "Anyone can submit contact messages" ON contact_messages;
DROP POLICY IF EXISTS "Authenticated users can read contact messages" ON contact_messages;
DROP POLICY IF EXISTS "Authenticated users can update contact messages" ON contact_messages;

-- Recreate secure policies for e_cards
CREATE POLICY "Public can view published e-cards"
  ON e_cards
  FOR SELECT
  TO public
  USING (is_published = true);

CREATE POLICY "Admins can view all e-cards"
  ON e_cards
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.email = (auth.jwt() ->> 'email')
    )
  );

CREATE POLICY "Admins can create e-cards"
  ON e_cards
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.email = (auth.jwt() ->> 'email')
    )
  );

CREATE POLICY "Admins can update e-cards"
  ON e_cards
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.email = (auth.jwt() ->> 'email')
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.email = (auth.jwt() ->> 'email')
    )
  );

CREATE POLICY "Admins can delete e-cards"
  ON e_cards
  FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.email = (auth.jwt() ->> 'email')
    )
  );

-- Recreate secure policies for contact_messages
CREATE POLICY "Anyone can submit contact messages"
  ON contact_messages
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Admins can read contact messages"
  ON contact_messages
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.email = (auth.jwt() ->> 'email')
    )
  );

CREATE POLICY "Admins can update contact messages"
  ON contact_messages
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.email = (auth.jwt() ->> 'email')
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.email = (auth.jwt() ->> 'email')
    )
  );
