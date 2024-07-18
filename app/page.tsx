import { createClientForServer } from "@/lib/supabase/supabaseServer";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Home() {
  const supabase = createClientForServer()
  const { data, error } = await supabase.auth.getUser()
  if (data?.user) {
    redirect('/app')
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      HOME
      <Link href="/signin">Signin</Link>
      <Link href="/signup">Signup</Link>
    </main>
  );
}
