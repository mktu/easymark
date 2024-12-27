import { decrypt, encrypt, hashApiKey } from "../encrypt";
import { Database } from "../supabase/schema";
import { SupabaseClient } from "../supabase/supabaseServer";

const convertApiKey = (apiKey: Database['public']['Tables']['api_keys']['Row']) => {
    return {
        userId: apiKey.user_id,
        apiKey: decrypt(apiKey.api_key),
        active: apiKey.active,
        expiresAt: apiKey.expires_at,
    }
}

export const getUserId = async (key: string, supabase: SupabaseClient) => {
    const { data: apiKeyData, error: apiKeyError } = await supabase
        .from('api_keys')
        .select('user_id')
        .eq('api_key', key)
        .single();

    if (apiKeyError) {
        console.error(apiKeyError)
        throw Error('cannot get apikey')
    }
    return apiKeyData.user_id
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