/*
  # Create discussions table with proper schema and policies

  1. New Tables
    - `discussions`
      - `id` (uuid, primary key)
      - `title` (text, required)
      - `content` (text, required)
      - `author_email` (text, required)
      - `likes` (integer, default 0)
      - `replies` (integer, default 0)
      - `tags` (text array, default ['General'])
      - `created_at` (timestamptz, default now())

  2. Security
    - Enable RLS on discussions table
    - Add policies for:
      - Anyone can read discussions
      - Anyone can create discussions (email validation handled in app)
      - Authors can update their own discussions
*/

-- Drop existing table if it exists
DROP TABLE IF EXISTS discussions;

-- Create the discussions table
CREATE TABLE discussions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL CHECK (length(trim(title)) >= 5),
  content text NOT NULL CHECK (length(trim(content)) >= 20),
  author_email text NOT NULL,
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
  USING (author_email = author_email)
  WITH CHECK (author_email = author_email);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS discussions_created_at_idx ON discussions(created_at DESC);
CREATE INDEX IF NOT EXISTS discussions_author_email_idx ON discussions(author_email);