'use server'
import { z } from "zod"
import { createUrlRegExp } from "../_lib/validateUrl"
import { createClientForServer } from "@/lib/supabase/supabaseServer"
import { revalidatePath } from "next/cache"

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
    note: z.string().optional()
}

export const updateBookmark = async (data: {
    url: string,
    title: string | null,
    description: string | null,
    imageUrl: string | null,
    note: string | null
}) => {
    const validated = z.object(schema).safeParse(data)
    if (!validated.success) {
        return { validatedErrors: validated.error.flatten().fieldErrors }
    }
    const { url, title, description, imageUrl, note } = validated.data
    const supabase = createClientForServer();
    const { data: authData } = await supabase.auth.getUser();
    if (!authData?.user) {
        return { error: 'not authenticated' }
    }
    const { error: bookmarkerror } = await supabase.from('bookmarks').update({
        url,
        user_id: authData.user.id,
        note
    }).eq('url', url).eq('user_id', authData.user.id);
    if (bookmarkerror) {
        console.log(bookmarkerror)
        return { error: 'cannnot add bookmark' }
    }
    const { error: ogpError } = await supabase.from('ogp_data').upsert({
        url,
        title,
        description,
        image_url: imageUrl
    });
    if (ogpError) {
        console.error(ogpError)
        return { error: 'cannnot add ogp data' }
    }
    revalidatePath('/')
    return {
        success: true
    }
}