import { createBrowserClient } from '@supabase/ssr';
import { Database } from './schema';

export function createClientForBrowser() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl) {
        throw Error('supabaseUrl is not defained')
    }
    if (!supabaseAnonKey) {
        throw Error('supabaseAnonKey is not defained')
    }
    return createBrowserClient<Database>(
        supabaseUrl,
        supabaseAnonKey
    )
}