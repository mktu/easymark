'use server'
import { fetchBookmarksByPage } from "@/lib/repositories/bookmarks";
import { createClientForServer } from "@/lib/supabase/supabaseServer";
import { BookmarkSortOption } from "@/lib/types";

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
