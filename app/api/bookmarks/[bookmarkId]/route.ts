import { createClientForServer } from "@/lib/supabase/supabaseServer";
import { NextResponse } from "next/server";

export async function GET(_: Request, { params }: { params: { bookmarkId: string } }) {
    const bookmarkId = params.bookmarkId;
    const supabase = createClientForServer();
    const { data: authData } = await supabase.auth.getUser();
    if (!authData?.user) {
        return { error: 'not authenticated' }
    }
    const { error: bookmarkerror, data } = await supabase.from('bookmarks_with_ogp').select().eq('bookmark_id', bookmarkId).eq('user_id', authData.user.id);
    if (bookmarkerror) {
        console.error(bookmarkerror)
        return { error: 'cannnot add bookmark' }
    }
    return NextResponse.json({
        bookmark: data
    })
}