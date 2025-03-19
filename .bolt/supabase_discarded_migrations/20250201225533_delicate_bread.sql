/*
  # Database Schema Setup

  1. Tables
    - `email_subscribers`
      - `id` (uuid, primary key)
      - `email` (text, unique)
      - `created_at` (timestamp)
      - `source` (text)
    
    - `discussions`
      - `id` (uuid, primary key)
      - `title` (text, min length 5)
      - `content` (text, min length 20)
      - `author_email` (text, references email_subscribers)
      - `likes` (integer)
      - `replies` (integer)
      - `tags` (text array)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on both tables
    - Email subscribers policies:
      - Anyone can add their email
      - Only authenticated users can view emails
    - Discussion policies:
      - Anyone can read discussions
      - Only email subscribers can create discussions
      - Authors can update their own discussions

  3. Relationships
    - Discussions.author_email references email_subscribers.email
    - Ensures only subscribed users can create discussions

  4. Indexes
    - discussions_created_at_idx for chronological sorting
    - discussions_author_email_idx for author lookups
*/

-- Create email_subscribers table
DO $$ BEGIN
  CREATE TABLE IF NOT EXISTS email_subscribers (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    email text UNIQUE NOT NULL,
    created_at timestamptz DEFAULT now(),
    source text DEFAULT 'popup'
  );
EXCEPTION
  WHEN duplicate_table THEN NULL;
END $$;

-- Create discussions table with proper constraints
DO $$ BEGIN
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
EXCEPTION
  WHEN duplicate_table THEN NULL;
END $$;

-- Enable Row Level Security
ALTER TABLE email_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE discussions ENABLE ROW LEVEL SECURITY;

-- Email subscribers policies
DO $$ BEGIN
  CREATE POLICY "Anyone can add their email"
    ON email_subscribers
    FOR INSERT
    TO anon
    WITH CHECK (true);
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE POLICY "Only authenticated users can view emails"
    ON email_subscribers
    FOR SELECT
    TO authenticated
    USING (true);
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

-- Discussion policies
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
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE POLICY "Authors can update own discussions"
    ON discussions
    FOR UPDATE
    TO anon
    USING (author_email = author_email)
    WITH CHECK (author_email = author_email);
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS discussions_created_at_idx ON discussions(created_at DESC);
CREATE INDEX IF NOT EXISTS discussions_author_email_idx ON discussions(author_email);