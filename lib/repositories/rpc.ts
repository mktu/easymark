import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "../supabase/schema";

export const fetchLastUpdateTime = async (supabase: SupabaseClient<Database>, userId: string) => {
    let { data, error } = await supabase
        .rpc('get_last_updated_time', { input_user_id: userId });

    if (error) {
        console.error('Error:', error);
        throw Error('cannot fetch last updated at')
    }
    return data;
}