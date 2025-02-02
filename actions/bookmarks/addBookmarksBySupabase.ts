import { addBookmark } from "@/lib/repositories/bookmarks"
import { addOgp, hasOgp } from "@/lib/repositories/ogps"
import { doScrape } from "@/lib/supabase/ogp"
import { SupabaseClient } from "@/lib/supabase/supabaseServer"

export const addBookmarksBySupabase = async (data: {
    url: string,
    userId: string,
    title?: string | null,
    description?: string | null,
    imageUrl?: string | null,
    note?: string | null,
    category?: number | null
}, supabase: SupabaseClient) => {
    let description = data.description
    let imageUrl = data.imageUrl
    let title = data.title
    const { url, note, category, userId } = data
    const { error: bookmarkerror } = await addBookmark(supabase, { url, note, userId, categoryId: category })
    if (bookmarkerror) {
        return { error: bookmarkerror }
    }
    if (!description) {
        try {
            const ret = await doScrape(url)
            description = ret.description
            imageUrl = ret.image?.url
            title = ret.title
        } catch (e) {
            console.error(e)
        }
    }
    if (await hasOgp(supabase, url)) {
        return {
            success: true
        }
    }
    const { error: ogpError } = await addOgp(supabase, { url, title, description, imageUrl });
    if (ogpError) {
        return { error: ogpError }
    }
}