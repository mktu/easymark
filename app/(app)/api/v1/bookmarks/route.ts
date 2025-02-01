import { NextRequest } from 'next/server'
import { getSortOptionFromQuery } from '../../../../../logics/bookmarks/parseSortOption';
import { convertCategoryToQuery, convertTagToQuery } from '../../../../../logics/bookmarks/convertToQuery';
import { createClientForServer } from '@/lib/supabase/supabaseServer';
import { ApiKeyType, getApiKey } from '@/lib/repositories/api_key';
import { searchBookmarksBySupabase } from '../../../../../loader/bookmarks/searchBookmarksBySupabase';
import { z } from 'zod';

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

export async function GET(request: NextRequest) {
    const requestHeaders = new Headers(request.headers)
    const apiKey = requestHeaders.get('x-api-key');
    if (!apiKey) {
        return new Response('Unauthorized', { status: 401 })
    }
    const supabase = await createClientForServer()
    let apiKeyData: ApiKeyType;
    try {
        apiKeyData = await getApiKey(apiKey, supabase)
        if (!apiKeyData.active) {
            return new Response('Api key is not active', { status: 401 })
        }
        if (apiKeyData.expiresAt && new Date(apiKeyData.expiresAt) < new Date()) {
            return new Response('Api key is expired', { status: 401 })
        }
    } catch (e) {
        return new Response('Unauthorized', { status: 401 })
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

    const bookmarks = await searchBookmarksBySupabase(supabase, apiKeyData.userId, page || 0, limit || 10, queries.join(','), sortOption)
    return Response.json(bookmarks)
}