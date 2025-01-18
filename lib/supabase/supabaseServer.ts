import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers";
import { Database } from "./schema";

export async function createClientForServer() {
    const cookieStore = await cookies()
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!supabaseUrl) {
        throw Error('supabaseUrl is not defained')
    }
    if (!supabaseServiceRoleKey) {
        throw Error('supabaseServiceRoleKey is not defained')
    }

    return createServerClient<Database>(
        supabaseUrl,
        supabaseServiceRoleKey,
        {
            cookies: {
                getAll() {
                    return cookieStore.getAll()
                },
                setAll(cookiesToSet) {
                    try {
                        cookiesToSet.forEach(({ name, value, options }) =>
                            cookieStore.set(name, value, options)
                        )
                    } catch {
                        // The `setAll` method was called from a Server Component.
                        // This can be ignored if you have middleware refreshing
                        // user sessions.
                    }
                },
            },
        }
    )
}

export type SupabaseClient = Awaited<ReturnType<typeof createClientForServer>>