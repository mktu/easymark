import { BookmarkSortOption } from "@/lib/types";
import { SearchBookmarkReturnType } from "../../loader/bookmarks/searchBookmarks";

export const callSearchBookmarks = async (page: number, limit: number, query?: string, sort?: BookmarkSortOption) => {
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