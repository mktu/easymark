import { SupabaseClient } from "@supabase/supabase-js"
import { Database } from "../supabase/schema"

const convertTags = (tags: Database['public']['Tables']['tags']['Row'][]) => {
    return tags.map(tag => {
        return {
            tagId: tag.id,
            userId: tag.user_id,
            name: tag.name,
            createdAt: tag.created_at,
            updatedAt: tag.updated_at
        }
    })
}

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

export const fetchTags = async (supabase: SupabaseClient<Database>, userId: string) => {
    const { data: tagBase, error: bookmarkError } = await supabase.from('tags').select('*').eq('user_id', userId)
    if (bookmarkError) {
        console.error(bookmarkError)
        throw Error('cannot fetch bookmarks')
    }
    return convertTags(tagBase)
}

export const isExistTag = async (supabase: SupabaseClient<Database>, { userId, name }: { userId: string, name: string }) => {
    const { data: tags, error: tagError } = await supabase.from('tags').select('*').eq('user_id', userId).ilike('name', name)
    if (tagError) {
        console.error(tagError)
        return { error: 'cannot fetch tag' }
    }
    return { isExist: tags.length > 0 }
}

export const addTag = async (supabase: SupabaseClient<Database>, { userId, name }: { userId: string, name: string }) => {

    const { error: tagError } = await supabase.from('tags').insert({ user_id: userId, name })
    if (tagError) {
        console.error(tagError)
        return { error: 'cannot add tag' }
    }
    return { error: null }
}

export const associateTags = async (supabase: SupabaseClient<Database>, data: { tagId: number, bookmarkId: number }[]) => {
    const { error: tagError } = await supabase.from('tag_mappings').insert(data.map(v => ({ tag_id: v.tagId, bookmark_id: v.bookmarkId })))
    if (tagError) {
        console.error(tagError)
        return { error: 'cannot associate tags' }
    }
    return { error: null }
}

export const addTags = async (supabase: SupabaseClient<Database>, tags: { userId: string, name: string }[]) => {
    const { error: tagError, data } = await supabase.from('tags').insert(tags.map(v => ({ user_id: v.userId, name: v.name }))).select()
    if (tagError) {
        console.error(tagError)
        return { error: 'cannot add tags' }
    }
    return { error: null, tags: convertTags(data) }
}

export const searchTags = async (supabase: SupabaseClient<Database>, { userId, name }: { userId: string, name: string }) => {
    const { data: tags, error: tagError } = await supabase.from('tags').select('*').eq('user_id', userId).ilike('name', `%${name}%`)
    if (tagError) {
        console.error(tagError)
        return { error: 'cannot fetch tag' }
    }
    return convertTags(tags)
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


export const deleteTag = async (supabase: SupabaseClient<Database>, tagId: number) => {
    const { error: tagError } = await supabase.from('tags').delete().eq('id', tagId)
    if (tagError) {
        console.error(tagError)
        return { error: 'cannot delete tag' }
    }
    return { error: null }
}

export type TagUsageType = ReturnType<typeof convertTagUsage>[0]

export type TagType = ReturnType<typeof convertTags>[0]