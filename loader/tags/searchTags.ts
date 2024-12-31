'use server'
import { getTagUsage, searchTagUsage } from "@/lib/repositories/tag_usage";
import { createClientForServer } from "@/lib/supabase/supabaseServer";

export const searchTags = async (query: string) => {
    const supabase = createClientForServer();
    const { data: authData } = await supabase.auth.getUser();
    if (!authData?.user) {
        return { error: 'not authenticated' }
    }
    if (!query) {
        return await getTagUsage(supabase, authData.user.id, 10)
    }
    return await searchTagUsage(supabase, {
        userId: authData.user.id,
        name: query,
        limit: 10
    })
}