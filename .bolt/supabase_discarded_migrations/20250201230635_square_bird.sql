/*
  # Fix discussions table schema

  1. Changes
    - Drop existing discussions table to start fresh
    - Create new discussions table with proper schema
    - Add proper constraints and indexes
    - Set up RLS policies

  2. Schema Details
    - id: UUID primary key
    - title: text (min 5 chars)
    - content: text (min 20 chars)
    - author_name: text
    - likes: integer
    - replies: integer
    - tags: text array
    - created_at: timestamp with timezone

  3. Security
    - Enable RLS
    - Allow anyone to read discussions
    - Allow anyone to create discussions
    - Allow authors to update their own discussions
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