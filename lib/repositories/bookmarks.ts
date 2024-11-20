import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "../supabase/schema";
import { BookmarkSortOption } from "../types";

export type RawBookmarkType = Database['public']['Views']['bookmarks_with_ogp']['Row']

export const convertBookmarks = (bookmarks: RawBookmarkType[]) => {
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
    note,
    categoryId
}: {
    url: string,
    userId: string,
    note?: string | null
    categoryId?: number | null
}) => {
    const { error: bookmarkerror } = await supabase.from('bookmarks').insert({ url, user_id: userId, note, category_id: categoryId })
    if (bookmarkerror) {
        console.error(bookmarkerror)
        if (bookmarkerror.code === '23505') {
            return { error: 'already bookmarked' }
        }
        return { error: 'cannnot add bookmark' }
    }
    return { error: null }
}

export const visitBookmark = async (supabase: SupabaseClient<Database>, {
    bookmarkId
}: {
    bookmarkId: number
}) => {
    const { error } = await supabase.rpc('update_bookmark_access', { input_bookmark_id: bookmarkId });
    if (error) {
        console.error(error)
        return { error: 'cannnot update bookmark' }
    }
    return { error: null }
}

export const updateBookmark = async (supabase: SupabaseClient<Database>, {
    url,
    userId,
    note,
    categoryId
}: {
    url: string,
    userId: string,
    note?: string | null,
    categoryId?: number | null
}) => {
    const { error: bookmarkerror, data } = await supabase.from('bookmarks').update({ url, note, user_id: userId, category_id: categoryId || null }).eq('url', url).eq('user_id', userId).select('id');
    if (bookmarkerror) {
        console.error(bookmarkerror)
        return { error: 'cannnot update bookmark' }
    }
    return { error: null, bookmarkId: data![0].id }
}

export const bulkUpdateCategory = async (supabase: SupabaseClient<Database>, {
    userId,
    bookmarkIds,
    categoryId
}: {
    userId: string,
    bookmarkIds: number[],
    categoryId: number
}) => {
    const { error: bookmarkerror } = await supabase.from('bookmarks').update({ category_id: categoryId }).in('id', bookmarkIds).eq('user_id', userId);
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

export const deleteBookmarks = async (supabase: SupabaseClient<Database>, {
    bookmarkIds
}: {
    bookmarkIds: number[]
}) => {
    const { error: bookmarkerror } = await supabase.from('bookmarks').delete().in('id', bookmarkIds);
    if (bookmarkerror) {
        console.error(bookmarkerror)
        return { error: 'cannnot delete bookmark' }
    }
    return { error: null }
}

const sortOptionMap = {
    'title': 'ogp_title',
    'date': 'created_at',
    'frequency': 'access_count'
}

export const searchBookmarks = async (supabase: SupabaseClient<Database>, {
    userId,
    page,
    limit,
    tags,
    filter,
    sortOption,
    category
}: {
    userId: string,
    page: number,
    limit: number,
    tags?: string[] | null,
    filter?: string[] | null,
    sortOption?: BookmarkSortOption,
    category?: string[] | null,
}) => {
    const filterString = filter ? filter.map(v => `%${v}%`) : null
    const data = await supabase.rpc('search_bookmarks', {
        input_user_id: userId,
        input_offset: page,
        input_limit: limit,
        input_tags: tags || null,
        input_title_keywords: filterString || null,
        input_sort_option: sortOptionMap[sortOption || 'date'],
        input_categories: category || null,
        input_ascending: sortOption === 'title' ? true : false
    })
    if (data.error) {
        console.error(data.error)
        throw Error('cannot fetch bookmarks')
    }
    return { bookmarks: convertBookmarks(data.data), count: data.data.length }
}

export const fetchBookmarksByPage = async (
    supabase: SupabaseClient<Database>,
    userId: string,
    page: number,
    limit: number,
    tags?: number[] | null,
    filter?: string,
    sortOption?: BookmarkSortOption,
    category?: number | null) => {
    const { data: tagData } = tags && tags.length > 0 ? await supabase.from('tag_mappings').select('bookmark_id').in('tag_id', tags || []) : { data: [] }
    const query = supabase.from('bookmarks_with_ogp').select('*').eq('user_id', userId);
    if (filter) {
        query.ilike('ogp_title', `%${filter}%`)
    }
    if (category) {
        query.eq('category_id', category)
    }
    if (tagData && tagData.length > 0) {
        query.in('bookmark_id', tagData.map(v => v.bookmark_id))
    }
    query.range(page * limit, (page * limit) + limit - 1);
    if (sortOption === 'date') {
        query.order('created_at', { ascending: false })
    }
    else if (sortOption === 'title') {
        query.order('ogp_title', { ascending: true })
    }
    else if (sortOption === 'frequency') {
        query.order('access_count', { ascending: false })
    }
    const { data: bookmarksBase, error: bookmarkError } = await query;
    if (bookmarkError) {
        console.error(bookmarkError)
        throw Error('cannot fetch bookmarks')
    }
    return { bookmarks: convertBookmarks(bookmarksBase), count: bookmarksBase.length }
}

export const fetchBookmark = async (supabase: SupabaseClient<Database>, userId: string, bookmarkId: number) => {
    const { data: bookmarksBase, error: bookmarkError } = await supabase.from('bookmarks_with_ogp').select('*').eq('user_id', userId).eq('bookmark_id', bookmarkId)
    if (bookmarkError) {
        console.error(bookmarkError)
        throw Error('cannot fetch bookmarks')
    }
    return convertBookmark(bookmarksBase[0])
}

export const fetchBookmarkById = async (supabase: SupabaseClient<Database>, userId: string, bookmarkId: number) => {
    const { data: bookmarksBase, error: bookmarkError } = await supabase.from('bookmarks_with_ogp').select('*').eq('user_id', userId).eq('bookmark_id', bookmarkId)
    if (bookmarkError) {
        console.error(bookmarkError)
        throw Error('cannot fetch bookmarks')
    }
    return convertBookmark(bookmarksBase[0])
}

export const fetchBookmarksByIds = async (supabase: SupabaseClient<Database>, userId: string, bookmarkIds: number[]) => {
    const { data: bookmarksBase, error: bookmarkError } = await supabase.from('bookmarks_with_ogp').select('*').eq('user_id', userId).in('bookmark_id', bookmarkIds)
    if (bookmarkError) {
        console.error(bookmarkError)
        throw Error('cannot fetch bookmarks')
    }
    return convertBookmarks(bookmarksBase)
}

export const fetchBookmarksByCategory = async (supabase: SupabaseClient<Database>, userId: string, categoryId: number) => {
    const { data: bookmarksBase, error: bookmarkError } = await supabase.from('bookmarks_with_ogp').select('*').eq('user_id', userId).eq('category_id', categoryId).order('created_at', { ascending: false })
    if (bookmarkError) {
        console.error(bookmarkError)
        throw Error('cannot fetch bookmarks')
    }
    return convertBookmarks(bookmarksBase)
}

export type BookmarkType = ReturnType<typeof convertBookmarks>[0]