'use server'

import { createClientForServer } from "@/lib/supabase/supabaseServer";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const handleGoogleSignin = async () => {
    const supabase = createClientForServer()
    // todo https://supabase.com/docs/guides/auth/redirect-urls
    const origin = headers().get('origin');
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
            queryParams: {
                access_type: 'offline',
                prompt: 'consent',
            },
            redirectTo: `${origin}/auth/callback`,
        },
    })
    if (error) {
        console.log('error occurred', error)
        return { error: error.message }
    }

    if (data.url) {
        redirect(data.url) // use the redirect API for your server framework
    }

};