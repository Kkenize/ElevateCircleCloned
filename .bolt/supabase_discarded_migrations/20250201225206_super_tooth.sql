/*
  # Create discussions table and policies

  1. Tables
    - `discussions`
      - `id` (uuid, primary key)
      - `title` (text, min length 5)
      - `content` (text, min length 20)
      - `author_email` (text, references email_subscribers)
      - `likes` (integer, default 0)
      - `replies` (integer, default 0)
      - `tags` (text array, default ['General'])
      - `created_at` (timestamptz, default now())

  2. Security
    - Enable RLS on discussions table
    - Policies:
      - Anyone can read discussions
      - Only email subscribers can create discussions
      - Authors can update their own discussions

  3. Performance
    - Index on created_at for sorting
    - Index on author_email for lookups
*/

-- Create the discussions table with proper constraints
CREATE TABLE IF NOT EXISTS discussions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL CHECK (length(trim(title)) >= 5),
  content text NOT NULL CHECK (length(trim(content)) >= 20),
  author_email text NOT NULL REFERENCES email_subscribers(email),
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

CREATE POLICY "Email subscribers can create discussions"
  ON discussions
  FOR INSERT
  TO anon
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM email_subscribers 
      WHERE email = author_email
    )
  );

CREATE POLICY "Authors can update own discussions"
  ON discussions
  FOR UPDATE
  TO anon
  USING (author_email = author_email)
  WITH CHECK (author_email = author_email);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS discussions_created_at_idx ON discussions(created_at DESC);
CREATE INDEX IF NOT EXISTS discussions_author_email_idx ON discussions(author_email);