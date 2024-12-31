'use server'
import { searchBookmarksByIds } from "@/lib/repositories/bookmarks";
import { createClientForServer } from "@/lib/supabase/supabaseServer";
import { BookmarkSortOption } from "@/lib/types";
import { searchBookmarksBySupabase } from "@/app/(app)/_loaders/bookmarks/searchBookmarks";

export const handleSearchBookmarks = async (page: number, limit: number, query?: string, sort?: BookmarkSortOption) => {
    const supabase = createClientForServer();
    const { data: authData } = await supabase.auth.getUser();
    if (!authData?.user) {
        return { error: 'not authenticated' }
    }
    return await searchBookmarksBySupabase(supabase, authData.user.id, page, limit, query, sort)
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
