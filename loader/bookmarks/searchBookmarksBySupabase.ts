import { Database } from "@/lib/supabase/schema";
import { BookmarkSortOption } from "@/lib/types";
import { SupabaseClient } from "@supabase/supabase-js";
import { buildQueryData, parseSearchQuery } from "../../logics/bookmarks/parseSearchQuery";
import { searchBookmarks } from "@/lib/repositories/bookmarks";

export const searchBookmarksBySupabase = async (supabase: SupabaseClient<Database>, userId: string, page: number, limit: number, query?: string, sort?: BookmarkSortOption) => {
    const start = page * limit;
    const end = start + limit - 1;
    const parsed = query ? parseSearchQuery(query) : null
    if (parsed) {
        const queryData = buildQueryData(parsed)

        const { bookmarks, count } = await searchBookmarks(supabase, {
            userId,
            offset: start,
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
        userId,
        offset: start,
        limit,
        tags: null,
        filter: null,
        sortOption: sort,
        category: null,
    })
    return {
        bookmarks: bookmarks,
        hasMore: count ? count === limit : false
    }
}