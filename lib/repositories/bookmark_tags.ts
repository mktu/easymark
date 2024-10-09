import { SupabaseClient } from "@supabase/supabase-js"
import { Database } from "../supabase/schema"


const convertTagUsage = (data: Database['public']['Views']['bookmarks_with_tags']['Row'][]) => {
    return data.reduce((acc, v) => {
        const tags = v.tags as { id: number | null, name: string | null }[]
        console.log(tags)
        acc[v.id!] = tags.filter(tag => !!tag.id).map(tag => {
            return {
                id: tag.id!,
                name: tag.name!
            }
        })
        return acc
    }, {} as { [key: number]: { id: number, name: string }[] })
}


export const fetchBookmarkTags = async (supabase: SupabaseClient<Database>, { userId }: { userId: string }) => {
    const { data, error } = await supabase
        .from('bookmarks_with_tags')
        .select('*').eq('user_id', userId)
    if (error) {
        console.error(error)
        return { error: 'cannot fetch bookmark-tags' }
    }
    return convertTagUsage(data)
}

export type BookmarkTagsType = ReturnType<typeof convertTagUsage>