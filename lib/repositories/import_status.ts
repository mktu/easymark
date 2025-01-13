import { Database } from "../supabase/schema";
import { SupabaseClient } from "../supabase/supabaseServer";

export type ImportProcessingStatus = 'pending' | 'processing' | 'completed' | 'failed';

const convertImportStatus = (status: Database['public']['Tables']['import_status']['Row']) => {
    return {
        id: status.id,
        userId: status.user_id,
        status: status.status,
        totalItems: status.total_items,
        completedItems: status.completed_items,
        progress: status.progress
    }
}

export const addImportStatus = async (supabase: SupabaseClient, {
    userId,
    totalItems
}: {
    userId: string,
    totalItems: number
}) => {
    const { error: importStatusError, data } = await supabase
        .from('import_status')
        .insert({
            user_id: userId,
            status: 'pending',
            total_items: totalItems,
            completed_items: 0,
            progress: 0
        }).select('id').single();

    if (importStatusError) {
        console.error(importStatusError)
        throw Error('cannot add import status')
    }
    return data!.id;
}

export const updateImportStatus = async (supabase: SupabaseClient, {
    statusId,
    userId,
    status,
    progress,
    completedItems
}: {
    statusId: number,
    userId: string,
    status: ImportProcessingStatus,
    progress: number,
    completedItems: number
}) => {
    const { error: importStatusError } = await supabase
        .from('import_status')
        .update({ status, progress, completed_items: completedItems })
        .eq('user_id', userId)
        .eq('id', statusId);

    if (importStatusError) {
        console.error(importStatusError)
        throw Error('cannot update import status')
    }
}

export const getImportStatus = async (supabase: SupabaseClient, statusId: number) => {
    const { data, error } = await supabase
        .from('import_status')
        .select('*')
        .eq('id', statusId)
        .single();

    if (error) {
        console.error(error)
        throw Error('cannot get import status')
    }
    return convertImportStatus(data);
}

export type ImportStatusType = ReturnType<typeof convertImportStatus>;
