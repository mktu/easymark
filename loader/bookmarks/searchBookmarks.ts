'use server'
import { createClientForServer } from "@/lib/supabase/supabaseServer";
import { BookmarkSortOption } from "@/lib/types";
import { searchBookmarksBySupabase } from "@/loader/bookmarks/searchBookmarksBySupabase";

export const searchBookmarks = async (page: number, limit: number, query?: string, sort?: BookmarkSortOption) => {
    const supabase = createClientForServer();
    const { data: authData } = await supabase.auth.getUser();
    if (!authData?.user) {
        return { error: 'not authenticated' }
    }
    return await searchBookmarksBySupabase(supabase, authData.user.id, page, limit, query, sort)
}
