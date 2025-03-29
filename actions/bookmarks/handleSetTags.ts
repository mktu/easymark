'use server'

import { associateTags, getTagMappings } from "@/lib/repositories/tag_mappings";
import { createClientForServer } from "@/lib/supabase/supabaseServer";
import { revalidatePath } from "next/cache";

export const handleSetTags = async (bookmarks: number[], tags: number[]) => {
    const supabase = await createClientForServer();
    const { data: authData } = await supabase.auth.getUser();
    if (!authData?.user) {
        return { error: 'not authenticated' }
    }
    const results = bookmarks.map(async (bookmarkId) => {
        const result = await getTagMappings(supabase, bookmarkId)
        const targetTags = tags.filter(tag => !result.map(v => v.tag_id).includes(tag))
        await associateTags(supabase, targetTags.map(tagId => ({ tagId, bookmarkId })))
    })
    await Promise.all(results)
    revalidatePath('/')
    return {
        success: true
    }
}