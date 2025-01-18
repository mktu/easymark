'use server'

import { createClientForServer } from "@/lib/supabase/supabaseServer";
import { getSiteUrl } from "@/lib/utils";
import { redirect } from "next/navigation";

export const handleGoogleSignin = async () => {
    const supabase = await createClientForServer()
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
            queryParams: {
                access_type: 'offline',
                prompt: 'consent',
            },
            redirectTo: `${getSiteUrl()}/auth/callback`,
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