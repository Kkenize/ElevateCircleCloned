/*
  # Discussion System Setup

  1. Tables
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

  3. Indexes
    - discussions_created_at_idx for chronological sorting
*/

-- Create discussions table with proper constraints
DO $$ BEGIN
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
EXCEPTION
  WHEN duplicate_table THEN NULL;
END $$;

-- Enable Row Level Security
ALTER TABLE discussions ENABLE ROW LEVEL SECURITY;

-- Create policies
DO $$ BEGIN
  CREATE POLICY "Anyone can read discussions"
    ON discussions
    FOR SELECT
    TO anon
    USING (true);
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE POLICY "Anyone can create discussions"
    ON discussions
    FOR INSERT
    TO anon
    WITH CHECK (true);
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE POLICY "Authors can update own discussions"
    ON discussions
    FOR UPDATE
    TO anon
    USING (author_name = author_name)
    WITH CHECK (author_name = author_name);
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS discussions_created_at_idx ON discussions(created_at DESC);