import { NextRequest } from 'next/server'
import { createClientForServer } from '@/lib/supabase/supabaseServer';
import { ApiKeyType, getApiKey } from '@/lib/repositories/api_key';
import { z } from 'zod';
import { createUrlRegExp } from '@/logics/bookmarks/validateUrl';
import { addBookmarksBySupabase } from '@/actions/bookmarks/addBookmarksBySupabase';
import { authenticateByApiKey } from '../../_utils/authenticateByApiKey';

const schema = {
    url: z.string().regex(
        createUrlRegExp()
        , {
            message:
                'need to be url format'
        }),
    category: z.number().optional().nullable(),
    note: z.string().optional().nullable()
}

export const post = async (request: NextRequest) => {
    const supabase = await createClientForServer()
    const authenticateResult = await authenticateByApiKey(request, supabase);
    if ('error' in authenticateResult) {
        return Response.json({ error: authenticateResult.error }, { status: authenticateResult.code });
    }
    const body = await request.json()
    const validated = z.object(schema).safeParse(body)
    if (!validated.success) {
        return new Response(JSON.stringify({ validatedErrors: validated.error.flatten().fieldErrors }), { status: 400 })
    }
    const result = await addBookmarksBySupabase({
        url: validated.data.url,
        note: validated.data.note,
        category: validated.data.category,
        userId: authenticateResult.userId
    }, supabase)

    if (result?.error) {
        return Response.json({ error: result.error }, { status: 500 })
    }
    return Response.json({ success: true })
}