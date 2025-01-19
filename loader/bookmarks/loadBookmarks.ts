'use server'
import { searchBookmarksByIds } from "@/lib/repositories/bookmarks";
import { createClientForServer } from "@/lib/supabase/supabaseServer";

export const loadBookmarksByIds = async (ids: number[]) => {
    const supabase = await createClientForServer();
    const { data: authData } = await supabase.auth.getUser();
    if (!authData?.user) {
        return { error: 'not authenticated' }
    }
    const bookmarks = await searchBookmarksByIds(supabase, authData.user.id, ids)
    return {
        bookmarks
    }
}
