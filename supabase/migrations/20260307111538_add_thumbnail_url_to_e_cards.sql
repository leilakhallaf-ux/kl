/*
  # Add thumbnail_url field to e_cards table

  1. Changes
    - Add `thumbnail_url` (text) column to `e_cards` table
      - This field stores the preview image URL displayed in masonry grids
      - Optional field, can be NULL if no thumbnail is provided
  
  2. Notes
    - This is the primary visual field for displaying cards in grid views
    - Used in Home, S'inspirer, and Best-of pages
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'e_cards' AND column_name = 'thumbnail_url'
  ) THEN
    ALTER TABLE e_cards ADD COLUMN thumbnail_url TEXT;
  END IF;
END $$;