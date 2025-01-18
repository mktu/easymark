import { getCategories } from "@/lib/repositories/categories"
import NewBookmarkDialog from "./NewBookmarkDialog"
import { createClientForServer } from "@/lib/supabase/supabaseServer"
import { redirect } from "next/navigation"
import { headers } from "next/headers"

export default async function NewBookmark(
    props: {
        searchParams: Promise<{ [key: string]: string | string[] | undefined }>
    }
) {
    const searchParams = await props.searchParams;
    const supabase = await createClientForServer()
    const { data: userData, error } = await supabase.auth.getUser()
    const selectedCategoryId = searchParams.category ? Number(searchParams.category) : undefined
    if (error || !userData?.user) {
        redirect('/signin')
    }
    const categories = await getCategories(supabase, userData.user.id)
    const headersList = await headers()
    const referer = headersList.get('referer')
    return <NewBookmarkDialog from={referer} categories={categories} selectedCategoryId={selectedCategoryId} />
}