/*
  # Create discussions table

  1. New Tables
    - `discussions`
      - `id` (uuid, primary key)
      - `title` (text, required)
      - `content` (text, required)
      - `author_email` (text, required)
      - `likes` (integer)
      - `replies` (integer)
      - `tags` (text array)
      - `created_at` (timestamp with time zone)

  2. Security
    - Enable RLS on `discussions` table
    - Add policies for:
      - Anyone can read discussions
      - Only authenticated users can create discussions
      - Authors can update their own discussions
*/

CREATE TABLE IF NOT EXISTS discussions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text NOT NULL,
  author_email text NOT NULL,
  likes integer DEFAULT 0,
  replies integer DEFAULT 0,
  tags text[] DEFAULT ARRAY['General'],
  created_at timestamptz DEFAULT now()
);

ALTER TABLE discussions ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read discussions
CREATE POLICY "Anyone can read discussions"
  ON discussions
  FOR SELECT
  TO anon
  USING (true);

-- Allow authenticated users to create discussions
CREATE POLICY "Authenticated users can create discussions"
  ON discussions
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Allow authors to update their own discussions
CREATE POLICY "Authors can update their own discussions"
  ON discussions
  FOR UPDATE
  TO authenticated
  USING (author_email = current_user)
  WITH CHECK (author_email = current_user);