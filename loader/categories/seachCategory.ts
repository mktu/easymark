'use server'
import { getCategories, searchCategories } from "@/lib/repositories/categories";
import { createClientForServer } from "@/lib/supabase/supabaseServer";

export const seachCategory = async (query: string) => {
    const supabase = await createClientForServer();
    const { data: authData } = await supabase.auth.getUser();
    if (!authData?.user) {
        return { error: 'not authenticated' }
    }

    if (!query) {
        return await getCategories(supabase, authData.user.id, 30)
    }

    return await searchCategories(supabase, {
        userId: authData.user.id,
        name: query,
        limit: 30
    })
}