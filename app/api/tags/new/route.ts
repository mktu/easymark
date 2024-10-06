import { addTag } from "@/lib/repositories/tags";
import { createClientForServer } from "@/lib/supabase/supabaseServer";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const tag = searchParams.get('tag')
    const supabase = createClientForServer();
    const { data: authData } = await supabase.auth.getUser();
    if (!authData?.user) {
        return { error: 'not authenticated' }
    }
    if (!tag) {
        return { error: 'tag is required' }
    }
    const result = await addTag(supabase, {
        userId: authData.user.id,
        name: tag
    })
    if (result.error) {
        return { error: result.error }
    }
    return NextResponse.json({
        tag: result.tag!,
    }, { status: 200 })
}