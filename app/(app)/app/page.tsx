import { createClientForServer } from "@/lib/supabase/supabaseServer";
import { redirect } from "next/navigation";

export default async function Home() {

    return (
        <div className="flex min-h-screen flex-col items-center justify-between p-24">
            your home page
        </div>
    );
}
