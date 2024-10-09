import { createClientForServer } from "@/lib/supabase/supabaseServer";
import { NextResponse } from "next/server";

export async function GET(_: Request, { params }: { params: { bookmarkId: string } }) {
    const bookmarkId = params.bookmarkId;
    const supabase = createClientForServer();
    const { data: authData } = await supabase.auth.getUser();
    if (!authData?.user) {
        return NextResponse.json({ error: 'not authenticated' }, { status: 401 })
    }
    const { error: bookmarkerror, data } = await supabase.from('bookmarks_with_ogp').select().eq('bookmark_id', bookmarkId).eq('user_id', authData.user.id);
    if (bookmarkerror) {
        console.error(bookmarkerror)
        return NextResponse.json({ error: 'cannnot add bookmark' }, { status: 500 })
    }
    return NextResponse.json({
        bookmark: data
    })
}