'use server'
import { addCategory } from "@/lib/repositories/categories"
import { createClientForServer } from "@/lib/supabase/supabaseServer";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const schema = {
    name: z.string(),
    parentId: z.number().optional(),
    color: z.string().optional()
}

export const handleAddCategory = async (data: {
    name: string,
    parentId?: number,
    color?: string
}) => {
    const validated = z.object(schema).safeParse(data)
    const supabase = createClientForServer();
    if (!validated.success) {
        return { validatedErrors: validated.error.flatten().fieldErrors }
    }
    const { data: authData } = await supabase.auth.getUser();
    if (!authData?.user) {
        return { error: 'not authenticated' }
    }
    const { error } = await addCategory(supabase, { userId: authData.user.id, ...validated.data })
    if (error) {
        return { error }
    }
    revalidatePath('/app')
    return {
        success: true
    }
}

export type HandleAddCategoryResultType = Awaited<ReturnType<typeof handleAddCategory>>