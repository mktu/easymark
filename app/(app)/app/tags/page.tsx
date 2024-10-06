import { fetchTagUsage } from "@/lib/repositories/tags"
import { createClientForServer } from "@/lib/supabase/supabaseServer"
import { redirect } from "next/navigation"
import Tags from "./_components/Tags"

export default async function CategoriesPage() {
    const supabase = createClientForServer()
    const { data: userData, error } = await supabase.auth.getUser()

    if (error || !userData?.user) {
        redirect('/signin')
    }
    const tags = await fetchTagUsage(supabase, userData.user.id, 200)

    if ('error' in tags) {
        throw new Error(tags.error)
    }

    return <Tags tags={tags} />
}