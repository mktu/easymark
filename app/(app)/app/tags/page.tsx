import { fetchCategoriesWithBookmarkCount } from "@/lib/repositories/categories"
import { fetchTags } from "@/lib/repositories/tags"
import { createClientForServer } from "@/lib/supabase/supabaseServer"
import { redirect } from "next/navigation"
import Tags from "./_components/Tags"

export default async function CategoriesPage() {
    const supabase = createClientForServer()
    const { data: userData, error } = await supabase.auth.getUser()

    if (error || !userData?.user) {
        redirect('/signin')
    }
    const tags = await fetchTags(supabase, userData.user.id)

    return <Tags tags={tags} />
}