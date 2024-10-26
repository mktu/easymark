import { useSignalContext } from "@/contexts/signal";
import { BookmarkType } from "@/lib/repositories/bookmarks";
import { BookmarkSortOption } from "@/lib/types";
import { useCallback, useDeferredValue, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { handleFetchBookmarks, handleFetchBookmarksByIds } from "../_actions/handleFetchBookmarks";
import { useTagMappings } from "./useTagMappings";

export const useBookmarks = (tags: number[] | null, filter?: string, sortOption?: BookmarkSortOption, category?: number | null, initialBookmarks?: BookmarkType[], initialHasMore?: Boolean) => {
    const { ref: bookmarkLoaderRef, inView } = useInView({ initialInView: false });
    const [page, setPage] = useState(0);
    const deferredFilter = useDeferredValue(filter);
    const [bookmarks, setBookmarks] = useState<BookmarkType[]>(initialBookmarks || []);
    const [hasMore, setHasMore] = useState(Boolean(initialHasMore));
    const [checked, setChecked] = useState<number[]>([]);
    const { fetchBookmarkSignal, fireBookmarkFetchSignal, bookmarkReloadSignal, fireBookmarkReloadSignal } = useSignalContext();
    const { bookmarkTags } = useTagMappings();

    const fetchBookmarks = useCallback(async (targetPage: number) => {
        const result = await handleFetchBookmarks(targetPage, 10, tags, deferredFilter, sortOption, category)
        if (result.error) {
            console.error(result.error)
            return
        }
        const { bookmarks: dataBookmarks, hasMore: dataHasMore } = result
        if (!dataBookmarks) {
            return
        }
        setHasMore(dataHasMore);
        setBookmarks(prev => {
            // data cleansing
            const renewed = prev.map(bookmark => dataBookmarks.find(newBookmark => newBookmark.bookmarkId === bookmark.bookmarkId) || bookmark);
            // remove duplicates
            const newBookmarks = dataBookmarks.filter(newBookmark => !prev.some(prevBookmark => prevBookmark.bookmarkId === newBookmark.bookmarkId));
            return [...renewed, ...newBookmarks];
        });
        return dataBookmarks;
    }, [category, deferredFilter, sortOption, tags]);

    useEffect(() => {
        const fetcher = async () => {
            if (fetchBookmarkSignal && fetchBookmarkSignal.length > 0) {
                const result = await handleFetchBookmarksByIds(fetchBookmarkSignal)
                const { bookmarks: fetchedBookmarks } = result
                if (fetchedBookmarks && fetchedBookmarks.length > 0) {
                    setBookmarks(prev => {
                        return prev.map(bookmark => {
                            const target = fetchedBookmarks.find(fetchedBookmark => fetchedBookmark.bookmarkId === bookmark.bookmarkId)
                            if (target) {
                                return target
                            }
                            return bookmark
                        })
                    });
                }
                fireBookmarkFetchSignal([])
            }
        }
        if (fetchBookmarkSignal && fetchBookmarkSignal.length > 0) {
            fetcher()
        }
    }, [fetchBookmarkSignal, fireBookmarkFetchSignal])

    useEffect(() => {
        if (bookmarkReloadSignal) {
            setPage(0);
            setBookmarks([]);
            setHasMore(true);
            fireBookmarkReloadSignal(false);
            fetchBookmarks(0);
        }
    }, [bookmarkReloadSignal, fetchBookmarks, fireBookmarkReloadSignal])


    useEffect(() => {
        if (page === 0) {
            return;
        }
        fetchBookmarks(page)
    }, [fetchBookmarks, page]);



    useEffect(() => {
        if (inView && hasMore) {
            setPage(prev => prev + 1);
        }
    }, [hasMore, inView]);

    return {
        bookmarks,
        hasMore,
        bookmarkLoaderRef,
        bookmarkTags,
        checked,
        setChecked
    }
}

