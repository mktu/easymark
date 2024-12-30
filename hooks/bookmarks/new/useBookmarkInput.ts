import { useCallback, useMemo, useState } from "react"
import { validateURL } from "../../../app/(app)/app/_lib/validateUrl"
import { handleAddBookmark, HandleAddBookmarkReturnType } from "../../../app/(app)/app/_actions/handleAddBookmark"
import { TagUsageType } from "@/lib/repositories/tag_usage"
import { useOgp } from "../ogp/useOgp"

export const useBookmarkInput = (initialCategoryId?: number) => {
    const [bookmark, setBookmark] = useState('')
    const [note, setNote] = useState('')
    const [addBookmarkResult, setAddBookmarkResult] = useState<HandleAddBookmarkReturnType>()
    const [category, setCategory] = useState<number | null>(initialCategoryId || null);
    const validBookmark = useMemo(() => bookmark && validateURL(bookmark), [bookmark])
    const { ogp } = useOgp(bookmark && validBookmark ? bookmark : null);
    const [registeredTags, setRegisteredTags] = useState<TagUsageType[]>([]);

    const handleSubmit = useCallback(async () => {
        const result = await handleAddBookmark({
            url: bookmark,
            title: ogp?.title,
            description: ogp?.description,
            imageUrl: ogp?.image?.url,
            note,
            category
        })
        setAddBookmarkResult(result)
        if (!('success' in result)) {
            return false
        }
        return true
    }, [bookmark, ogp, note, category])

    const handleClearTag = useCallback((tag: TagUsageType) => {
        setRegisteredTags(before => before.filter(t => t !== tag))
    }, [setRegisteredTags])

    const handleSelectTag = useCallback((tag: TagUsageType) => {
        setRegisteredTags(before => [...before, tag])
    }, [setRegisteredTags])

    const handleClearAllTags = useCallback(() => {
        setRegisteredTags([])
    }, [setRegisteredTags])


    return {
        validBookmark,
        bookmark,
        setBookmark,
        ogp,
        note,
        setNote,
        category,
        setCategory,
        handleSubmit,
        addBookmarkResult,
        handleClearTag,
        handleSelectTag,
        registeredTags,
        handleClearAllTags
    }
}