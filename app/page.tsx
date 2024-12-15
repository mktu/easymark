import { createClientForServer } from "@/lib/supabase/supabaseServer";
import { redirect } from "next/navigation";
import Landing from "./(public)/_components/Landing";

export default async function Home() {
  const supabase = createClientForServer()
  const { data, error } = await supabase.auth.getUser()
  if (data?.user) {
    redirect('/app')
  }
  return <Landing />
}
