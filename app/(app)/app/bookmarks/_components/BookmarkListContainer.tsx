import { CategoryType } from "@/lib/repositories/categories"
import { BookmarkSortOption } from "@/lib/types"
import { handleFetchBookmarks } from "../_actions/handleFetchBookmarks"
import BookmarkList from "./BookmarkList"
import { useActionState } from "react"

type Props = {
    filter?: string,
    sortOption?: BookmarkSortOption,
    categories: CategoryType[],
}


const BookmarkListContainer = async ({
    filter,
    sortOption,
    ...props
}: Props) => {
    const ret = await handleFetchBookmarks(0, 10, filter, sortOption)
    return <BookmarkList {...{ ...props, filter, sortOption, initialBookmarks: ret.bookmarks, initialHasMore: ret.hasMore }} />
}


export default BookmarkListContainer