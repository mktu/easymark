import { BookmarkType } from "@/lib/repositories/bookmarks";
import { BookmarkSortOption } from "@/lib/types";
import { useCallback, useDeferredValue, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

type FetchDataType = {
    bookmarks: BookmarkType[],
    hasMore: boolean
}

export const useBookmarks = (filter?: string, sortOption?: BookmarkSortOption, category?: number | null, initialBookmarks?: BookmarkType[], initialHasMore?: Boolean) => {
    const { ref: bookmarkLoaderRef, inView } = useInView({ initialInView: false });
    const [page, setPage] = useState(0);
    const deferredFilter = useDeferredValue(filter);
    const [bookmarks, setBookmarks] = useState<BookmarkType[]>(initialBookmarks || []);
    const [hasMore, setHasMore] = useState(Boolean(initialHasMore));

    const fetchBookmarks = useCallback(async () => {
        if (page === 0) {
            return;
        }
        const result = await fetch(`/api/bookmarks?page=${page}&filter=${deferredFilter || ''}&sort=${sortOption}&category=${category || ''}&limit=10`)
        const { bookmarks: dataBookmarks, hasMore: dataHasMore } = await result.json() as FetchDataType;
        setHasMore(dataHasMore);
        setBookmarks(prev => {
            // remove duplicates
            const newBookmarks = dataBookmarks.filter(newBookmark => !prev.some(prevBookmark => prevBookmark.bookmarkId === newBookmark.bookmarkId));
            return [...prev, ...newBookmarks];
        });
        return dataBookmarks;
    }, [deferredFilter, page]);


    useEffect(() => {
        fetchBookmarks()
    }, [fetchBookmarks]);

    useEffect(() => {
        if (inView && hasMore) {
            setPage(prev => prev + 1);
        }
    }, [hasMore, inView]);

    return {
        bookmarks,
        hasMore,
        bookmarkLoaderRef,
    }
}

