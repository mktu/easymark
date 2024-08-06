'use server'
import { createClientForServer } from "@/lib/supabase/supabaseServer";
import { redirect } from "next/navigation";
import { Welcome } from "./_components/Welcome";
import { Home } from "./_components/Home";
import { fetchBookmarks } from "@/lib/repositories/bookmarks";
import { fetchCategories } from "@/lib/repositories/categories";
import { fetchUser } from "@/lib/repositories/profile";

export default async function App() {

    const supabase = createClientForServer()
    // get recent bookmarks
    const { data: userData, error } = await supabase.auth.getUser()
    if (error || !userData?.user) {
        redirect('/signin')
    }
    const user = await fetchUser(supabase, userData.user.id)
    const bookmarks = await fetchBookmarks(supabase, userData.user.id)
    const categories = await fetchCategories(supabase, userData.user.id)
    return (
        <div className="flex flex-col items-center justify-between p-24">
            {bookmarks && bookmarks.length > 0 ? (
                <Home bookmarks={bookmarks} categories={categories} user={user} />) : (
                <Welcome user={user} />
            )}
        </div>
    );
}
