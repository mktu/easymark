import { SearchCategoryReturnType } from "@/loader/categories/seachCategory";

export const callSearchCategory = async (query: string) => {
    const searchParams = new URLSearchParams();
    searchParams.set('query', query);
    const res = await fetch(`/api/internal/categories?${searchParams.toString()}`)
    return await res.json() as SearchCategoryReturnType;
}