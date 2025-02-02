import { SearchBookmarkReturnType } from "@/loader/bookmarks/searchBookmarks";

export const callLoadBookmarksByIds = async (ids: number[]) => {
    const searchParams = new URLSearchParams();
    searchParams.set('ids', ids.map(id => id.toString()).join(','));
    const res = await fetch(`/api/internal/bookmarks?${searchParams.toString()}`);
    return await res.json() as SearchBookmarkReturnType;
}