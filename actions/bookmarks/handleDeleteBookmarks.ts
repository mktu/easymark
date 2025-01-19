'use server'
import { deleteBookmarks } from "@/lib/repositories/bookmarks";
import { removeTagsFromBookmarks } from "@/lib/repositories/tag_mappings";
import { createClientForServer } from "@/lib/supabase/supabaseServer";
import { revalidatePath } from "next/cache";

export const handleDeleteBookmarks = async (bookmarks: number[]) => {
    const supabase = await createClientForServer();
    const { data: authData } = await supabase.auth.getUser();
    if (!authData?.user) {
        return { error: 'not authenticated' }
    }
    const removeTagResult = await removeTagsFromBookmarks(supabase, bookmarks)
    if (removeTagResult.error) {
        return { error: removeTagResult.error }
    }
    const { error } = await deleteBookmarks(supabase, { bookmarkIds: bookmarks })
    if (error) {
        return { error }
    }
    revalidatePath('/')
    return {
        success: true
    }
}