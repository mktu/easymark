'use server'

import { associateTags, getTagMappings } from "@/lib/repositories/tag_mappings";
import { createClientForServer } from "@/lib/supabase/supabaseServer";
import { revalidatePath } from "next/cache";

export const handleUpdateTags = async (bookmarks: number[], tags: number[]) => {
    const supabase = createClientForServer();
    const { data: authData } = await supabase.auth.getUser();
    if (!authData?.user) {
        return { error: 'not authenticated' }
    }
    const results = bookmarks.map(async (bookmarkId) => {
        const result = await getTagMappings(supabase, bookmarkId)
        if ('error' in result) {
            return { error: result.error };
        }
        const targetTags = tags.filter(tag => !result.map(v => v.tag_id).includes(tag))
        const { error } = await associateTags(supabase, targetTags.map(tagId => ({ tagId, bookmarkId })))
        if (error) {
            return { error }
        }
        return { error: null }
    })
    const rets = await Promise.all(results)
    if (rets.some(ret => ret.error)) {
        return { error: 'cannot update tags' }
    }
    revalidatePath('/')
    return {
        success: true
    }
}