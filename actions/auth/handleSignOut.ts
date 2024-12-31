'use server';
import { createClientForServer } from "@/lib/supabase/supabaseServer";
import { redirect } from "next/navigation";

export const handleSignout = async () => {
    const supabase = createClientForServer();
    await supabase.auth.signOut();
    redirect('/')
}