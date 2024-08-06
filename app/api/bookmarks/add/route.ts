import { createUrlRegExp } from "@/app/(app)/app/_lib/validateUrl";
import { createClientForServer } from "@/lib/supabase/supabaseServer";
import { z } from "zod";

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

export async function POST(request: Request) {
    const supabase = createClientForServer();
    const { data: authData } = await supabase.auth.getUser();
    if (!authData?.user) {
        return { error: 'not authenticated' }
    }
    const data = await request.json();
    const { success, data: validatedFields, error: validationError } = z.object(schema).safeParse(data);
    if (!success) {
        return { validatedErrors: validationError.flatten().fieldErrors }
    }

    const url = validatedFields.url;
    const title = validatedFields.title;
    const description = validatedFields.description;
    const imageUrl = validatedFields.imageUrl;
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
}