import { CategoryType } from "@/lib/repositories/categories"
import { BookmarkSortOption } from "@/lib/types"
import { handleFetchBookmarks, handleSearchBookmarks } from "../_actions/handleFetchBookmarks"
import BookmarkList from "./BookmarkList"

type Props = {
    filter?: string,
    category?: number | null,
    sortOption?: BookmarkSortOption,
    categories: CategoryType[],
    tags: number[] | null,
    query: string,
}


const BookmarkListContainer = async ({
    filter,
    category,
    sortOption,
    tags,
    query,
    ...props
}: Props) => {
    const ret = await handleSearchBookmarks(0, 10, query)
    return <BookmarkList {...{ ...props, tags, filter, sortOption, category, initialBookmarks: ret.bookmarks, initialHasMore: ret.hasMore }} />
}


export default BookmarkListContainer