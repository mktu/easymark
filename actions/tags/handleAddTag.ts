'use server'
import { addTag, isExistTag } from "@/lib/repositories/tags";
import { createClientForServer } from "@/lib/supabase/supabaseServer";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const schema = {
    name: z.string().max(10, { message: 'tag name is too long' }),
}

export const handleAddTag = async (data: {
    name: string
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
    const { error: checkError, isExist } = await isExistTag(supabase, { userId: authData.user.id, ...validated.data })

    if (checkError) {
        return { error: checkError }
    }
    if (isExist) {
        return { error: 'tag already exists' }
    }
    const { error, tag } = await addTag(supabase, { userId: authData.user.id, ...validated.data })
    if (error) {
        return { error }
    }
    revalidatePath('/app')
    return {
        success: true,
        tag
    }
}

export type HandleAddTagReturnType = Awaited<ReturnType<typeof handleAddTag>>