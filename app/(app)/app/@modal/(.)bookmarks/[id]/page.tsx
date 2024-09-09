import { fetchBookmark } from "@/lib/repositories/bookmarks"
import { createClientForServer } from "@/lib/supabase/supabaseServer"
import { redirect } from "next/navigation"
import BookmarkDialogContent from "./BookmarkDialogContent"
import { fetchCategories } from "@/lib/repositories/categories"

export default async function Bookmark({ params }: { params: { id: string } }) {
    const supabase = createClientForServer()
    const { data: userData, error } = await supabase.auth.getUser()
    if (error || !userData?.user) {
        redirect('/signin')
    }
    const bookmark = await fetchBookmark(supabase, userData.user.id, Number(params.id))
    const categories = await fetchCategories(supabase, userData.user.id)
    return <BookmarkDialogContent bookmark={bookmark} categories={categories} />
}