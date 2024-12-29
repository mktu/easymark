'use server'
import { getApiKeys } from '@/lib/repositories/api_key';
import { fetchUser } from '@/lib/repositories/profile';
import { createClientForServer } from '@/lib/supabase/supabaseServer';

export async function loadAuthData() {
    const supabase = createClientForServer()
    const { data } = await supabase.auth.getUser()
    if (!data?.user) {
        throw new Error('User not authenticated')
    }
    return {
        authUser: data.user
    }
}

export async function loadProfile() {
    const supabase = createClientForServer()
    const { data } = await supabase.auth.getUser()
    if (!data?.user) {
        throw new Error('User not authenticated')
    }
    const user = await fetchUser(supabase, data.user.id)
    const apiKeys = await getApiKeys(data.user.id, supabase)
    return {
        authUser: data.user,
        user,
        apiKeys
    }
}