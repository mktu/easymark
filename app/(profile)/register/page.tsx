import { createClientForServer } from "@/lib/supabase/supabaseServer";
import RegisterForm from "../_components/RegisterForm"
import { redirect } from "next/navigation";

export default async function Page() {
    const supabase = createClientForServer()
    const { data, error } = await supabase.auth.getUser()
    if (error || !data?.user) {
        redirect('/signin')
    }
    const res = await supabase.from('users').select('*').eq('id', data.user.id)
    if (res.error) {
        console.error(res.error)
        throw new Error('Failed to load user')
    }
    if (res.data?.length > 0) {
        redirect('/app/profile')
    }

    return (
        <RegisterForm />
    );
}
