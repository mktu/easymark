import { addTag } from "@/lib/repositories/tags";
import { createClientForServer } from "@/lib/supabase/supabaseServer";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const tag = searchParams.get('tag')
    const supabase = createClientForServer();
    const { data: authData } = await supabase.auth.getUser();
    if (!authData?.user) {
        return NextResponse.json({ error: 'not authenticated' }, { status: 401 })
    }
    if (!tag) {
        return NextResponse.json({ error: 'tag is required' }, { status: 400 })
    }
    const result = await addTag(supabase, {
        userId: authData.user.id,
        name: tag
    })
    if (result.error) {
        return NextResponse.json({ error: result.error }, { status: 500 })
    }
    return NextResponse.json({
        tag: result.tag!,
    }, { status: 200 })
}