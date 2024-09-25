import { BookmarkSortOption, BookmarkSortOptions } from "@/lib/types"
import { ReadonlyURLSearchParams } from "next/navigation"

// check if sortOption is a valid BookmarkSortOption
export function isBookmarkSortOption(sortOption: string): sortOption is BookmarkSortOption {
    return Object.keys(BookmarkSortOptions).includes(sortOption as BookmarkSortOption)
}
// get sortOption from searchParams
export function getSortOption(searchParams: { [key: string]: string | string[] | undefined } | ReadonlyURLSearchParams | URLSearchParams): BookmarkSortOption {
    if (searchParams instanceof ReadonlyURLSearchParams || searchParams instanceof URLSearchParams) {
        return isBookmarkSortOption(searchParams.get('sort') as string) ? searchParams.get('sort') as BookmarkSortOption : 'date'
    }
    return isBookmarkSortOption(searchParams.sort as string) ? searchParams.sort as BookmarkSortOption : 'date'
}