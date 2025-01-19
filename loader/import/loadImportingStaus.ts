'use server'
import { getImportStatus } from "@/lib/repositories/import_status"
import { createClientForServer } from "@/lib/supabase/supabaseServer"

export const loadImportingStatus = async (statusId: number) => {
    const supabase = await createClientForServer()
    const { data: authData } = await supabase.auth.getUser();
    if (!authData?.user) {
        return { error: 'not authenticated' }
    }
    return await getImportStatus(supabase, statusId)
}