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
    // get user from supabase's users table where id = data.user.id
    const res = await supabase.from('users').select('*').eq('id', data.user.id)
    if (res.error) {
        console.error(res.error)
        throw new Error('Failed to load user')
    }
    if (res.data?.length === 0) {
        throw new Error('User not found')
    }
    if (res.data?.length > 1) {
        throw new Error('Multiple users found')
    }

    return {
        authUser: data.user,
        user: res.data[0]
    }
}