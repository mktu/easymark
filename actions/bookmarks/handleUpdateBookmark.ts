'use server'
import { z } from "zod"
import { createUrlRegExp } from "../../logics/bookmarks/validateUrl"
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
    const supabase = await createClientForServer();
    const { data: authData } = await supabase.auth.getUser();
    if (!authData?.user) {
        return { error: 'not authenticated' }
    }
    const { bookmarkId } = await updateBookmark(supabase, { url, note, userId: authData.user.id, categoryId: category })
    await upsertOgp(supabase, { url, title, description, imageUrl })
    if (data.tags && bookmarkId) {
        await removeTags(supabase, { bookmarkId })
        if (data.tags?.length > 0) {
            await associateTags(supabase, data.tags.map(tagId => ({ tagId, bookmarkId })))
        }
    }
    revalidatePath('/')
    return {
        success: true
    }
}

export type HandleUpdateBookmarkReturnType = Awaited<ReturnType<typeof handleUpdateBookmark>>;