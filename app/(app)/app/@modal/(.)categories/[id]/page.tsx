import { getCategory } from "@/lib/repositories/categories"
import { createClientForServer } from "@/lib/supabase/supabaseServer"
import { redirect } from "next/navigation"
import CategoryDialogContent from "./CategoryDialogContent"

export default async function Page(props: { params: Promise<{ id: number }> }) {
    const params = await props.params;
    const supabase = await createClientForServer()
    const { data: userData, error } = await supabase.auth.getUser()

    if (error || !userData?.user) {
        redirect('/signin')
    }
    if (!params.id) {
        redirect('/categories')
    }

    const category = await getCategory(supabase, userData.user.id, params.id)

    return <CategoryDialogContent category={category} />
}