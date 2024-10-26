import { fetchBookmarkById } from "@/lib/repositories/bookmarks";
import { createClientForServer } from "@/lib/supabase/supabaseServer";
import { NextResponse } from "next/server";

export async function GET(_: Request, { params }: { params: { bookmarkId: string } }) {
    const bookmarkId = params.bookmarkId;
    const supabase = createClientForServer();
    const { data: authData } = await supabase.auth.getUser();
    if (!authData?.user) {
        return NextResponse.json({ error: 'not authenticated' }, { status: 401 })
    }
    const bookmark = await fetchBookmarkById(supabase, authData.user.id, Number(bookmarkId));
    return NextResponse.json({
        bookmark
    })
}