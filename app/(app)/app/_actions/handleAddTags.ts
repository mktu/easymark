'use server'
import { addTags } from "@/lib/repositories/tags";
import { createClientForServer } from "@/lib/supabase/supabaseServer";
import { revalidatePath } from "next/cache";

export const handleAndAddTags = async (data: {
    name: string,
}[]) => {
    const supabase = createClientForServer();
    const { data: authData } = await supabase.auth.getUser();
    if (!authData?.user) {
        return { error: 'not authenticated' }
    }
    const { error: tagerror, tags } = await addTags(supabase, data.map(d => ({ name: d.name, userId: authData.user.id })))
    if (tagerror) {
        return { error: tagerror }
    }
    revalidatePath('/')
    return {
        success: true,
        tags
    }
}
