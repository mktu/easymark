import { useSignalContext } from "@/contexts/signal";
import { SearchBookmarkType } from "@/lib/repositories/bookmarks";
import { BookmarkSortOption } from "@/lib/types";
import { useCallback, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { loadBookmarksByIds } from "@/loader/bookmarks/loadBookmarks";
import { SearchBookmarkReturnType } from "@/loader/bookmarks/searchBookmarks";

const searchBookmarks = async (page: number, limit: number, query?: string, sort?: BookmarkSortOption) => {
    const searchParams = new URLSearchParams();
    searchParams.set('page', page.toString());
    searchParams.set('limit', limit.toString());
    if (query) {
        searchParams.set('query', query);
    }
    if (sort) {
        searchParams.set('sort', sort);
    }
    const res = await fetch(`/api/internal/bookmarks?${searchParams.toString()}`);
    return await res.json() as SearchBookmarkReturnType;
}

export const useBookmarks = (
    query?: string,
    sortOption?: BookmarkSortOption,
    initialBookmarks?: SearchBookmarkType[],
    initialHasMore?: Boolean
) => {
    const { ref: bookmarkLoaderRef, inView } = useInView({ initialInView: false });
    const [page, setPage] = useState(0);
    const [bookmarks, setBookmarks] = useState<SearchBookmarkType[]>(initialBookmarks || []);
    const [hasMore, setHasMore] = useState(Boolean(initialHasMore));
    const [checked, setChecked] = useState<number[]>([]);
    const [loading, setLoading] = useState(false);
    const { fetchBookmarkSignal, fireBookmarkFetchSignal, bookmarkReloadSignal, fireBookmarkReloadSignal } = useSignalContext();
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const fetchBookmarks = useCallback(async (targetPage: number) => {
        const result = await searchBookmarks(targetPage, 10, query, sortOption)
        if ('error' in result) {
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
        setLoading(false);
        return dataBookmarks;
    }, [query, sortOption]);

    const onSelectTag = useCallback((tagName: string) => {
        const params = new URLSearchParams(searchParams);
        params.set('tag', tagName);
        replace(`${pathname}?${params.toString()}`);
    }, [pathname, replace, searchParams])

    useEffect(() => {
        const fetcher = async () => {
            if (fetchBookmarkSignal && fetchBookmarkSignal.length > 0) {
                const result = await loadBookmarksByIds(fetchBookmarkSignal)
                const { bookmarks: fetchedBookmarks } = result
                if (fetchedBookmarks && fetchedBookmarks.length > 0) {
                    setBookmarks(prev => {
                        return prev.map(bookmark => {
                            const target = fetchedBookmarks.find(fetchedBookmark => fetchedBookmark.bookmarkId === bookmark.bookmarkId)
                            if (target) {
                                return { ...target }
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
        if (inView && hasMore && !loading) {
            setLoading(true);
            setPage(prev => prev + 1);
        }
    }, [hasMore, inView, loading]);

    return {
        bookmarks,
        hasMore,
        bookmarkLoaderRef,
        checked,
        setChecked,
        onSelectTag
    }
}

