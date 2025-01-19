import { getFailedBookmarkImports } from "@/lib/repositories/failed_bookmark_imports";
import { createClientForServer } from "@/lib/supabase/supabaseServer";

export const loadImportErrors = async (statusId: number) => {
    const supabase = await createClientForServer()
    const { data: authData } = await supabase.auth.getUser();
    if (!authData?.user) {
        return { error: 'not authenticated' }
    }
    return await getFailedBookmarkImports(supabase, statusId)
}