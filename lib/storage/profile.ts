import { SupabaseClient } from "../supabase/supabaseServer"

export const uploadImage = async (image: File, userId: string, supabase: SupabaseClient) => {
    const filePath = `users/${userId}`
    const { error } = await supabase.storage.from('user_profiles').upload(filePath, image)
    if (error) {
        console.error(error)
        throw Error('Failed to upload image')
    }
    // 画像のURLを取得
    const { data } = supabase.storage.from('user_profiles').getPublicUrl(filePath)
    return {
        imageUrl: data.publicUrl
    }
}