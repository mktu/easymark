'use server'
import { fetchBookmarksByIds, fetchBookmarksByPage, searchBookmarks } from "@/lib/repositories/bookmarks";
import { createClientForServer } from "@/lib/supabase/supabaseServer";
import { BookmarkSortOption } from "@/lib/types";
import { buildQueryData, parseSearchQuery } from "../_utils/parseSearchQuery";

export const handleFetchBookmarks = async (page: number, limit: number, tags: number[] | null, filter?: string, sortOption?: BookmarkSortOption, category?: number | null) => {

    const start = page * limit;
    const end = start + limit - 1;

    const supabase = createClientForServer();
    const { data: authData } = await supabase.auth.getUser();
    if (!authData?.user) {
        return { error: 'not authenticated' }
    }
    const { bookmarks, count } = await fetchBookmarksByPage(supabase, authData.user.id, page, limit, tags, filter, sortOption, category)
    return {
        bookmarks: bookmarks,
        hasMore: count ? count > end : false
    }
}

export const handleSearchBookmarks = async (page: number, limit: number, query?: string) => {
    const supabase = createClientForServer();
    const { data: authData } = await supabase.auth.getUser();
    if (!authData?.user) {
        return { error: 'not authenticated' }
    }
    const start = page * limit;
    const end = start + limit - 1;
    const parsed = query ? parseSearchQuery(query) : null
    if (parsed) {
        const queryData = buildQueryData(parsed)

        const { bookmarks, count } = await searchBookmarks(supabase, {
            userId: authData.user.id,
            page,
            limit,
            tags: queryData['tag'],
            filter: queryData['freeWord'],
            sortOption: 'date',
            category: queryData['category'],
        })
        return {
            bookmarks: bookmarks,
            hasMore: count ? count > end : false
        }
    }
    const { bookmarks, count } = await searchBookmarks(supabase, {
        userId: authData.user.id,
        page,
        limit,
        tags: null,
        filter: null,
        sortOption: 'date',
        category: null,
    })
    return {
        bookmarks: bookmarks,
        hasMore: count ? count > end : false
    }
}

export const handleFetchBookmarksByIds = async (ids: number[]) => {
    const supabase = createClientForServer();
    const { data: authData } = await supabase.auth.getUser();
    if (!authData?.user) {
        return { error: 'not authenticated' }
    }
    const bookmarks = await fetchBookmarksByIds(supabase, authData.user.id, ids)
    return {
        bookmarks
    }
}
