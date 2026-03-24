/*
  # Add Service Role Bypass for Translations

  1. Changes
    - Add policies to allow service_role to bypass RLS for bulk inserts
    - This allows scripts running with service role key to insert translations
    - Maintains security by keeping admin-only access for regular authenticated users

  2. Security
    - Service role policies added for translation_keys and translations tables
    - Regular user policies remain unchanged
    - Only scripts with service_role key can bypass RLS
*/

-- Add service role bypass policies for translation_keys
CREATE POLICY "Service role can insert translation keys"
  ON translation_keys FOR INSERT
  TO service_role
  WITH CHECK (true);

CREATE POLICY "Service role can update translation keys"
  ON translation_keys FOR UPDATE
  TO service_role
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Service role can delete translation keys"
  ON translation_keys FOR DELETE
  TO service_role
  USING (true);

-- Add service role bypass policies for translations
CREATE POLICY "Service role can insert translations"
  ON translations FOR INSERT
  TO service_role
  WITH CHECK (true);

CREATE POLICY "Service role can update translations"
  ON translations FOR UPDATE
  TO service_role
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Service role can delete translations"
  ON translations FOR DELETE
  TO service_role
  USING (true);
