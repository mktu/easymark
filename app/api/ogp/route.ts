import { doScrape } from '@/lib/supabase/ogp'
import { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url)
    const url = searchParams.get('url') as string
    const ret = await doScrape(url)
    return Response.json(ret)
}