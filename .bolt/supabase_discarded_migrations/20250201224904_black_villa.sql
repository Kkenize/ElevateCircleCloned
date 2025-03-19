/*
  # Create discussions table

  1. New Tables
    - `discussions`
      - `id` (uuid, primary key)
      - `title` (text, min length 5)
      - `content` (text, min length 20)
      - `author_email` (text)
      - `likes` (integer, default 0)
      - `replies` (integer, default 0)
      - `tags` (text[], default ['General'])
      - `created_at` (timestamptz, default now())

  2. Security
    - Enable RLS on discussions table
    - Add policies for:
      - Anyone can read discussions
      - Anyone can create discussions
      - Authors can update their own discussions

  3. Performance
    - Add indexes for created_at and author_email
*/

-- Create the discussions table with proper constraints
CREATE TABLE IF NOT EXISTS discussions (
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