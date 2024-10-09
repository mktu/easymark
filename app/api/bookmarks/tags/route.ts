import { fetchBookmarkTags } from "@/lib/repositories/bookmark_tags";
import { createClientForServer } from "@/lib/supabase/supabaseServer";
import { NextResponse } from "next/server";

export async function GET() {
    const supabase = createClientForServer();
    const { data: authData } = await supabase.auth.getUser();
    if (!authData?.user) {
        return NextResponse.json({ error: 'not authenticated' }, { status: 401 })
    }
    const result = await fetchBookmarkTags(supabase, { userId: authData.user.id })
    if ('error' in result) {
        return NextResponse.json({ error: result.error }, { status: 500 })
    }

    return NextResponse.json({
        bookmarks: result,
    }, { status: 200 });
}
