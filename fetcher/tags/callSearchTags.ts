import { SearchTagsReturnType } from "@/loader/tags/searchTags";

export const callSearchTags = async (query: string) => {
    const searchParams = new URLSearchParams();
    searchParams.set('query', query);
    const res = await fetch(`/api/internal/tags?${searchParams.toString()}`)
    return await res.json() as SearchTagsReturnType;
}