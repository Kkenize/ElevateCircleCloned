/*
  # Create new discussions and contacts schema
  
  1. New Tables
    - `contacts`
      - `id` (uuid, primary key)
      - `email` (text, unique)
      - `phone_number` (text, unique) 
      - `created_at` (timestamptz)
    
    - `discussions`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references contacts)
      - `title` (text)
      - `content` (text)
      - `created_at` (timestamptz)
      - `flagged` (boolean)
      - `likes` (integer)

  2. Security
    - Enable RLS
    - Add appropriate policies
*/

-- Create contacts table
CREATE TABLE IF NOT EXISTS public.contacts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE,
    phone_number TEXT UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now())
);

-- Create discussions table
CREATE TABLE IF NOT EXISTS public.discussions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.contacts(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now()),
    flagged BOOLEAN DEFAULT FALSE,
    likes INTEGER DEFAULT 0
);

-- Enable RLS
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.discussions ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Anyone can read discussions"
  ON public.discussions
  FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Authenticated users can create discussions"
  ON public.discussions
  FOR INSERT
  TO authenticated
  WITH CHECK (true);