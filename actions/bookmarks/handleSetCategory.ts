'use server'

import { bulkUpdateCategory } from "@/lib/repositories/bookmarks";
import { createClientForServer } from "@/lib/supabase/supabaseServer";
import { revalidatePath } from "next/cache";

export const handleSetCategory = async (bookmarks: number[], category: number) => {
    const supabase = createClientForServer();
    const { data: authData } = await supabase.auth.getUser();
    if (!authData?.user) {
        return { error: 'not authenticated' }
    }
    const { error } = await bulkUpdateCategory(supabase, { userId: authData.user.id, bookmarkIds: bookmarks, categoryId: category })
    if (error) {
        return { error }
    }
    revalidatePath('/')
    return {
        success: true
    }
}