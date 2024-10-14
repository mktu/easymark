import { fetchBookmark } from "@/lib/repositories/bookmarks"
import { createClientForServer } from "@/lib/supabase/supabaseServer"
import { redirect } from "next/navigation"
import BookmarkDialogContent from "./BookmarkDialogContent"
import { getCategories } from "@/lib/repositories/categories"
import { fetchTagUsageByBookmarkId } from "@/lib/repositories/tag_usage"
import { headers } from "next/headers"

export default async function Bookmark({
    params,
    searchParams
}: {
    params: { id: string },
    searchParams: { [key: string]: string | string[] | undefined }
}) {
    const supabase = createClientForServer()
    const { data: userData, error } = await supabase.auth.getUser()
    const selectedCategoryId = searchParams.category ? Number(searchParams.category) : undefined
    if (error || !userData?.user) {
        redirect('/signin')
    }
    const bookmark = await fetchBookmark(supabase, userData.user.id, Number(params.id))
    const categories = await getCategories(supabase, userData.user.id)
    const tagUsage = await fetchTagUsageByBookmarkId(supabase, userData.user.id, bookmark.bookmarkId)
    const headersList = headers()
    const referer = headersList.get('referer')
    if ('error' in tagUsage) {
        throw new Error(tagUsage.error)
    }
    return <BookmarkDialogContent from={referer} tagUsage={tagUsage} bookmark={bookmark} categories={categories} selectedCategoryId={selectedCategoryId} />
}