'use client'
import { SearchBookmarkType } from "@/lib/repositories/bookmarks";
import { FC } from "react";
import { CategoryType } from "@/lib/repositories/categories";
import LoadingIcon from "@/components/svg/Loading";
import { useBookmarks } from "../_hooks/useBookmarks";
import BookmarkListItem from "./BookmarkListItem";
import { Checkbox } from "@/components/ui/checkbox";
import SortSelector from "./SortSelector";
import { useBookmarkSort } from "../_hooks/useBookmarkSort";
import BulkUpdate from "./bulk-update/BulkUpdate";

type Props = {
    query?: string,
    categories: CategoryType[],
    initialBookmarks?: SearchBookmarkType[],
    initialHasMore?: boolean
}

const BookmarkList: FC<Props> = ({
    query,
    categories,
    initialBookmarks,
    initialHasMore
}) => {
    const { sortOption, onSort } = useBookmarkSort()
    const {
        bookmarks,
        hasMore,
        bookmarkLoaderRef,
        checked,
        setChecked,
        onSelectTag
    } = useBookmarks(query, sortOption, initialBookmarks, initialHasMore)
    return (
        <ul className="flex w-full flex-col gap-2 p-1">
            <li className='flex items-center gap-2 border-b border-input py-2 pr-2'>
                <Checkbox className="border-muted-foreground bg-background" checked={checked.length === bookmarks.length}
                    onCheckedChange={(c) => {
                        if (c === true) {
                            setChecked(bookmarks.map((bookmark) => bookmark.bookmarkId))
                        } else {
                            setChecked([])
                        }
                    }} />
                <div className='flex w-full items-center justify-end gap-2'>
                    <BulkUpdate
                        bookmarks={checked}
                        categories={categories}
                    />
                    <span className='ml-4 text-muted-foreground'>Sort By</span>
                    <SortSelector setSortOption={onSort} sortOption={sortOption} />
                </div>
            </li>
            {bookmarks.map((bookmark) => (
                <li key={bookmark.bookmarkId}>
                    <BookmarkListItem
                        bookmark={bookmark}
                        category={categories.find((category) => category.categoryId === bookmark.categoryId)}
                        checked={checked.includes(bookmark.bookmarkId)}
                        onCheck={(checked) => {
                            setChecked((prev) => {
                                if (checked) {
                                    if (!prev.includes(bookmark.bookmarkId)) {
                                        return [...prev, bookmark.bookmarkId]
                                    }
                                    return prev
                                }
                                return prev.filter((id) => id !== bookmark.bookmarkId)
                            })
                        }
                        }
                        onSelectTag={onSelectTag}
                    />
                </li>
            ))}
            {bookmarks.length === 0 && <div className='flex w-full justify-center'>No bookmarks found</div>}
            {hasMore && bookmarks.length > 0 && <div ref={bookmarkLoaderRef} className="flex w-full justify-center">
                <LoadingIcon className='stroke-input' />
            </div>}
        </ul>
    )
}

export default BookmarkList