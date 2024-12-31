import { NextRequest } from 'next/server'
import { getSortOption } from '../../../../logics/bookmarks/parseSortOption';
import { convertCategoryToQuery, convertTagToQuery } from '../../../../logics/bookmarks/convertToQuery';
import { createClientForServer } from '@/lib/supabase/supabaseServer';
import { ApiKeyType, getApiKey } from '@/lib/repositories/api_key';
import { searchBookmarksBySupabase } from '../../../../loader/bookmarks/searchBookmarksBySupabase';

export async function GET(request: NextRequest) {
    const requestHeaders = new Headers(request.headers)
    const apiKey = requestHeaders.get('x-api-key');
    if (!apiKey) {
        return new Response('Unauthorized', { status: 401 })
    }
    const supabase = createClientForServer()
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
    const sortOption = getSortOption(searchParams)
    const queries: string[] = []
    queries.push(searchParams.get('query') ? decodeURIComponent(searchParams.get('query') as string) : '');
    const tag = searchParams.get('tag');
    const category = searchParams.get('category');
    if (tag) {
        queries.push(convertTagToQuery(tag))
    }
    if (category) {
        queries.push(convertCategoryToQuery(category))
    }

    const bookmarks = await searchBookmarksBySupabase(supabase, apiKeyData.userId, 0, 10, queries.join(','), sortOption)
    return Response.json(bookmarks)
}