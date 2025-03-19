/*
  # Email subscribers table and policies

  1. New Tables
    - `email_subscribers`
      - `id` (uuid, primary key)
      - `email` (text, unique)
      - `created_at` (timestamptz)
      - `source` (text)

  2. Security
    - Enable RLS on `email_subscribers` table
    - Add policy for anonymous users to insert emails
    - Add policy for authenticated users to view emails
*/

-- Create the table if it doesn't exist
CREATE TABLE IF NOT EXISTS email_subscribers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now(),
  source text DEFAULT 'popup'
);

-- Enable RLS
ALTER TABLE email_subscribers ENABLE ROW LEVEL SECURITY;

-- Create insert policy if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'email_subscribers' 
    AND policyname = 'Anyone can add their email'
  ) THEN
    CREATE POLICY "Anyone can add their email"
      ON email_subscribers
      FOR INSERT
      TO anon
      WITH CHECK (true);
  END IF;
END $$;

-- Create select policy if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'email_subscribers' 
    AND policyname = 'Only authenticated users can view emails'
  ) THEN
    CREATE POLICY "Only authenticated users can view emails"
      ON email_subscribers
      FOR SELECT
      TO authenticated
      USING (true);
  END IF;
END $$;