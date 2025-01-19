'use server'
import { z } from "zod"
import { createClientForServer } from "@/lib/supabase/supabaseServer"
import { revalidatePath } from "next/cache"
import { deleteBookmark } from "@/lib/repositories/bookmarks"

const schema = {
    bookmarkId: z.number(),
}

export const handleDeleteBookmark = async (data: {
    bookmarkId: number
}) => {
    const validated = z.object(schema).safeParse(data)
    if (!validated.success) {
        return { validatedErrors: validated.error.flatten().fieldErrors }
    }
    const { bookmarkId } = validated.data
    const supabase = await createClientForServer();
    const { data: authData } = await supabase.auth.getUser();
    if (!authData?.user) {
        return { error: 'not authenticated' }
    }

    const { error: bookmarkerror } = await deleteBookmark(supabase, { bookmarkId, userId: authData.user.id })
    if (bookmarkerror) {
        return { error: bookmarkerror }
    }
    revalidatePath('/')
    return {
        success: true
    }
}