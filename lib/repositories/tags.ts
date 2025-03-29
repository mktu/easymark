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

export const isExistTag = async (supabase: SupabaseClient<Database>, { userId, name }: { userId: string, name: string }) => {
    const { data: tags, error: tagError } = await supabase.from('tags').select('*').eq('user_id', userId).ilike('name', name)
    if (tagError) {
        console.error(tagError)
        throw Error('could not check tag')
    }
    return { isExist: tags.length > 0 }
}

export const addTag = async (supabase: SupabaseClient<Database>, { userId, name }: { userId: string, name: string }) => {
    const { error: tagError, data } = await supabase.from('tags').insert({ user_id: userId, name }).select()
    if (tagError) {
        console.error(tagError)
        throw Error('could not add tag')
    }
    return { tag: convertTags(data)[0] }
}


export const deleteTag = async (supabase: SupabaseClient<Database>, tagId: number) => {
    const { error: tagError } = await supabase.from('tags').delete().eq('id', tagId)
    if (tagError) {
        console.error(tagError)
        throw Error('could not delete tag')
    }
}

export type TagType = ReturnType<typeof convertTags>[0]