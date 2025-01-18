import { createClientForServer } from "@/lib/supabase/supabaseServer";
import { redirect } from "next/navigation";
import Import from "./_component/Import";

export default async function Page() {
    const supabase = await createClientForServer()
    const { data: userData, error } = await supabase.auth.getUser()
    if (error || !userData?.user) {
        redirect('/signin')
    }

    return <Import />
}