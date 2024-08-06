import { OgpResponse } from "@/app/api/ogp/route"
import { useCallback, useEffect, useMemo, useState } from "react"
import { validateURL } from "../_lib/validateUrl"

export const useBookmarkInput = () => {
    const [bookmark, setBookmark] = useState('')
    const [ogp, setOgp] = useState<OgpResponse | null>(null)
    const validBookmark = useMemo(() => bookmark && validateURL(bookmark), [bookmark])
    const fetchOgp = useCallback(async () => {
        const params = new URLSearchParams({ url: bookmark });
        const res = await fetch('/api/ogp?' + params.toString());
        return await res.json() as OgpResponse;
    }, [bookmark])
    useEffect(() => {
        let canGo = true
        validBookmark && fetchOgp().then((ogp) => {
            if (canGo) {
                setOgp(ogp)
            }
        })
        return () => {
            canGo = false
        }
    }, [fetchOgp, validBookmark])
    return {
        validBookmark,
        bookmark,
        setBookmark,
        ogp,
    }
}