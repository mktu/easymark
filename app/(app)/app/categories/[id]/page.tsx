import { fetchCategory } from "@/lib/repositories/categories"
import { createClientForServer } from "@/lib/supabase/supabaseServer"
import { redirect } from "next/navigation"
import CategoryPage from "./_CategoryPage"
import { fetchBookmarksByCategory } from "@/lib/repositories/bookmarks"

export default async function Page({ params }: { params: { id: number } }) {
    const supabase = createClientForServer()
    const { data: userData, error } = await supabase.auth.getUser()

    if (error || !userData?.user) {
        redirect('/signin')
    }
    if (!params.id) {
        redirect('/categories')
    }

    const category = await fetchCategory(supabase, userData.user.id, params.id)
    const bookmarks = await fetchBookmarksByCategory(supabase, userData.user.id, category.categoryId)

    return <CategoryPage category={category} bookmarks={bookmarks} />
}