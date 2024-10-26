import { SupabaseClient } from "@supabase/supabase-js"
import { Database } from "../supabase/schema"

export const associateTags = async (supabase: SupabaseClient<Database>, data: { tagId: number, bookmarkId: number }[]) => {
    const { error: tagError } = await supabase.from('tag_mappings').insert(data.map(v => ({ tag_id: v.tagId, bookmark_id: v.bookmarkId })))
    if (tagError) {
        console.error(tagError)
        return { error: 'cannot associate tags' }
    }
    return { error: null }
}

export const getTagMappings = async (supabase: SupabaseClient<Database>, bookmarkId: number) => {
    const { data, error: tagError } = await supabase.from('tag_mappings').select('*').eq('bookmark_id', bookmarkId)
    if (tagError) {
        console.error(tagError)
        return { error: 'cannot fetch tag' }
    }
    return data
}

export const removeTagsFromBookmarks = async (supabase: SupabaseClient<Database>, bookmarkIds: number[]) => {
    const { error: tagError } = await supabase.from('tag_mappings').delete().in('bookmark_id', bookmarkIds)
    if (tagError) {
        console.error(tagError)
        return { error: 'cannot remove tags' }
    }
    return { error: null }
}

export const removeTags = async (supabase: SupabaseClient<Database>, data: { bookmarkId: number }) => {
    const { error: tagError } = await supabase.from('tag_mappings').delete().eq('bookmark_id', data.bookmarkId)
    if (tagError) {
        console.error(tagError)
        return { error: 'cannot remove tags' }
    }
    return { error: null }
}
