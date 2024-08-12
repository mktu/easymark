'use server'

import { createClientForServer } from '@/lib/supabase/supabaseServer';
import { z } from 'zod';
import { createUrlRegExp } from '../_lib/validateUrl';
import { revalidatePath } from 'next/cache';
import { doScrape, OgpResponse } from '@/lib/supabase/ogp';

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

export const addBookmark = async (data: {
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
    const { error: bookmarkerror } = await supabase.from('bookmarks').insert({ url, user_id: authData?.user?.id, note });
    if (bookmarkerror) {
        if (bookmarkerror.code === '23505') {
            return { error: 'already bookmarked' }
        }
        return { error: 'cannnot add bookmark' }
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
    // check if already exitst ogp data
    const { data: ogpData } = await supabase.from('ogp_data').select('url').eq('url', url);
    if (ogpData && ogpData.length > 0) {
        revalidatePath('/')
        return {
            success: true
        }
    }
    const { error: ogpError } = await supabase.from('ogp_data').insert({ url, title, description, image_url: imageUrl });
    if (ogpError) {
        console.error(ogpError)
        return { error: 'cannnot add ogp data' }
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
