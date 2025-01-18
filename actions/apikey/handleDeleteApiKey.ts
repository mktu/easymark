'use server'

import { deleteApiKey } from "@/lib/repositories/api_key";
import { createClientForServer } from "@/lib/supabase/supabaseServer";
import { revalidatePath } from "next/cache";

export const handleDeleteApiKey = async (apiKeyId: string) => {
    const supabase = await createClientForServer();
    const { data: authData } = await supabase.auth.getUser()
    if (!authData?.user) {
        return { error: 'User not authenticated' }
    }

    await deleteApiKey(authData.user.id, apiKeyId, supabase);
    revalidatePath('/app/profile');
    return { success: true };
};
