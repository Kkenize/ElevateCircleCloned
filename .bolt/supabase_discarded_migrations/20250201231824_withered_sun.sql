-- Step 1: Drop the existing discussions table if it exists
DROP TABLE IF EXISTS public.discussions CASCADE;

-- Step 2: Create the discussions table
CREATE TABLE public.discussions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    author_name TEXT NOT NULL,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT timezone('utc', now()),
    flagged BOOLEAN DEFAULT FALSE,
    likes INTEGER DEFAULT 0
);

-- Step 3: Enable Row-Level Security
ALTER TABLE public.discussions ENABLE ROW LEVEL SECURITY;

-- Step 4: Add RLS policy to allow insert/select for all users
CREATE POLICY "Allow all users to read discussions"
    ON public.discussions
    FOR SELECT
    USING (true);

CREATE POLICY "Allow all users to insert discussions"
    ON public.discussions
    FOR INSERT
    WITH CHECK (true);

-- Step 5: Create index for faster fetching
CREATE INDEX IF NOT EXISTS idx_discussions_created_at ON public.discussions (created_at DESC);