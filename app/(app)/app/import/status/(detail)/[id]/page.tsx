import { createClientForServer } from "@/lib/supabase/supabaseServer";
import { loadImportingStatus } from "@/loader/import/loadImportingStaus";
import { redirect } from "next/navigation";
import ImportStatusView from "./_components/ImportStatusView";

export default async function Page(props: { params: Promise<{ id: number }> }) {
    const params = await props.params;
    const supabase = await createClientForServer()
    const { data: userData, error } = await supabase.auth.getUser()
    if (error || !userData?.user) {
        redirect('/signin')
    }
    const { id } = params
    const importStatus = await loadImportingStatus(Number(id))

    if ('error' in importStatus) {
        return <div>{importStatus.error}</div>
    }

    return <ImportStatusView importStatus={importStatus} />
}