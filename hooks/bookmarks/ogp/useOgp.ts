import { OgpResponse } from "@/lib/supabase/ogp";
import { useCallback, useEffect, useState } from "react";

export const useOgp = (url: string | null, manual = false) => {
    const [ogp, setOgp] = useState<OgpResponse | null>(null)
    const fetchOgp = useCallback(async (url: string) => {
        const params = new URLSearchParams({ url });
        const res = await fetch('/api/ogp?' + params.toString());
        return await res.json() as OgpResponse;
    }, [])
    useEffect(() => {
        let canGo = true
        url && !manual && fetchOgp(url).then((ogp) => {
            if (canGo) {
                setOgp(ogp)
            }
        })
        return () => {
            canGo = false
        }
    }, [fetchOgp, manual, url])
    const refetch = useCallback(() => {
        fetchOgp(url || '').then(setOgp)
    }, [fetchOgp, url]);
    return {
        ogp,
        refetch
    }
}