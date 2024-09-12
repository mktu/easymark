import { useState } from "react"
import { useOgp } from "./useOgp"
import { BookmarkType } from "@/lib/repositories/bookmarks"

export const useBookmarkUpdate = (bookmark?: BookmarkType, initCategory?: number) => {
    const [note, setNote] = useState(bookmark?.note || '');
    const [category, setCategory] = useState(initCategory || bookmark?.categoryId || null);
    const { ogp, refetch } = useOgp(bookmark?.url || null, true);
    return {
        refetch,
        setNote,
        note,
        ogp,
        category,
        setCategory
    }
}