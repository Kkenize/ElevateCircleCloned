/*
  # Fix Like Functions

  1. Changes
    - Drop and recreate increment functions with proper schema and permissions
    - Ensure functions are created in public schema
    - Grant proper execute permissions

  2. Security
    - Functions are marked as SECURITY DEFINER to run with elevated privileges
    - Execute permissions granted to anonymous users
*/

-- Drop existing functions if they exist
DROP FUNCTION IF EXISTS public.increment_discussion_likes(UUID);
DROP FUNCTION IF EXISTS public.increment_reply_likes(UUID);

-- Create stored procedure for incrementing discussion likes
CREATE OR REPLACE FUNCTION public.increment_discussion_likes(discussion_id UUID)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    UPDATE discussions
    SET likes = likes + 1
    WHERE id = discussion_id;
END;
$$;

-- Create stored procedure for incrementing reply likes
CREATE OR REPLACE FUNCTION public.increment_reply_likes(reply_id UUID)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    UPDATE discussion_replies
    SET likes = likes + 1
    WHERE id = reply_id;
END;
$$;

-- Grant execute permissions to anonymous users
GRANT EXECUTE ON FUNCTION public.increment_discussion_likes(UUID) TO anon;
GRANT EXECUTE ON FUNCTION public.increment_reply_likes(UUID) TO anon;

-- Ensure tables exist and have proper permissions
DO $$ 
BEGIN
    -- Ensure discussions table exists
    IF NOT EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'discussions') THEN
        CREATE TABLE public.discussions (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            author_name TEXT NOT NULL,
            title TEXT NOT NULL,
            content TEXT NOT NULL,
            created_at TIMESTAMPTZ DEFAULT timezone('utc', now()),
            flagged BOOLEAN DEFAULT FALSE,
            likes INTEGER DEFAULT 0
        );
        
        ALTER TABLE public.discussions ENABLE ROW LEVEL SECURITY;
        
        CREATE POLICY "Anyone can read discussions"
            ON public.discussions FOR SELECT
            TO anon
            USING (true);
            
        CREATE POLICY "Anyone can create discussions"
            ON public.discussions FOR INSERT
            TO anon
            WITH CHECK (true);
    END IF;

    -- Ensure discussion_replies table exists
    IF NOT EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'discussion_replies') THEN
        CREATE TABLE public.discussion_replies (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            discussion_id UUID REFERENCES public.discussions(id) ON DELETE CASCADE,
            author_name TEXT NOT NULL,
            content TEXT NOT NULL CHECK (length(trim(content)) >= 5),
            likes INTEGER DEFAULT 0,
            created_at TIMESTAMPTZ DEFAULT timezone('utc', now())
        );
        
        ALTER TABLE public.discussion_replies ENABLE ROW LEVEL SECURITY;
        
        CREATE POLICY "Anyone can read discussion replies"
            ON public.discussion_replies FOR SELECT
            TO anon
            USING (true);
            
        CREATE POLICY "Anyone can create discussion replies"
            ON public.discussion_replies FOR INSERT
            TO anon
            WITH CHECK (true);
    END IF;
END $$;