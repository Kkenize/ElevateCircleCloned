-- Create stored procedure for incrementing discussion likes
CREATE OR REPLACE FUNCTION public.increment_discussion_likes(discussion_id UUID)
RETURNS void AS $$
BEGIN
    UPDATE public.discussions
    SET likes = likes + 1
    WHERE id = discussion_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create stored procedure for incrementing reply likes
CREATE OR REPLACE FUNCTION public.increment_reply_likes(reply_id UUID)
RETURNS void AS $$
BEGIN
    UPDATE public.discussion_replies
    SET likes = likes + 1
    WHERE id = reply_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permissions to anonymous users
GRANT EXECUTE ON FUNCTION public.increment_discussion_likes(UUID) TO anon;
GRANT EXECUTE ON FUNCTION public.increment_reply_likes(UUID) TO anon;

-- Create discussion_replies table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.discussion_replies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    discussion_id UUID REFERENCES public.discussions(id) ON DELETE CASCADE,
    author_name TEXT NOT NULL,
    content TEXT NOT NULL CHECK (length(trim(content)) >= 5),
    likes INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT timezone('utc', now())
);

-- Enable RLS on discussion_replies
ALTER TABLE public.discussion_replies ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for discussion_replies
CREATE POLICY "Anyone can read discussion replies"
    ON public.discussion_replies
    FOR SELECT
    USING (true);

CREATE POLICY "Anyone can create discussion replies"
    ON public.discussion_replies
    FOR INSERT
    WITH CHECK (true);

-- Create index for faster fetching
CREATE INDEX IF NOT EXISTS idx_discussion_replies_discussion_id 
    ON public.discussion_replies(discussion_id);
CREATE INDEX IF NOT EXISTS idx_discussion_replies_created_at 
    ON public.discussion_replies(created_at DESC);