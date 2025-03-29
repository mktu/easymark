'use server'
import { visitBookmark } from "@/lib/repositories/bookmarks";
import { createClientForServer } from "@/lib/supabase/supabaseServer";

export const handleVisitBookmark = async (bookmarkId: number) => {
    const supabase = await createClientForServer();
    const { data: authData } = await supabase.auth.getUser();
    if (!authData?.user) {
        return { error: 'not authenticated' }
    }
    await visitBookmark(supabase, { bookmarkId })

    return {
        success: true
    }
}