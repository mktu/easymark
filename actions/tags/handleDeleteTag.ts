'use server'
import { deleteTag } from "@/lib/repositories/tags";
import { createClientForServer } from "@/lib/supabase/supabaseServer";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const schema = {
    tagId: z.number(),
}

export const handleDeleteTag = async (data: {
    tagId: number
}) => {
    const validated = z.object(schema).safeParse(data)
    const supabase = await createClientForServer();
    if (!validated.success) {
        return { validatedErrors: validated.error.flatten().fieldErrors }
    }
    const { data: authData } = await supabase.auth.getUser();
    if (!authData?.user) {
        return { error: 'not authenticated' }
    }
    const { error } = await deleteTag(supabase, validated.data.tagId)
    if (error) {
        return { error: 'cannot delete tag' }
    }
    revalidatePath('/app')
    return {
        success: true
    }
}

export type HandleDeleteTagResultType = Awaited<ReturnType<typeof handleDeleteTag>>