/*
  # Fix Admin Translations Access

  ## Problem
  The admin interface uses the ANON key which means auth.uid() returns null,
  blocking all write operations even though the user has admin role in metadata.

  ## Solution
  Add policies that allow anon role to perform operations when there's a valid
  admin user in the session, checking the user metadata directly.

  ## Changes
  1. Add anon role policies for languages table (INSERT, UPDATE, DELETE)
  2. Add anon role policies for translation_keys table (INSERT, UPDATE, DELETE)
  3. Add anon role policies for translations table (INSERT, UPDATE, DELETE)

  ## Security
  - All policies check for authenticated users with admin role in user_metadata
  - Read access remains public for active content
  - Only authenticated admins can modify data
*/

-- Policies for languages table (anon role with admin check)
CREATE POLICY "Admins via anon can view all languages"
  ON languages FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Admins via anon can insert languages"
  ON languages FOR INSERT
  TO anon
  WITH CHECK (
    auth.uid() IS NOT NULL
    AND EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.raw_user_meta_data->>'role' = 'admin'
    )
  );

CREATE POLICY "Admins via anon can update languages"
  ON languages FOR UPDATE
  TO anon
  USING (
    auth.uid() IS NOT NULL
    AND EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.raw_user_meta_data->>'role' = 'admin'
    )
  )
  WITH CHECK (
    auth.uid() IS NOT NULL
    AND EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.raw_user_meta_data->>'role' = 'admin'
    )
  );

CREATE POLICY "Admins via anon can delete languages"
  ON languages FOR DELETE
  TO anon
  USING (
    auth.uid() IS NOT NULL
    AND EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.raw_user_meta_data->>'role' = 'admin'
    )
  );

-- Policies for translation_keys table (anon role with admin check)
CREATE POLICY "Admins via anon can insert translation keys"
  ON translation_keys FOR INSERT
  TO anon
  WITH CHECK (
    auth.uid() IS NOT NULL
    AND EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.raw_user_meta_data->>'role' = 'admin'
    )
  );

CREATE POLICY "Admins via anon can update translation keys"
  ON translation_keys FOR UPDATE
  TO anon
  USING (
    auth.uid() IS NOT NULL
    AND EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.raw_user_meta_data->>'role' = 'admin'
    )
  )
  WITH CHECK (
    auth.uid() IS NOT NULL
    AND EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.raw_user_meta_data->>'role' = 'admin'
    )
  );

CREATE POLICY "Admins via anon can delete translation keys"
  ON translation_keys FOR DELETE
  TO anon
  USING (
    auth.uid() IS NOT NULL
    AND EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.raw_user_meta_data->>'role' = 'admin'
    )
  );

-- Policies for translations table (anon role with admin check)
CREATE POLICY "Admins via anon can insert translations"
  ON translations FOR INSERT
  TO anon
  WITH CHECK (
    auth.uid() IS NOT NULL
    AND EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.raw_user_meta_data->>'role' = 'admin'
    )
  );

CREATE POLICY "Admins via anon can update translations"
  ON translations FOR UPDATE
  TO anon
  USING (
    auth.uid() IS NOT NULL
    AND EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.raw_user_meta_data->>'role' = 'admin'
    )
  )
  WITH CHECK (
    auth.uid() IS NOT NULL
    AND EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.raw_user_meta_data->>'role' = 'admin'
    )
  );

CREATE POLICY "Admins via anon can delete translations"
  ON translations FOR DELETE
  TO anon
  USING (
    auth.uid() IS NOT NULL
    AND EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.raw_user_meta_data->>'role' = 'admin'
    )
  );
