'use server'
import { getImportStatusList } from "@/lib/repositories/import_status"
import { createClientForServer } from "@/lib/supabase/supabaseServer"

export const loadImportStatusList = async () => {
    const supabase = await createClientForServer()
    const { data: authData } = await supabase.auth.getUser();
    if (!authData?.user) {
        throw new Error('not authenticated')
    }
    return await getImportStatusList(supabase, authData.user.id, 20)
}