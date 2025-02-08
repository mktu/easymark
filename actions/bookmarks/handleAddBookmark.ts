'use server'
import { createClientForServer } from '@/lib/supabase/supabaseServer';
import { z } from 'zod';
import { createUrlRegExp } from '../../logics/bookmarks/validateUrl';
import { revalidatePath } from 'next/cache';
import { addBookmarksBySupabase } from './addBookmarksBySupabase';

export type AddBookmarkState = {
    error: string | null,
} | {
    validatedErrors: {
        url?: string
    }
} | {
    success: true
}

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
    note: z.string().optional().nullable()
}

export const handleAddBookmark = async (data: {
    url: string,
    title?: string,
    description?: string,
    imageUrl?: string,
    note?: string,
    category?: number | null
}) => {
    const validated = z.object(schema).safeParse(data)
    if (!validated.success) {
        return { validatedErrors: validated.error.flatten().fieldErrors }
    }
    const supabase = await createClientForServer();
    const { data: authData } = await supabase.auth.getUser();
    if (!authData?.user) {
        return { error: 'not authenticated' }
    }
    const result = await addBookmarksBySupabase({
        url: validated.data.url,
        title: validated.data.title,
        description: validated.data.description,
        imageUrl: validated.data.imageUrl,
        note: validated.data.note,
        category: validated.data.category,
        userId: authData.user.id
    }, supabase)
    if (result?.error) {
        return { error: result.error }
    }
    revalidatePath('/')
    return {
        success: true
    }
}

export type HandleAddBookmarkReturnType = Awaited<ReturnType<typeof handleAddBookmark>>;
