import { createClientForServer } from "@/lib/supabase/supabaseServer";
import NewBookmark from "./NewBookmark";
import { redirect } from "next/navigation";
import { getCategories } from "@/lib/repositories/categories";

export default async function Page({ searchParams }: {
    searchParams: { [key: string]: string | string[] | undefined }
}) {
    const supabase = createClientForServer()
    const { data: userData, error } = await supabase.auth.getUser()
    const selectedCategoryId = searchParams.category ? Number(searchParams.category) : undefined
    if (error || !userData?.user) {
        redirect('/signin')
    }
    const categories = await getCategories(supabase, userData.user.id)
    return (
        <NewBookmark categories={categories} selectedCategoryId={selectedCategoryId} />
    )
}