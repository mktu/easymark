'use client'
import { BookmarkType } from "@/lib/repositories/bookmarks";
import { FC } from "react";
import BookmarkListItem from "../../_components/Home/BookmarkListItem";
import { CategoryType } from "@/lib/repositories/categories";
import { useInView } from "react-intersection-observer";
import LoadingIcon from "@/components/svg/Loading";
import { BookmarkSortOption } from "@/lib/types";
import { useBookmarks } from "../_hooks/useBookmarks";

type Props = {
    filter?: string,
    category?: number | null,
    sortOption?: BookmarkSortOption,
    categories: CategoryType[],
    initialBookmarks?: BookmarkType[],
    initialHasMore?: boolean
}

const BookmarkList: FC<Props> = ({
    filter,
    category,
    sortOption,
    categories,
    initialBookmarks,
    initialHasMore
}) => {
    const { bookmarks, hasMore, bookmarkLoaderRef } = useBookmarks(filter, sortOption, category, initialBookmarks, initialHasMore)
    return (
        <>
            {bookmarks.map((bookmark) => (
                <li key={bookmark.bookmarkId}>
                    <BookmarkListItem
                        bookmark={bookmark}
                        category={categories.find((category) => category.categoryId === bookmark.categoryId)} />
                </li>
            ))}
            {bookmarks.length === 0 && <div className='flex w-full justify-center'>No bookmarks found</div>}
            {hasMore && bookmarks.length > 0 && <div ref={bookmarkLoaderRef} className="flex w-full justify-center">
                <LoadingIcon className='stroke-input' />
            </div>}
        </>
    )
}

export default BookmarkList