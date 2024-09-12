import { useMemo, useState } from "react"
import { validateURL } from "../_lib/validateUrl"
import { useOgp } from "./useOgp"

export const useBookmarkInput = (initialCategoryId?: number) => {
    const [bookmark, setBookmark] = useState('')
    const [note, setNote] = useState('')
    const [category, setCategory] = useState<number | null>(initialCategoryId || null);
    const validBookmark = useMemo(() => bookmark && validateURL(bookmark), [bookmark])
    const { ogp } = useOgp(bookmark && validBookmark ? bookmark : null);
    return {
        validBookmark,
        bookmark,
        setBookmark,
        ogp,
        note,
        setNote,
        category,
        setCategory
    }
}