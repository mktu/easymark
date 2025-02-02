import { NextRequest } from 'next/server'
import { createClientForServer } from '@/lib/supabase/supabaseServer';
import { z } from 'zod';
import { getSortOptionFromQuery } from '@/logics/bookmarks/parseSortOption';
import { convertCategoryToQuery, convertTagToQuery } from '@/logics/bookmarks/convertToQuery';
import { searchBookmarksBySupabase } from '@/loader/bookmarks/searchBookmarksBySupabase';
import { authenticateByApiKey } from '../../_utils/authenticateByApiKey';

const schema = z.object({
    query: z.string().optional(),
    tag: z.string().optional(),
    category: z.string().optional(),
    sort: z.string().optional(),
    page: z.string().transform(Number).refine(val => !isNaN(val) && val >= 0, {
        message: "Page must be a non-negative number",
    }).optional(),
    limit: z.string().transform(Number).refine(val => !isNaN(val) && val > 0, {
        message: "Limit must be a positive number",
    }).optional(),
});

export async function get(request: NextRequest) {
    const supabase = await createClientForServer()
    const authenticateResult = await authenticateByApiKey(request, supabase);
    if ('error' in authenticateResult) {
        return Response.json({ error: authenticateResult.error }, { status: authenticateResult.code });
    }
    const searchParams = request.nextUrl.searchParams
    const parseResult = schema.safeParse(Object.fromEntries(searchParams));
    if (!parseResult.success) {
        return Response.json({ error: parseResult.error.errors }, { status: 400 });
    }

    const { query, tag, category, page, limit, sort } = parseResult.data;
    const sortOption = getSortOptionFromQuery(sort)
    const queries: string[] = []
    queries.push(query ? decodeURIComponent(query) : '');
    if (tag) {
        queries.push(convertTagToQuery(tag))
    }
    if (category) {
        queries.push(convertCategoryToQuery(category))
    }

    const bookmarks = await searchBookmarksBySupabase(supabase, authenticateResult.userId, page || 0, limit || 10, queries.join(','), sortOption)
    return Response.json(bookmarks)
}