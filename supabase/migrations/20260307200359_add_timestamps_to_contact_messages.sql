/*
  # Add timestamps to contact_messages table

  1. Changes
    - Add `submitted_at` column to track when the message was submitted
    - Add `processed_at` column to track when the message was processed/read
    - Backfill existing rows with current timestamp for submitted_at

  2. Notes
    - All new contact messages will be automatically timestamped
    - Helps track message handling and response times
    - processed_at remains null until an admin marks it as processed
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'contact_messages' AND column_name = 'submitted_at'
  ) THEN
    ALTER TABLE contact_messages ADD COLUMN submitted_at timestamptz DEFAULT now();
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'contact_messages' AND column_name = 'processed_at'
  ) THEN
    ALTER TABLE contact_messages ADD COLUMN processed_at timestamptz;
  END IF;
END $$;

-- Create index for faster queries on submitted_at
CREATE INDEX IF NOT EXISTS idx_contact_messages_submitted_at ON contact_messages(submitted_at DESC);