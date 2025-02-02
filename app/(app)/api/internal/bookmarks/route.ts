import { loadBookmarksByIds } from "@/loader/bookmarks/loadBookmarks";
import { searchBookmarks } from "@/loader/bookmarks/searchBookmarks";
import { convertCategoryToQuery, convertTagToQuery } from "@/logics/bookmarks/convertToQuery";
import { getSortOption } from "@/logics/bookmarks/parseSortOption";
import { NextRequest } from "next/server";
import { z } from "zod";

// クエリパラメータ用のスキーマ定義
const searchQuerySchema = z.object({
    query: z.string().optional(),            // キーワード検索
    tag: z.string().optional(),              // タグ
    category: z.string().optional(),         // カテゴリ
    page: z.string().optional().transform(Number).refine(val => !isNaN(val) && val >= 0, {
        message: "Page must be a non-negative number",
    }),
    limit: z.string().optional().transform(Number).refine(val => !isNaN(val) && val > 0, {
        message: "Limit must be a positive number",
    }),
    ids: z.array(z.string().transform(Number)).optional(),
});

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams
    const parseResult = searchQuerySchema.safeParse(Object.fromEntries(searchParams));

    if (!parseResult.success) {
        return Response.json({ error: parseResult.error.errors }, { status: 400 });
    }

    const { query, tag, category, page, limit, ids } = parseResult.data;

    if (ids) {
        const res = await loadBookmarksByIds(ids)
        if ('error' in res) {
            return Response.json(res.error, { status: 500 })
        }
        return Response.json(res)
    }

    const sortOption = getSortOption(searchParams)
    const queries: string[] = []
    queries.push(query ? decodeURIComponent(query) : '');
    if (tag) {
        queries.push(convertTagToQuery(tag))
    }
    if (category) {
        queries.push(convertCategoryToQuery(category))
    }
    const res = await searchBookmarks(page, limit || 10, queries.join(','), sortOption)
    if ('error' in res) {
        return Response.json(res, { status: 500 })
    }
    return Response.json(res)
}