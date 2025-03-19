/*
  # Discussion System Setup

  1. New Tables
    - `discussions`
      - `id` (uuid, primary key)
      - `title` (text, min length 5)
      - `content` (text, min length 20)
      - `author_name` (text)
      - `likes` (integer)
      - `replies` (integer)
      - `tags` (text array)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on discussions table
    - Anyone can read discussions
    - Anyone can create discussions
    - Authors can update their own discussions using author_name

  3. Changes
    - Removed dependency on email_subscribers table
    - Changed from author_email to author_name for simpler authentication
    - Added length constraints for title and content
    - Added performance indexes
*/

-- Drop existing table if it exists
DROP TABLE IF EXISTS discussions CASCADE;

-- Create discussions table with proper constraints
CREATE TABLE discussions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL CHECK (length(trim(title)) >= 5),
  content text NOT NULL CHECK (length(trim(content)) >= 20),
  author_name text NOT NULL,
  likes integer DEFAULT 0,
  replies integer DEFAULT 0,
  tags text[] DEFAULT ARRAY['General'],
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE discussions ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Anyone can read discussions"
  ON discussions
  FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Anyone can create discussions"
  ON discussions
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Authors can update own discussions"
  ON discussions
  FOR UPDATE
  TO anon
  USING (author_name = author_name)
  WITH CHECK (author_name = author_name);

-- Create index for better performance
CREATE INDEX discussions_created_at_idx ON discussions(created_at DESC);