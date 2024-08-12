'use server'
import { z } from "zod"
import { createUrlRegExp } from "../_lib/validateUrl"
import { createClientForServer } from "@/lib/supabase/supabaseServer"
import { revalidatePath } from "next/cache"

const schema = {
    bookmarkId: z.number(),
}

export const deleteBookmark = async (data: {
    bookmarkId: number
}) => {
    const validated = z.object(schema).safeParse(data)
    if (!validated.success) {
        return { validatedErrors: validated.error.flatten().fieldErrors }
    }
    const { bookmarkId } = validated.data
    const supabase = createClientForServer();
    const { data: authData } = await supabase.auth.getUser();
    if (!authData?.user) {
        return { error: 'not authenticated' }
    }
    const { error: bookmarkerror } = await supabase.from('bookmarks').delete().eq('id', bookmarkId).eq('user_id', authData.user.id);
    if (bookmarkerror) {
        console.error(bookmarkerror)
        return { error: 'cannnot delete bookmark' }
    }
    revalidatePath('/')
    return {
        success: true
    }
}