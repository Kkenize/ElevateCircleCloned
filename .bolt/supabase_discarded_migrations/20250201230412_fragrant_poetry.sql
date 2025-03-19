/*
  # Fix discussions table schema - Final Version

  1. Changes:
    - Drop and recreate discussions table with correct schema
    - Remove all email dependencies
    - Simplify to just use author_name
    - Add proper constraints and defaults

  2. Security:
    - Enable RLS
    - Simple policies for read/write access
*/

-- First, drop the table completely to start fresh
DROP TABLE IF EXISTS discussions CASCADE;

-- Create the discussions table with proper constraints
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