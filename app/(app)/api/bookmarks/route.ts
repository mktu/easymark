import { NextRequest } from 'next/server'
import { getSortOption } from '../../_logics/bookmarks/parseSortOption';
import { convertCategoryToQuery, convertTagToQuery } from '../../_logics/bookmarks/convertToQuery';
import { createClientForServer } from '@/lib/supabase/supabaseServer';
import { getUserId } from '@/lib/repositories/api_key';
import { searchBookmarksBySupabase } from '../../_loaders/bookmarks/searchBookmarks';

export async function GET(request: NextRequest) {
    const requestHeaders = new Headers(request.headers)
    const apiKey = requestHeaders.get('x-api-key');
    if (!apiKey) {
        return new Response('Unauthorized', { status: 401 })
    }
    const supabase = createClientForServer()
    let userId: string;
    try {
        userId = await getUserId(apiKey, supabase)
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

    const bookmarks = await searchBookmarksBySupabase(supabase, userId, 0, 10, queries.join(','), sortOption)
    return Response.json(bookmarks)
}