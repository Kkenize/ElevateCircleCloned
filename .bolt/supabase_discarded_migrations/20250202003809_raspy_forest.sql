-- Drop existing table if it exists
DROP TABLE IF EXISTS public.live_event_insider_list;

-- Create live_event_insider_list table with contact_info column
CREATE TABLE public.live_event_insider_list (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    contact_info TEXT UNIQUE NOT NULL,
    contact_type TEXT NOT NULL CHECK (contact_type IN ('email', 'phone')),
    source TEXT DEFAULT 'community_signup',
    created_at TIMESTAMPTZ DEFAULT timezone('utc', now())
);

-- Enable Row Level Security
ALTER TABLE public.live_event_insider_list ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Anyone can add their contact info"
    ON public.live_event_insider_list
    FOR INSERT
    TO anon
    WITH CHECK (true);

CREATE POLICY "Only authenticated users can view contacts"
    ON public.live_event_insider_list
    FOR SELECT
    TO authenticated
    USING (true);

-- Create index for better performance
CREATE INDEX idx_live_event_insider_list_contact 
    ON public.live_event_insider_list(contact_info);