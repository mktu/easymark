import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "../supabase/schema";

export const hasOgp = async (supabase: SupabaseClient<Database>, url: string) => {
    // check if already exitst ogp data
    const { data: ogpData } = await supabase.from('ogp_data').select('url').eq('url', url);
    return ogpData && ogpData.length > 0
}

export const addOgp = async (supabase: SupabaseClient<Database>, {
    url,
    title,
    description,
    imageUrl
}: {
    url: string,
    title?: string | null,
    description?: string | null,
    imageUrl?: string | null,
}) => {
    const { error: ogpError } = await supabase.from('ogp_data').insert({ url, title, description, image_url: imageUrl });
    if (ogpError) {
        console.error(ogpError)
        return {
            error: 'cannnot add ogp data'
        }
    }
    return {
        error: null
    }
}

export const upsertOgp = async (supabase: SupabaseClient<Database>, {
    url,
    title,
    description,
    imageUrl
}: {
    url: string,
    title?: string | null,
    description?: string | null,
    imageUrl?: string | null,
}) => {
    const { error: ogpError } = await supabase.from('ogp_data').upsert({
        url,
        title,
        description,
        image_url: imageUrl
    });
    if (ogpError) {
        console.error(ogpError)
        return { error: 'cannnot add ogp data' }
    }
    return {
        error: null
    }
}