import { fetchBookmark } from "@/lib/repositories/bookmarks"
import { createClientForServer } from "@/lib/supabase/supabaseServer"
import { redirect } from "next/navigation"
import BookmarkContent from "./BookmarkContent"
import { fetchCategories } from "@/lib/repositories/categories"

export default async function Bookmark({ params, searchParams }: {
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
    const categories = await fetchCategories(supabase, userData.user.id)
    return <BookmarkContent bookmark={bookmark} categories={categories} selectedCategoryId={selectedCategoryId} />
}