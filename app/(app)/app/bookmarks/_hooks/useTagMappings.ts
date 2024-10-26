import { useSignalContext } from "@/contexts/signal";
import { BookmarkTagsType } from "@/lib/repositories/bookmark_tags";
import { useCallback, useEffect, useState } from "react";

export const useTagMappings = () => {
    const [bookmarkTags, setBookmarkTags] = useState<BookmarkTagsType>({});
    const { fireBookmarkTagSignal, bookmarkTagSignal } = useSignalContext();

    const fetchBookmarkTags = useCallback(async () => {
        const result = await fetch(`/api/bookmarks/tags`)
        const json = await result.json() as { bookmarks: BookmarkTagsType } | { error: string }
        if ('error' in json) {
            console.error(json.error)
            return
        }
        setBookmarkTags(json.bookmarks)
    }, []);

    useEffect(() => {
        fetchBookmarkTags()
    }, [fetchBookmarkTags]);

    useEffect(() => {
        if (bookmarkTagSignal) {
            fetchBookmarkTags()
            fireBookmarkTagSignal(false)
        }
    }, [bookmarkTagSignal, fireBookmarkTagSignal])

    return {
        bookmarkTags
    }

}