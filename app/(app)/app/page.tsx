import { createClientForServer } from "@/lib/supabase/supabaseServer";
import { redirect } from "next/navigation";
import { Welcome } from "./_components/Welcome";

export default async function Home() {

    const supabase = createClientForServer()
    // get recent bookmarks
    const { data, error } = await supabase.auth.getUser()
    if (error || !data?.user) {
        redirect('/signin')
    }
    const { data: profile } = await supabase.from('users').select('*').eq('id', data?.user.id).limit(1)
    if (profile?.length === 0) {
        redirect('/register')
    }
    const { data: bookmarks } = await supabase.from('bookmarks').select('*').eq('user_id', data?.user.id).order('created_at', { ascending: false }).limit(5)
    const categories = await supabase.from('categories').select('*').eq('user_id', data?.user.id)
    return (
        <div className="flex min-h-screen flex-col items-center justify-between p-24">
            {bookmarks && bookmarks.length > 0 ? (
                <Home />) : (
                <Welcome user={{ username: profile?.[0].username! }} />
            )}
        </div>
    );
}
