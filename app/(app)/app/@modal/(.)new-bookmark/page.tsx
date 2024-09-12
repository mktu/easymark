import { fetchCategories } from "@/lib/repositories/categories"
import NewBookmarkDialog from "./NewBookmarkDialog"
import { createClientForServer } from "@/lib/supabase/supabaseServer"
import { redirect } from "next/navigation"

export default async function NewBookmark({ searchParams }: {
    searchParams: { [key: string]: string | string[] | undefined }
}) {
    const supabase = createClientForServer()
    const { data: userData, error } = await supabase.auth.getUser()
    const selectedCategoryId = searchParams.category ? Number(searchParams.category) : undefined
    if (error || !userData?.user) {
        redirect('/signin')
    }
    const categories = await fetchCategories(supabase, userData.user.id)
    return <NewBookmarkDialog categories={categories} selectedCategoryId={selectedCategoryId} />
}