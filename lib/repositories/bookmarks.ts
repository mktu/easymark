import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "../supabase/schema";

export type RawBookmarkType = Database['public']['Views']['bookmarks_with_ogp']['Row']

const convertBookmarks = (bookmarks: RawBookmarkType[]) => {
    return bookmarks.map(convertBookmark)
}

export const convertBookmark = (bookmark: RawBookmarkType) => {
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
}

export const addBookmark = async (supabase: SupabaseClient<Database>, {
    url,
    userId,
    note
}: {
    url: string,
    userId: string,
    note?: string
}) => {
    const { error: bookmarkerror } = await supabase.from('bookmarks').insert({ url, user_id: userId, note })
    if (bookmarkerror) {
        console.error(bookmarkerror)
        if (bookmarkerror.code === '23505') {
            return { error: 'already bookmarked' }
        }
        return { error: 'cannnot add bookmark' }
    }
    return { error: null }
}

export const updateBookmark = async (supabase: SupabaseClient<Database>, {
    url,
    userId,
    note
}: {
    url: string,
    userId: string,
    note?: string
}) => {
    const { error: bookmarkerror } = await supabase.from('bookmarks').update({ url, note, user_id: userId }).eq('url', url).eq('user_id', userId);
    if (bookmarkerror) {
        console.error(bookmarkerror)
        return { error: 'cannnot update bookmark' }
    }
    return { error: null }
}

export const deleteBookmark = async (supabase: SupabaseClient<Database>, {
    bookmarkId,
    userId
}: {
    bookmarkId: number,
    userId: string
}) => {
    const { error: bookmarkerror } = await supabase.from('bookmarks').delete().eq('id', bookmarkId).eq('user_id', userId);
    if (bookmarkerror) {
        console.error(bookmarkerror)
        return { error: 'cannnot delete bookmark' }
    }
    return { error: null }
}


export const fetchBookmarks = async (supabase: SupabaseClient<Database>, userId: string) => {
    const { data: bookmarksBase, error: bookmarkError } = await supabase.from('bookmarks_with_ogp').select('*').eq('user_id', userId).order('created_at', { ascending: false }).limit(5)
    if (bookmarkError) {
        console.error(bookmarkError)
        throw Error('cannot fetch bookmarks')
    }
    return convertBookmarks(bookmarksBase)
}

export const fetchBookmark = async (supabase: SupabaseClient<Database>, userId: string, bookmarkId: number) => {
    const { data: bookmarksBase, error: bookmarkError } = await supabase.from('bookmarks_with_ogp').select('*').eq('user_id', userId).eq('bookmark_id', bookmarkId)
    if (bookmarkError) {
        console.error(bookmarkError)
        throw Error('cannot fetch bookmarks')
    }
    return convertBookmark(bookmarksBase[0])
}

export type BookmarkType = ReturnType<typeof convertBookmarks>[0]