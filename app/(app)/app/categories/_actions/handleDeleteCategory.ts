'use server'
import { deleteCategory } from "@/lib/repositories/categories"
import { createClientForServer } from "@/lib/supabase/supabaseServer"
import { revalidatePath } from "next/cache"
import { z } from "zod"

const schema = {
    categoryId: z.number(),
}

export const handleDeleteCategory = async (data: { categoryId: number }) => {
    const validated = z.object(schema).safeParse(data)
    if (!validated.success) {
        return { validatedErrors: validated.error.flatten().fieldErrors }
    }
    const { categoryId } = validated.data
    const supabase = createClientForServer();
    const { data: authData } = await supabase.auth.getUser();
    if (!authData?.user) {
        return { error: 'not authenticated' }
    }

    const { error: bookmarkerror } = await deleteCategory(supabase, { categoryId, userId: authData.user.id })
    if (bookmarkerror) {
        return { error: bookmarkerror }
    }
    revalidatePath('/app')
    return {
        success: true
    }
}

export type HandleDeleteCategoryResultType = Awaited<ReturnType<typeof handleDeleteCategory>>