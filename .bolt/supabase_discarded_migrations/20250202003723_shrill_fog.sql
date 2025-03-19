-- Create live_event_insider_list table
CREATE TABLE IF NOT EXISTS public.live_event_insider_list (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE,
    phone_number TEXT UNIQUE,
    source TEXT DEFAULT 'community_signup',
    created_at TIMESTAMPTZ DEFAULT timezone('utc', now()),
    CONSTRAINT contact_info_check CHECK (
        (email IS NOT NULL AND phone_number IS NULL) OR
        (email IS NULL AND phone_number IS NOT NULL)
    )
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

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_live_event_insider_list_email 
    ON public.live_event_insider_list(email)
    WHERE email IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_live_event_insider_list_phone 
    ON public.live_event_insider_list(phone_number)
    WHERE phone_number IS NOT NULL;