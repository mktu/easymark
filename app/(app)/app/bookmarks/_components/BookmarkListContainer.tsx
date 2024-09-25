import { CategoryType } from "@/lib/repositories/categories"
import { BookmarkSortOption } from "@/lib/types"
import { handleFetchBookmarks } from "../_actions/handleFetchBookmarks"
import BookmarkList from "./BookmarkList"

type Props = {
    filter?: string,
    category?: number | null,
    sortOption?: BookmarkSortOption,
    categories: CategoryType[],
}


const BookmarkListContainer = async ({
    filter,
    category,
    sortOption,
    ...props
}: Props) => {
    const ret = await handleFetchBookmarks(0, 10, filter, sortOption, category)
    return <BookmarkList {...{ ...props, filter, sortOption, category, initialBookmarks: ret.bookmarks, initialHasMore: ret.hasMore }} />
}


export default BookmarkListContainer