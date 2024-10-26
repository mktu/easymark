'use server'
import { z } from "zod"
import { createUrlRegExp } from "../_lib/validateUrl"
import { createClientForServer } from "@/lib/supabase/supabaseServer"
import { revalidatePath } from "next/cache"
import { updateBookmark } from "@/lib/repositories/bookmarks"
import { upsertOgp } from "@/lib/repositories/ogps"
import { associateTags, removeTags } from "@/lib/repositories/tag_mappings"

const schema = {
    url: z.string().regex(
        createUrlRegExp()
        , {
            message:
                'need to be url format'
        }),
    title: z.string().optional().nullable(),
    description: z.string().optional().nullable(),
    imageUrl: z.string().optional().nullable(),
    category: z.number().optional().nullable(),
    note: z.string().optional().nullable(),
    tags: z.array(z.number()).optional().nullable()
}

export const handleUpdateBookmark = async (data: {
    url: string,
    title: string | null,
    description: string | null,
    imageUrl: string | null,
    category?: number | null,
    note: string | null,
    tags?: number[] | null
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
    const { error: bookmarkerror, bookmarkId } = await updateBookmark(supabase, { url, note, userId: authData.user.id, categoryId: category })
    if (bookmarkerror) {
        return { error: bookmarkerror }
    }
    const { error: ogpError } = await upsertOgp(supabase, { url, title, description, imageUrl })
    if (ogpError) {
        return { error: ogpError }
    }
    if (data.tags && bookmarkId) {
        const removeResult = await removeTags(supabase, { bookmarkId })
        if (removeResult.error) {
            return { error: removeResult.error }
        }
        if (data.tags?.length > 0) {
            const associateResult = await associateTags(supabase, data.tags.map(tagId => ({ tagId, bookmarkId })))
            if (associateResult.error) {
                return { error: associateResult.error }
            }
        }
    }
    revalidatePath('/')
    return {
        success: true
    }
}

export type HandleUpdateBookmarkReturnType = Awaited<ReturnType<typeof handleUpdateBookmark>>;