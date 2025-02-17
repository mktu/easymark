import { getCategoriesWithBookmarkCount } from "@/lib/repositories/categories"
import { createClientForServer } from "@/lib/supabase/supabaseServer"
import { redirect } from "next/navigation"
import Categories from "./Categories"

export default async function CategoriesPage() {
    const supabase = await createClientForServer()
    const { data: userData, error } = await supabase.auth.getUser()

    if (error || !userData?.user) {
        redirect('/signin')
    }

    const categories = await getCategoriesWithBookmarkCount(supabase, userData.user.id)

    return <Categories categories={categories} />
}