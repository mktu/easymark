import { createClientForServer } from "@/lib/supabase/supabaseServer"
import { redirect } from "next/navigation"
import Tags from "./_components/Tags"
import { MaxTagSize } from "@/lib/constants"
import { getTagUsage } from "@/lib/repositories/tag_usage"

export default async function TagsPage() {
    const supabase = await createClientForServer()
    const { data: userData, error } = await supabase.auth.getUser()

    if (error || !userData?.user) {
        redirect('/signin')
    }
    const tags = await getTagUsage(supabase, userData.user.id, MaxTagSize)

    if ('error' in tags) {
        throw new Error(tags.error)
    }

    return <Tags tags={tags} />
}