import { getTagUsage, searchTagUsage } from "@/lib/repositories/tag_usage";
import { createClientForServer } from "@/lib/supabase/supabaseServer";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search')
    const limit = searchParams.get('limit') ? Number(searchParams.get('limit')) : 5
    const supabase = createClientForServer();
    const { data: authData } = await supabase.auth.getUser();
    if (!authData?.user) {
        return { error: 'not authenticated' }
    }
    if (!search) {
        const result = await getTagUsage(supabase, authData.user.id, 10)
        if ('error' in result) {
            return NextResponse.json({ error: result.error }, { status: 500 })
        }
        return NextResponse.json({
            tags: result,
        }, { status: 200 })
    }
    const result = await searchTagUsage(supabase, {
        userId: authData.user.id,
        name: search,
        limit
    })
    if ('error' in result) {
        return NextResponse.json({ error: result.error }, { status: 500 })
    }
    return NextResponse.json({
        tags: result,
    }, { status: 200 })
}