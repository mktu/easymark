import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "../supabase/schema";

const convertBookmarks = (bookmarks: Database['public']['Views']['bookmarks_with_ogp']['Row'][]) => {
    return bookmarks.map(bookmark => {
        return {
            bookmarkId: bookmark.bookmark_id!,
            categoryId: bookmark.category_id!,
            createdAt: bookmark.created_at!,
            userId: bookmark.user_id!,
            url: bookmark.url!,
            note: bookmark.note,
            ogpDescription: bookmark.ogp_description,
            ogpImage: bookmark.ogp_image,
            ogpTitle: bookmark.ogp_title,
            updatedAt: bookmark.updated_at,
        }
    })
}

export const fetchBookmarks = async (supabase: SupabaseClient<Database>, userId: string) => {
    const { data: bookmarksBase, error: bookmarkError } = await supabase.from('bookmarks_with_ogp').select('*').eq('user_id', userId).order('created_at', { ascending: false }).limit(5)
    if (bookmarkError) {
        console.error(bookmarkError)
        throw Error('cannot fetch bookmarks')
    }
    return convertBookmarks(bookmarksBase)
}

export type BookmarkType = ReturnType<typeof convertBookmarks>[0]