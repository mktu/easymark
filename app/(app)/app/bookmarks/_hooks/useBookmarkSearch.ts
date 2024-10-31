import { useEffect, useState } from "react";
import { handleFetchBookmarks } from "../_actions/handleFetchBookmarks";
import { BookmarkType } from "@/lib/repositories/bookmarks";
import { useDebounce } from "use-debounce";

export const useBookmarkSearch = () => {
    const [search, setSearch] = useState<string>('');
    const [bookmarks, setBookmarks] = useState<BookmarkType[]>([]);
    const [debouncedSearch] = useDebounce(search, 500);

    useEffect(() => {
        const fetchBookmarks = async () => {
            const result = await handleFetchBookmarks(0, 10, null, debouncedSearch)
            if (result.error) {
                console.error(result.error)
                return
            }
            const { bookmarks: dataBookmarks } = result
            if (!dataBookmarks) {
                return
            }
            setBookmarks(dataBookmarks);
        }
        fetchBookmarks()
    }, [debouncedSearch]);

    return {
        search,
        setSearch,
        bookmarks
    }
}