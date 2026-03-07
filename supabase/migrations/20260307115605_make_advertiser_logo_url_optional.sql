/*
  # Make advertiser_logo_url optional

  1. Changes
    - Remove NOT NULL constraint from advertiser_logo_url column
    - Allow e-cards to exist without a logo
    - Display advertiser name as fallback when logo is missing
*/

ALTER TABLE e_cards 
ALTER COLUMN advertiser_logo_url DROP NOT NULL;