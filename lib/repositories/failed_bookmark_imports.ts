import { Database } from "../supabase/schema";
import { SupabaseClient } from "../supabase/supabaseServer";

const convertFailedBookmarkImport = (data: Database['public']['Tables']['failed_bookmark_imports']['Row']) => {
    return {
        id: data.id,
        url: data.url,
        errorMessage: data.error_message,
        createdAt: data.created_at,
    }
}

export const getFailedBookmarkImports = async (supabase: SupabaseClient, statusId: number) => {
    const { data, error } = await supabase
        .from('failed_bookmark_imports')
        .select('*')
        .eq('import_status_id', statusId);

    if (error) {
        console.error(error)
        throw Error('cannot get failed bookmark imports')
    }

    return data.map(convertFailedBookmarkImport);
}

export const addFailedBookmarkImport = async (supabase: SupabaseClient, {
    statusId,
    userId,
    importErrors
}: {
    statusId: number,
    userId: string,
    importErrors: { url: string, cause: string }[]
}) => {
    const { error: failedImportError } = await supabase
        .from('failed_bookmark_imports')
        .insert(importErrors.map(e => ({
            import_status_id: statusId,
            user_id: userId,
            url: e.url,
            error_message: e.cause
        })));

    if (failedImportError) {
        console.error(failedImportError)
        throw Error('cannot add failed bookmark import')
    }
}

export type FailedBookmarkImportType = ReturnType<typeof convertFailedBookmarkImport>;