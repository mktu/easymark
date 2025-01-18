import { getBookmark } from "@/lib/repositories/bookmarks"
import { createClientForServer } from "@/lib/supabase/supabaseServer"
import { redirect } from "next/navigation"
import BookmarkContent from "./BookmarkContent"
import { getCategories } from "@/lib/repositories/categories"
import { getTagUsageByBookmarkId } from "@/lib/repositories/tag_usage"
import Loading from "./loading"

export default async function Bookmark(
    props: {
        params: Promise<{ id: string }>,
        searchParams: Promise<{ [key: string]: string | string[] | undefined }>
    }
) {
    const searchParams = await props.searchParams;
    const params = await props.params;
    const supabase = await createClientForServer()
    const { data: userData, error } = await supabase.auth.getUser()
    const selectedCategoryId = searchParams.category ? Number(searchParams.category) : undefined
    if (error || !userData?.user) {
        redirect('/signin')
    }
    const bookmark = await getBookmark(supabase, userData.user.id, Number(params.id))
    const categories = await getCategories(supabase, userData.user.id)
    const tagUsage = await getTagUsageByBookmarkId(supabase, userData.user.id, bookmark.bookmarkId)
    if ('error' in tagUsage) {
        throw new Error(tagUsage.error)
    }
    return <BookmarkContent tagUsage={tagUsage} bookmark={bookmark} categories={categories} selectedCategoryId={selectedCategoryId} />
}