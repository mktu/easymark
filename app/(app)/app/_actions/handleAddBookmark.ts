'use server'
import { createClientForServer } from '@/lib/supabase/supabaseServer';
import { z } from 'zod';
import { createUrlRegExp } from '../_lib/validateUrl';
import { revalidatePath } from 'next/cache';
import { doScrape, OgpResponse } from '@/lib/supabase/ogp';
import { addBookmark } from '@/lib/repositories/bookmarks';
import { addOgp, hasOgp } from '@/lib/repositories/ogps';

export type AddBookmarkState = {
    error: string | null,
} | {
    validatedErrors: {
        url?: string
    }
} | {
    success: true
} | {}

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

export const handleAddBookmark = async (data: {
    url: string,
    title?: string,
    description?: string,
    imageUrl?: string,
    note?: string
}) => {
    const validated = z.object(schema).safeParse(data)
    if (!validated.success) {
        return { validatedErrors: validated.error.flatten().fieldErrors }
    }
    let description = validated.data.description
    let imageUrl = validated.data.imageUrl
    let title = validated.data.title
    const { url, note } = validated.data
    const supabase = createClientForServer();
    const { data: authData } = await supabase.auth.getUser();
    if (!authData?.user) {
        return { error: 'not authenticated' }
    }
    const { error: bookmarkerror } = await addBookmark(supabase, { url, note, userId: authData?.user?.id })
    if (bookmarkerror) {
        return { error: bookmarkerror }
    }
    if (!description) {
        try {
            const ret = await doScrape(url)
            description = ret.description
            imageUrl = ret.image?.url
            title = ret.title
        } catch (e) {
            console.error(e)
        }
    }
    if (await hasOgp(supabase, url)) {
        revalidatePath('/')
        return {
            success: true
        }
    }
    const { error: ogpError } = await addOgp(supabase, { url, title, description, imageUrl });
    if (ogpError) {
        return { error: ogpError }
    }
    revalidatePath('/')
    return {
        success: true
    }
}


export const handleBookmarkSubmit = async (ogp: OgpResponse | null, state: AddBookmarkState, formData: FormData) => {

    const validatedFields = z.object(schema).safeParse(Object.fromEntries(formData))

    if (!validatedFields.success) {
        return { validatedErrors: validatedFields.error.flatten().fieldErrors }
    }

    const url = validatedFields.data.url;
    const title = ogp?.title;
    const description = ogp?.description;
    const imageUrl = ogp?.image?.url;
    const supabase = createClientForServer();
    const { data: authData } = await supabase.auth.getUser();
    const { error: bookmarkerror } = await supabase.from('bookmarks').insert({ url, user_id: authData?.user?.id });
    if (bookmarkerror) {
        console.error(bookmarkerror)
        return { error: 'cannnot add bookmark' }
    }
    const { error: ogpError } = await supabase.from('ogp_data').insert({ url, title, description, image_url: imageUrl });
    if (ogpError) {
        console.error(ogpError)
        return { error: 'cannnot add ogp data' }
    }
    revalidatePath('/')
    return {
        error: null
    }
};
