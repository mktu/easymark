import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "../supabase/schema";

export const hasOgp = async (supabase: SupabaseClient<Database>, url: string) => {
    // check if already exitst ogp data
    const { data: ogpData } = await supabase.from('ogp_data').select('url').eq('url', url);
    return ogpData && ogpData.length > 0
}

export const importOgps = async (supabase: SupabaseClient<Database>, ogps: {
    url: string,
    title?: string | null,
    description?: string | null,
    imageUrl?: string | null,
}[]) => {
    const { error: ogpError, data } = await supabase.from('ogp_data').upsert(ogps.map(o => ({
        url: o.url,
        title: o.title,
        description: o.description,
        image_url: o.imageUrl
    })), { onConflict: 'url' }).select('*');
    const importedUrls = data?.map(v => v.url) || []
    if (ogpError) {
        console.error(ogpError)
        if (importedUrls.length === 0) {
            return { error: 'cannnot import ogp data' }
        }
    }
    return {
        success: true,
        failedUrls: ogps.filter(v => !importedUrls.includes(v.url)).map(v => v.url)
    }
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