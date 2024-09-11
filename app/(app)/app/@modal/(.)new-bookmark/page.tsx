import { fetchCategories } from "@/lib/repositories/categories"
import NewBookmarkDialog from "./NewBookmarkDialog"
import { createClientForServer } from "@/lib/supabase/supabaseServer"
import { redirect } from "next/navigation"

export default async function NewBookmark() {
    const supabase = createClientForServer()
    const { data: userData, error } = await supabase.auth.getUser()
    if (error || !userData?.user) {
        redirect('/signin')
    }
    const categories = await fetchCategories(supabase, userData.user.id)
    return <NewBookmarkDialog categories={categories} />
}