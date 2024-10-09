import { SupabaseClient } from "@supabase/supabase-js"
import { Database } from "../supabase/schema"

const convertTagUsage = (tags: Database['public']['Views']['tag_usage']['Row'][]) => {
    return tags.filter(v => v.tag_id && v.tag_name).map(tag => {
        return {
            tagId: tag.tag_id!,
            userId: tag.user_id,
            name: tag.tag_name!,
            count: tag.bookmark_count
        }
    })
}

export const searchTagUsage = async (supabase: SupabaseClient<Database>, { userId, name, limit }: { userId: string, name: string, limit: number }) => {
    const { data: tags, error: tagError } = await supabase.from('tag_usage').select('*').eq('user_id', userId).ilike('tag_name', `%${name}%`).limit(limit)
    if (tagError) {
        console.error(tagError)
        return { error: 'cannot fetch tag' }
    }
    return convertTagUsage(tags)
}

export const fetchTagUsage = async (supabase: SupabaseClient<Database>, userId: string, limit: number) => {
    const { data: tags, error: tagError } = await supabase.from('tag_usage').select('*').eq('user_id', userId).limit(limit)
    if (tagError) {
        console.error(tagError)
        return { error: 'cannot fetch tag' }
    }
    return convertTagUsage(tags)
}

export const fetchTagUsageByBookmarkId = async (supabase: SupabaseClient<Database>, userId: string, bookmarkId: number) => {
    const tagMappings = await supabase.from('tag_mappings').select('tag_id').eq('bookmark_id', bookmarkId)
    if (tagMappings.error) {
        return { error: 'cannot fetch tag' }
    }
    const { data: tags, error: tagError } = await supabase.from('tag_usage').select('*').eq('user_id', userId).in('tag_id', tagMappings.data.map(v => v.tag_id))
    if (tagError) {
        console.error(tagError)
        return { error: 'cannot fetch tag' }
    }
    return convertTagUsage(tags)
}

export type TagUsageType = ReturnType<typeof convertTagUsage>[0]