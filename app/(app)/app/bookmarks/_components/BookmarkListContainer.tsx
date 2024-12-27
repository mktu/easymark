import { CategoryType } from "@/lib/repositories/categories"
import { BookmarkSortOption } from "@/lib/types"
import { handleSearchBookmarks } from "../_actions/handleSearchBookmarks"
import BookmarkList from "./BookmarkList"

type Props = {
    sortOption?: BookmarkSortOption,
    categories: CategoryType[],
    query: string,
}


const BookmarkListContainer = async ({
    sortOption,
    query,
    ...props
}: Props) => {
    const ret = await handleSearchBookmarks(0, 10, query, sortOption)
    if ('error' in ret) {
        throw Error(ret.error)
    }
    return <BookmarkList {...{ ...props, query, sortOption, initialBookmarks: ret.bookmarks, initialHasMore: ret.hasMore }} />
}


export default BookmarkListContainer