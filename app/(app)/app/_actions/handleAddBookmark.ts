'use server'

import { createClientForServer } from '@/lib/supabase/supabaseServer';
import { z } from 'zod';
import { createUrlRegExp } from '../_lib/validateUrl';

export type AddBookmarkState = {
    error: string | null,
} | {
    validatedErrors: {
        url?: string
    }
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
}

export const handleAddBookmark = async (state: AddBookmarkState, formData: FormData) => {

    const validatedFields = z.object(schema).safeParse(Object.fromEntries(formData))

    if (!validatedFields.success) {
        return { validatedErrors: validatedFields.error.flatten().fieldErrors }
    }

    const url = validatedFields.data.url;
    const title = validatedFields.data.title;
    const description = validatedFields.data.description;
    const imageUrl = validatedFields.data.imageUrl;
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
    return {
        error: null
    }
};
