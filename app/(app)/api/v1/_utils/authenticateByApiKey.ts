import { ApiKeyType, getApiKey } from "@/lib/repositories/api_key";
import { SupabaseClient } from "@/lib/supabase/supabaseServer";
import { NextRequest } from "next/server";

export const authenticateByApiKey = async (request: NextRequest, supabase: SupabaseClient) => {
    const requestHeaders = new Headers(request.headers)
    const apiKey = requestHeaders.get('x-api-key');
    if (!apiKey) {
        return {
            error: 'Unauthorized',
            code: 401
        }
    }
    let apiKeyData: ApiKeyType;
    try {
        apiKeyData = await getApiKey(apiKey, supabase)
        if (!apiKeyData.active) {
            return {
                error: 'Api key is not active',
                code: 401
            }
        }
        if (apiKeyData.expiresAt && new Date(apiKeyData.expiresAt) < new Date()) {
            return {
                error: 'Api key is expired',
                code: 401
            }
        }
    } catch (e) {
        console.error(e)
        return {
            error: 'Unauthorized',
            code: 401
        }
    }
    return apiKeyData
}