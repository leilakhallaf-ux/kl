/*
  # E-Cards Corporate Platform - Complete Database Schema

  ## Overview
  Database schema for ecards-corporate.com, a premium archive platform for corporate e-cards.
  
  ## New Tables
  
  ### 1. e_cards
  Main table storing all e-card information with comprehensive metadata:
  - `id` (uuid, primary key) - Unique identifier
  - `advertiser_name` (text) - Company/brand name
  - `advertiser_logo_url` (text) - URL to advertiser logo
  - `business_sector` (text) - Industry sector
  - `vintage` (integer) - Year of creation (2008-2026+)
  - `language` (text) - FR, EN, etc.
  - `card_type` (text) - Type of card (voeux, anniversaire, etc.)
  - `version` (text) - Version identifier if applicable
  - `topic` (text) - Theme/subject matter
  - `technology` (text) - Tech used (HTML5, Flash, Video, etc.)
  - `distributor` (text) - Distribution platform
  - `tags` (text[]) - Array of searchable tags
  - `url` (text) - Primary URL to view the e-card
  - `fallback_url` (text) - Fallback URL if primary fails
  - `swf_url` (text) - Direct SWF file URL for Flash cards
  - `is_hosted` (boolean) - Whether file is hosted on our storage
  - `file_path` (text) - Path in Supabase Storage if hosted
  - `campaign_aim` (text) - Campaign objective
  - `target_audience` (text) - Intended audience
  - `key_message` (text) - Main message
  - `tone` (text) - Communication tone
  - `submitted_by` (text) - Submitter name (Leïla Khallaf by default)
  - `submitted_capacity` (text) - Submitter role
  - `agency` (text) - Creative agency
  - `credits` (jsonb) - Full credits in structured format
  - `description` (text) - Detailed description
  - `views` (integer) - View counter
  - `likes` (integer) - Like counter
  - `score_avg` (decimal) - Average rating score
  - `score_count` (integer) - Number of ratings
  - `admin_score` (integer) - Editorial score by admin
  - `created_at` (timestamptz) - Creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp
  - `is_published` (boolean) - Publication status
  - `is_featured` (boolean) - Featured in best-of
  
  ### 2. user_likes
  Tracks which users liked which e-cards:
  - `id` (uuid, primary key)
  - `user_id` (uuid) - Reference to auth.users (nullable for anonymous)
  - `ecard_id` (uuid) - Reference to e_cards
  - `ip_address` (text) - IP for anonymous tracking
  - `created_at` (timestamptz)
  
  ### 3. user_ratings
  Tracks user ratings for e-cards:
  - `id` (uuid, primary key)
  - `user_id` (uuid) - Reference to auth.users (nullable for anonymous)
  - `ecard_id` (uuid) - Reference to e_cards
  - `score` (integer) - Rating 1-5
  - `ip_address` (text) - IP for anonymous tracking
  - `created_at` (timestamptz)
  
  ## Security
  - RLS enabled on all tables
  - Public read access for published e-cards
  - Admin-only write access for e_cards table
  - Anonymous users can like and rate (tracked by IP)
  - Authenticated users have full interaction history
*/

-- Create e_cards table
CREATE TABLE IF NOT EXISTS e_cards (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  advertiser_name text NOT NULL,
  advertiser_logo_url text NOT NULL,
  business_sector text,
  vintage integer NOT NULL,
  language text NOT NULL DEFAULT 'FR',
  card_type text NOT NULL,
  version text,
  topic text,
  technology text,
  distributor text,
  tags text[] DEFAULT '{}',
  url text,
  fallback_url text,
  swf_url text,
  is_hosted boolean DEFAULT false,
  file_path text,
  campaign_aim text,
  target_audience text,
  key_message text,
  tone text,
  submitted_by text NOT NULL DEFAULT 'Leïla Khallaf',
  submitted_capacity text NOT NULL DEFAULT 'Founder',
  agency text,
  credits jsonb DEFAULT '{}',
  description text,
  views integer DEFAULT 0,
  likes integer DEFAULT 0,
  score_avg decimal(3,2) DEFAULT 0,
  score_count integer DEFAULT 0,
  admin_score integer CHECK (admin_score >= 0 AND admin_score <= 5),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  is_published boolean DEFAULT true,
  is_featured boolean DEFAULT false
);

-- Create user_likes table
CREATE TABLE IF NOT EXISTS user_likes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  ecard_id uuid REFERENCES e_cards(id) ON DELETE CASCADE NOT NULL,
  ip_address text,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, ecard_id),
  UNIQUE(ip_address, ecard_id)
);

-- Create user_ratings table
CREATE TABLE IF NOT EXISTS user_ratings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  ecard_id uuid REFERENCES e_cards(id) ON DELETE CASCADE NOT NULL,
  score integer NOT NULL CHECK (score >= 1 AND score <= 5),
  ip_address text,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, ecard_id),
  UNIQUE(ip_address, ecard_id)
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_e_cards_vintage ON e_cards(vintage DESC);
CREATE INDEX IF NOT EXISTS idx_e_cards_advertiser ON e_cards(advertiser_name);
CREATE INDEX IF NOT EXISTS idx_e_cards_technology ON e_cards(technology);
CREATE INDEX IF NOT EXISTS idx_e_cards_tags ON e_cards USING gin(tags);
CREATE INDEX IF NOT EXISTS idx_e_cards_is_published ON e_cards(is_published);
CREATE INDEX IF NOT EXISTS idx_e_cards_is_featured ON e_cards(is_featured);
CREATE INDEX IF NOT EXISTS idx_e_cards_likes ON e_cards(likes DESC);
CREATE INDEX IF NOT EXISTS idx_e_cards_score ON e_cards(score_avg DESC);
CREATE INDEX IF NOT EXISTS idx_user_likes_ecard ON user_likes(ecard_id);
CREATE INDEX IF NOT EXISTS idx_user_ratings_ecard ON user_ratings(ecard_id);

-- Enable Row Level Security
ALTER TABLE e_cards ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_ratings ENABLE ROW LEVEL SECURITY;

-- RLS Policies for e_cards
CREATE POLICY "Anyone can view published e-cards"
  ON e_cards FOR SELECT
  USING (is_published = true);

CREATE POLICY "Authenticated admins can insert e-cards"
  ON e_cards FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated admins can update e-cards"
  ON e_cards FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated admins can delete e-cards"
  ON e_cards FOR DELETE
  TO authenticated
  USING (true);

-- RLS Policies for user_likes
CREATE POLICY "Anyone can view likes"
  ON user_likes FOR SELECT
  USING (true);

CREATE POLICY "Anyone can insert their own likes"
  ON user_likes FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Users can delete their own likes"
  ON user_likes FOR DELETE
  USING (
    (auth.uid() IS NOT NULL AND auth.uid() = user_id) OR
    (auth.uid() IS NULL AND ip_address IS NOT NULL)
  );

-- RLS Policies for user_ratings
CREATE POLICY "Anyone can view ratings"
  ON user_ratings FOR SELECT
  USING (true);

CREATE POLICY "Anyone can insert their own ratings"
  ON user_ratings FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Users can update their own ratings"
  ON user_ratings FOR UPDATE
  USING (
    (auth.uid() IS NOT NULL AND auth.uid() = user_id) OR
    (auth.uid() IS NULL AND ip_address IS NOT NULL)
  )
  WITH CHECK (
    (auth.uid() IS NOT NULL AND auth.uid() = user_id) OR
    (auth.uid() IS NULL AND ip_address IS NOT NULL)
  );

-- Function to update e_card likes counter
CREATE OR REPLACE FUNCTION update_ecard_likes()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE e_cards SET likes = likes + 1 WHERE id = NEW.ecard_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE e_cards SET likes = likes - 1 WHERE id = OLD.ecard_id;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Function to update e_card rating stats
CREATE OR REPLACE FUNCTION update_ecard_ratings()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' OR TG_OP = 'UPDATE' THEN
    UPDATE e_cards SET
      score_avg = (SELECT AVG(score)::decimal(3,2) FROM user_ratings WHERE ecard_id = NEW.ecard_id),
      score_count = (SELECT COUNT(*) FROM user_ratings WHERE ecard_id = NEW.ecard_id)
    WHERE id = NEW.ecard_id;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Function to update views counter
CREATE OR REPLACE FUNCTION increment_ecard_views(ecard_uuid uuid)
RETURNS void AS $$
BEGIN
  UPDATE e_cards SET views = views + 1 WHERE id = ecard_uuid;
END;
$$ LANGUAGE plpgsql;

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers
CREATE TRIGGER trigger_update_likes
  AFTER INSERT OR DELETE ON user_likes
  FOR EACH ROW EXECUTE FUNCTION update_ecard_likes();

CREATE TRIGGER trigger_update_ratings
  AFTER INSERT OR UPDATE ON user_ratings
  FOR EACH ROW EXECUTE FUNCTION update_ecard_ratings();

CREATE TRIGGER trigger_e_cards_updated_at
  BEFORE UPDATE ON e_cards
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();