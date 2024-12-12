import { type NextRequest } from 'next/server'
import { updateSession } from './lib/supabase/midleware'
import { loadViewport } from './app/_loaders/loadViewport'

export async function middleware(request: NextRequest) {
    const res = await updateSession(request)
    return loadViewport(request, res)
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * Feel free to modify this pattern to include more paths.
         */
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
}