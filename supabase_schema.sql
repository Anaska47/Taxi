-- Database Schema for SAM TAXI Bookings
-- Create a table named 'bookings' in your Supabase project

CREATE TABLE IF NOT EXISTS public.bookings (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at timestamptz DEFAULT now(),
    name text NOT NULL,
    phone text NOT NULL,
    email text,
    pickup_address text NOT NULL,
    destination_address text NOT NULL,
    date date NOT NULL,
    time time NOT NULL,
    type text NOT NULL CHECK (type IN ('private', 'medical')),
    -- Medical specific
    is_round_trip boolean,
    -- Private specific
    passengers integer,
    comment text,
    status text DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled'))
);

-- Enable RLS (Row Level Security) if needed
-- For a lead generation form, you might want to allow public inserts only
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public inserts" ON public.bookings
FOR INSERT WITH CHECK (true);

-- Create a policy to allow authenticated users (admin) to view bookings
CREATE POLICY "Allow authenticated selects" ON public.bookings
FOR SELECT USING (auth.role() = 'authenticated');
