'use server'
import { createClientForServer } from "@/lib/supabase/supabaseServer";
import { redirect } from "next/navigation";
import { searchBookmarks } from "@/lib/repositories/bookmarks";
import { getCategories } from "@/lib/repositories/categories";
import { fetchUser } from "@/lib/repositories/profile";
import { Welcome } from "./_component/Welcome";
import { Home } from "./_component/Home";

export default async function AppHome() {

    const supabase = await createClientForServer()
    // get recent bookmarks
    const { data: userData, error } = await supabase.auth.getUser()
    if (error || !userData?.user) {
        redirect('/signin')
    }
    const user = await fetchUser(supabase, userData.user.id)
    const { bookmarks: recentBookmarks } = await searchBookmarks(supabase, { userId: userData.user.id, offset: 0, limit: 5, sortOption: 'date' })
    const { bookmarks: frequentBookmarks } = await searchBookmarks(supabase, { userId: userData.user.id, offset: 0, limit: 5, sortOption: 'frequency' })
    const categories = await getCategories(supabase, userData.user.id)
    return recentBookmarks && recentBookmarks.length > 0 ? (
        <Home recentBookmarks={recentBookmarks} frequentBookmarks={frequentBookmarks} categories={categories} user={user} />) : (
        <Welcome user={user} />
    );
}
