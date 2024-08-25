'use server'
import { updateCategory } from "@/lib/repositories/categories"
import { createClientForServer } from "@/lib/supabase/supabaseServer";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const schema = {
    categoryId: z.number(),
    name: z.string(),
    parentId: z.number().nullable().optional(),
    color: z.string().nullable().optional()
}

export const handleUpdateCategory = async (data: {
    categoryId: number,
    name: string,
    parentId?: number | null,
    color?: string | null
}) => {
    const validated = z.object(schema).safeParse(data)
    const supabase = createClientForServer();
    if (!validated.success) {
        console.error(validated.error.flatten().fieldErrors)
        return { validatedErrors: validated.error.flatten().fieldErrors }
    }
    const { data: authData } = await supabase.auth.getUser();
    if (!authData?.user) {
        return { error: 'not authenticated' }
    }
    const { error } = await updateCategory(supabase, { userId: authData.user.id, ...validated.data })
    if (error) {
        return { error }
    }
    console.log('revalidate')
    revalidatePath('/')
    return {
        error: null
    }
}
