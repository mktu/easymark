import { useCallback, useEffect, useMemo, useState } from "react";
import { searchBookmarks } from "../../../loader/bookmarks/searchBookmarks";
import { SearchBookmarkType } from "@/lib/repositories/bookmarks";
import { useDebounce } from "use-debounce";
import { appendQuerySegment, CategoryOperator, extractLastQuerySegment, replaceLastQuerySegment, TagOperator } from "../../../logics/bookmarks/parseSearchQuery";
import { useTagQuery } from "./useTagQuery";
import { useCategoryQuery } from "./useCategoryQuery";

export const useBookmarkSearch = () => {
    const [search, setSearch] = useState<string>('');
    const [bookmarks, setBookmarks] = useState<SearchBookmarkType[]>([]);
    const [debouncedSearch] = useDebounce(search, 500);

    const [isSuggesting, setIsSuggesting] = useState(false)
    const lastQuery = useMemo(() => extractLastQuerySegment(search), [search]);
    const { tags: selectableTags } = useTagQuery(lastQuery?.type === TagOperator, lastQuery?.value);
    const { categories: selectableCategories } = useCategoryQuery(lastQuery?.type === CategoryOperator, lastQuery?.value);

    useEffect(() => {
        const fetchBookmarks = async () => {
            const result = await searchBookmarks(0, 10, debouncedSearch)
            if ('error' in result) {
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

    const onUpdate = useCallback((text: string) => {
        setSearch(text)
        const lq = extractLastQuerySegment(text)
        const isSuggesting = lq?.type === TagOperator || lq?.type === CategoryOperator
        setIsSuggesting(isSuggesting)
    }, []);

    const onSelectSuggestion = useCallback(async (type: typeof TagOperator | typeof CategoryOperator, value: string) => {
        setSearch(last => replaceLastQuerySegment(last, { type, value }));
        setIsSuggesting(false)
    }, []);

    const onAddCommand = useCallback((command: string) => {
        setSearch(last => appendQuerySegment(last, { type: command, value: '' }))
        setIsSuggesting(true)
    }, []);

    return {
        search,
        bookmarks,
        selectableCategories,
        selectableTags,
        isSuggesting,
        onUpdate,
        onSelectSuggestion,
        onAddCommand,
    }
}