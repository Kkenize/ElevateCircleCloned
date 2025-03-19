/*
  # Create email subscribers table

  1. New Tables
    - `email_subscribers`
      - `id` (uuid, primary key)
      - `email` (text, unique) - Stores either email or phone number
      - `created_at` (timestamptz)
      - `source` (text) - Where the subscription came from

  2. Security
    - Enable RLS on `email_subscribers` table
    - Add policies for:
      - Anyone can insert their email
      - Only authenticated users can view emails
*/

CREATE TABLE IF NOT EXISTS email_subscribers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now(),
  source text DEFAULT 'popup'
);

ALTER TABLE email_subscribers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can add their email"
  ON email_subscribers
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Only authenticated users can view emails"
  ON email_subscribers
  FOR SELECT
  TO authenticated
  USING (true);