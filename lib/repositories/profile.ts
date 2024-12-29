import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "../supabase/schema";

const convertUser = (user: Database['public']['Tables']['users']['Row']) => {
    return {
        userId: user.id!,
        username: user.username || '',
        imageUrll: user.profile_image_url,
        createdAt: user.created_at!,
    }
}

export const fetchUser = async (supabase: SupabaseClient<Database>, userId: string) => {
    const { data, error } = await supabase.from('users').select('*').eq('id', userId).limit(1)
    if (error) {
        console.error(error)
        throw Error('cannot fetch categories')
    }
    return convertUser(data[0])
}

export const upsertUser = async (supabase: SupabaseClient<Database>, userId: string, username: string, imageUrl: string | null) => {
    const { error } = await supabase.from('users').upsert({
        id: userId,
        username,
        profile_image_url: imageUrl
    })
    if (error) {
        console.error(error)
        throw Error('cannot update user')
    }
}

export type UserType = ReturnType<typeof convertUser>