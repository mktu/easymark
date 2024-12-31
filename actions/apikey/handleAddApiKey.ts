'use server'
import { addApiKey } from "@/lib/repositories/api_key";
import { createClientForServer } from "@/lib/supabase/supabaseServer";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const schema = {
    apiKey: z.string().min(1, { message: 'apiKey must be at least 1 character' }),
    label: z.string().min(1, { message: 'label must be at least 1 character' }),
    expiredAt: z.string().nullable()
}

export const handleAddApikey = async (data: {
    apiKey: string,
    label: string,
    expiredAt: string | null,
}) => {
    const supabase = createClientForServer();
    const validated = z.object(schema).safeParse(data)
    if (!validated.success) {
        return { validatedErrors: validated.error.flatten().fieldErrors }
    }
    const { apiKey, label, expiredAt } = validated.data
    const { data: authData } = await supabase.auth.getUser()
    if (!authData?.user) {
        return { error: 'User not authenticated' }
    }

    await addApiKey(supabase, {
        userId: authData.user.id, apiKey, expiredAt, label
    });
    revalidatePath('/app/profile');
    return { success: true };
}

export type HandleAddApikeyType = Awaited<ReturnType<typeof handleAddApikey>>;