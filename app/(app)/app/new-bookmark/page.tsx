import { createClientForServer } from "@/lib/supabase/supabaseServer";
import NewBookmark from "./NewBookmark";
import { redirect } from "next/navigation";
import { fetchCategories } from "@/lib/repositories/categories";

export default async function Page() {
    const supabase = createClientForServer()
    const { data: userData, error } = await supabase.auth.getUser()
    if (error || !userData?.user) {
        redirect('/signin')
    }
    const categories = await fetchCategories(supabase, userData.user.id)
    return (
        <NewBookmark categories={categories} />
    )
}