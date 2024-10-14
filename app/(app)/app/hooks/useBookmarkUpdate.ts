import { useCallback, useState } from "react"
import { useOgp } from "./useOgp"
import { BookmarkType } from "@/lib/repositories/bookmarks"
import { handleUpdateBookmark, HandleUpdateBookmarkReturnType } from "../_actions/handleUpdateBookmark";
import { handleDeleteBookmark } from "../_actions/handleDeleteBookmark";
import { TagUsageType } from "@/lib/repositories/tag_usage";

export const useBookmarkUpdate = (initialTags: TagUsageType[], bookmark?: BookmarkType, initCategory?: number) => {
    const [note, setNote] = useState(bookmark?.note || '');
    const [category, setCategory] = useState(initCategory || bookmark?.categoryId || null);
    const [registeredTags, setRegisteredTags] = useState<TagUsageType[]>(initialTags);
    const { ogp, refetch } = useOgp(bookmark?.url || null, true);

    const [updateResult, setUpdateResult] = useState<HandleUpdateBookmarkReturnType>()
    const [error, setError] = useState<string>()

    const handleSubmit = useCallback(async () => {
        if (!bookmark) return false
        const result = await handleUpdateBookmark({
            url: bookmark.url,
            title: ogp?.title || bookmark.ogpTitle,
            description: ogp?.description || bookmark.ogpDescription,
            imageUrl: ogp?.image?.url || bookmark.ogpImage,
            note,
            category,
            tags: registeredTags.map(v => v.tagId)
        })
        setUpdateResult(result)
        return true
    }, [bookmark, ogp, note, category, registeredTags])

    const handleDelete = useCallback(async () => {
        if (!bookmark) return false
        const { error } = await handleDeleteBookmark({ bookmarkId: bookmark.bookmarkId })
        if (error) {
            setError(error)
            return false
        }
        return true
    }, [bookmark])

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
        refetch,
        setNote,
        note,
        ogp,
        category,
        setCategory,
        updateResult,
        error,
        handleSubmit,
        registeredTags,
        handleDelete,
        handleClearTag,
        handleSelectTag,
        handleClearAllTags
    }
}