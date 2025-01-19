'use server'
import { visitBookmark } from "@/lib/repositories/bookmarks";
import { createClientForServer } from "@/lib/supabase/supabaseServer";

export const handleVisitBookmark = async (bookmarkId: number) => {
    const supabase = await createClientForServer();
    const { data: authData } = await supabase.auth.getUser();
    if (!authData?.user) {
        return { error: 'not authenticated' }
    }
    const { error: bookmarkerror } = await visitBookmark(supabase, { bookmarkId })
    if (bookmarkerror) {
        return { error: bookmarkerror }
    }

    return {
        success: true
    }
}