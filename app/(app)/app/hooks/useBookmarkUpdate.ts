import { useCallback, useState } from "react"
import { useOgp } from "./useOgp"
import { BookmarkType } from "@/lib/repositories/bookmarks"
import { useTags } from "./useTags";
import { TagUsageType } from "@/lib/repositories/tags";
import { handleUpdateBookmark, HandleUpdateBookmarkReturnType } from "../_actions/handleUpdateBookmark";
import { handleAndAddTags } from "../_actions/handleAddTags";
import { handleDeleteBookmark } from "../_actions/handleDeleteBookmark";

const removeTag = (tags: TagUsageType[], tag: TagUsageType) => {
    return tags.filter(t => t !== tag)
}

export const useBookmarkUpdate = (initialTags: TagUsageType[], bookmark?: BookmarkType, initCategory?: number) => {
    const [note, setNote] = useState(bookmark?.note || '');
    const [category, setCategory] = useState(initCategory || bookmark?.categoryId || null);
    const { unregisteredTags, registeredTags, setRegisteredTags, setUnregisteredTags } = useTags(initialTags)
    const { ogp, refetch } = useOgp(bookmark?.url || null, true);

    const [updateResult, setUpdateResult] = useState<HandleUpdateBookmarkReturnType>()
    const [error, setError] = useState<string>()

    const handleSubmit = useCallback(async () => {
        if (!bookmark) return false
        let targetTags = registeredTags.map(v => v.tagId)
        if (unregisteredTags.length > 0) {
            const result = await handleAndAddTags(unregisteredTags)
            if (result.error) {
                console.error(result.error)
                return false
            }
            if (result.tags) {
                targetTags = [...targetTags, ...result.tags.map((tag) => tag.tagId)];
            }
        }
        const result = await handleUpdateBookmark({
            url: bookmark.url,
            title: ogp?.title || bookmark.ogpTitle,
            description: ogp?.description || bookmark.ogpDescription,
            imageUrl: ogp?.image?.url || bookmark.ogpImage,
            note,
            category,
            tags: targetTags
        })
        setUpdateResult(result)
        return true
    }, [bookmark, ogp, note, category, registeredTags, unregisteredTags])

    const handleDelete = useCallback(async () => {
        if (!bookmark) return false
        const { error } = await handleDeleteBookmark({ bookmarkId: bookmark.bookmarkId })
        if (error) {
            setError(error)
            return false
        }
        return true
    }, [bookmark])

    const handleClearTag = useCallback((tag: TagUsageType, registered: boolean) => {
        registered ? setUnregisteredTags(before => removeTag(before, tag)) :
            setRegisteredTags(before => removeTag(before, tag))
    }, [])

    const handleSelectTag = useCallback((tag: TagUsageType, registered: boolean) => {
        registered ? setRegisteredTags(before => [...before, tag]) :
            setUnregisteredTags(before => [...before, tag])
    }, [])


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
        unregisteredTags,
        registeredTags,
        handleDelete,
        handleClearTag,
        handleSelectTag
    }
}