'use server'
import { searchBookmarksByIds, searchBookmarks } from "@/lib/repositories/bookmarks";
import { createClientForServer } from "@/lib/supabase/supabaseServer";
import { BookmarkSortOption } from "@/lib/types";
import { buildQueryData, parseSearchQuery } from "../_utils/parseSearchQuery";

export const handleSearchBookmarks = async (page: number, limit: number, query?: string, sort?: BookmarkSortOption) => {
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
            sortOption: sort,
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
        sortOption: sort,
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
    const bookmarks = await searchBookmarksByIds(supabase, authData.user.id, ids)
    return {
        bookmarks
    }
}
