import { getSortOption } from "@/app/(app)/app/bookmarks/_utils/parseSortOption";
import { fetchBookmarksByPage } from "@/lib/repositories/bookmarks";
import { createClientForServer } from "@/lib/supabase/supabaseServer";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const page = Number(searchParams.get('page') as string)
    const limit = Number(searchParams.get('limit') as string)
    const filter = searchParams.get('filter') as string
    const sortOption = getSortOption(searchParams)

    const start = page * limit;
    const end = start + limit - 1;

    const supabase = createClientForServer();
    const { data: authData } = await supabase.auth.getUser();
    if (!authData?.user) {
        return NextResponse.json({ error: 'not authenticated' }, { status: 401 })
    }
    const { bookmarks, count } = await fetchBookmarksByPage(supabase, authData.user.id, page, limit, filter, sortOption)
    return NextResponse.json({
        bookmarks: bookmarks,
        hasMore: count ? count > end : false
    }, { status: 200 })
}