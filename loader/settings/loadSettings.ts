'use server'
import { getApiKeys } from '@/lib/repositories/api_key';
import { createClientForServer } from '@/lib/supabase/supabaseServer';

export async function loadSettings() {
    const supabase = await createClientForServer()
    const { data } = await supabase.auth.getUser()
    if (!data?.user) {
        throw new Error('User not authenticated')
    }
    const apiKeys = await getApiKeys(data.user.id, supabase)
    return {
        authUser: data.user,
        apiKeys
    }
}