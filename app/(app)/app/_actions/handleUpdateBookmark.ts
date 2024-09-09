'use server'
import { z } from "zod"
import { createUrlRegExp } from "../_lib/validateUrl"
import { createClientForServer } from "@/lib/supabase/supabaseServer"
import { revalidatePath } from "next/cache"
import { updateBookmark } from "@/lib/repositories/bookmarks"
import { upsertOgp } from "@/lib/repositories/ogps"

const schema = {
    url: z.string().regex(
        createUrlRegExp()
        , {
            message:
                'need to be url format'
        }),
    title: z.string().optional(),
    description: z.string().optional(),
    imageUrl: z.string().optional(),
    category: z.number().optional(),
    note: z.string().optional()
}

export const handleUpdateBookmark = async (data: {
    url: string,
    title: string | null,
    description: string | null,
    imageUrl: string | null,
    category?: number | null,
    note: string | null
}) => {
    const validated = z.object(schema).safeParse(data)
    if (!validated.success) {
        return { validatedErrors: validated.error.flatten().fieldErrors }
    }
    const { url, title, description, imageUrl, note, category } = validated.data
    const supabase = createClientForServer();
    const { data: authData } = await supabase.auth.getUser();
    if (!authData?.user) {
        return { error: 'not authenticated' }
    }
    const { error: bookmarkerror } = await updateBookmark(supabase, { url, note, userId: authData.user.id, categoryId: category })
    if (bookmarkerror) {
        return { error: bookmarkerror }
    }
    const { error: ogpError } = await upsertOgp(supabase, { url, title, description, imageUrl })
    if (ogpError) {
        return { error: ogpError }
    }
    revalidatePath('/')
    return {
        success: true
    }
}