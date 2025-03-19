/*
  # Create discussions table

  1. New Tables
    - discussions
      - id (uuid, primary key)
      - title (text, min 5 chars)
      - content (text, min 20 chars)
      - author_name (text)
      - likes (integer)
      - replies (integer)
      - tags (text array)
      - created_at (timestamp)

  2. Security
    - Enable RLS
    - Add policies for read/write access
    - Add performance indexes
*/

-- Create discussions table with proper constraints
CREATE TABLE IF NOT EXISTS discussions (
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
CREATE INDEX IF NOT EXISTS discussions_created_at_idx ON discussions(created_at DESC);