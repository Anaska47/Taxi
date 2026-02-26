import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Strict URL check to avoid fatal crash from Supabase library
const isValidUrl = (url: string) => {
    try {
        return url.startsWith('http');
    } catch {
        return false;
    }
};

const isConfigured = isValidUrl(supabaseUrl) && supabaseAnonKey && !supabaseUrl.includes('YOUR_');

if (!isConfigured) {
    console.warn('Supabase is not correctly configured. Booking features will be disabled.');
}

export const supabase = isConfigured
    ? createClient(supabaseUrl, supabaseAnonKey)
    : {
        from: () => ({
            insert: async () => ({ error: new Error('Supabase client is not configured. Please check your environment variables.') }),
            select: () => ({
                order: () => ({ data: [], error: null }),
                data: [],
                error: null
            })
        })
    } as any;
