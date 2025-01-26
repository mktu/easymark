import { searchBookmarks } from "@/loader/bookmarks/searchBookmarks";
import { convertCategoryToQuery, convertTagToQuery } from "@/logics/bookmarks/convertToQuery";
import { getSortOption } from "@/logics/bookmarks/parseSortOption";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams
    const sortOption = getSortOption(searchParams)
    const queries: string[] = []
    queries.push(searchParams.get('query') ? decodeURIComponent(searchParams.get('query') as string) : '');
    const tag = searchParams.get('tag');
    const category = searchParams.get('category');
    const page = searchParams.get('page') ? Number(searchParams.get('page')) : 0;
    const limit = searchParams.get('limit') ? Number(searchParams.get('limit')) : 10;
    if (tag) {
        queries.push(convertTagToQuery(tag))
    }
    if (category) {
        queries.push(convertCategoryToQuery(category))
    }
    const res = await searchBookmarks(page, limit, queries.join(','), sortOption)
    if ('error' in res) {
        return new Response(res.error, { status: 500 })
    }
    return Response.json(res)
}