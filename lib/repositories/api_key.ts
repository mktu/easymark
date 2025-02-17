import { decrypt, encrypt, hashApiKey } from "../../logics/apikey/encrypt";
import { Database } from "../supabase/schema";
import { SupabaseClient } from "../supabase/supabaseServer";

const convertApiKey = (apiKey: Database['public']['Tables']['api_keys']['Row']) => {
    return {
        userId: apiKey.user_id,
        apiKey: decrypt(apiKey.api_key),
        active: apiKey.active,
        label: apiKey.label,
        expiresAt: apiKey.expires_at,
    }
}

export const getApiKey = async (key: string, supabase: SupabaseClient) => {
    const { data: apiKeyData, error: apiKeyError } = await supabase
        .from('api_keys')
        .select('*')
        .eq('hashed_key', hashApiKey(key))
        .single();

    if (apiKeyError) {
        console.error(apiKeyError)
        throw Error('cannot get apikey')
    }
    if (!apiKeyData) {
        throw Error('cannot get apikey')
    }
    return convertApiKey(apiKeyData!);
}

export const addApiKey = async (
    supabase: SupabaseClient,
    {
        userId,
        apiKey,
        label,
        expiredAt
    }:
        {
            userId: string,
            apiKey: string,
            label: string,
            expiredAt: string | null,
        }
) => {
    const { error: apiKeyError } = await supabase
        .from('api_keys')
        .insert({
            user_id: userId,
            hashed_key: hashApiKey(apiKey),
            api_key: encrypt(apiKey),
            label,
            active: true,
            expires_at: expiredAt
        });

    if (apiKeyError) {
        console.error(apiKeyError)
        throw Error('cannot add apikey')
    }
}

export const deleteApiKey = async (userId: string, apiKey: string, supabase: SupabaseClient) => {
    const key = hashApiKey(apiKey)
    const { error: apiKeyError } = await supabase
        .from('api_keys')
        .delete()
        .eq('user_id', userId)
        .eq('hashed_key', key);

    if (apiKeyError) {
        console.error(apiKeyError)
        throw Error('cannot delete apikey')
    }
}


export const getApiKeys = async (userId: string, supabase: SupabaseClient) => {
    const { data: apiKeyData, error: apiKeyError } = await supabase
        .from('api_keys')
        .select('*')
        .eq('user_id', userId);

    if (apiKeyError) {
        console.error(apiKeyError)
        throw Error('cannot get apikey')
    }
    if (!apiKeyData || apiKeyData.length === 0) {
        return [];
    }
    return apiKeyData.map(convertApiKey);
}

export type ApiKeyType = ReturnType<typeof convertApiKey>