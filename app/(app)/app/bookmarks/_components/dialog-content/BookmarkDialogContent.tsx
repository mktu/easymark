'use client'
import { FC } from "react";
import { useBookmarkSearch } from "../../_hooks/useBookmarkSearch";
import BookmarkListItem from "./BookmarkListItem";
import SearchBox from "../search-box/SearchBox";
import { CategoryOperator, TagOperator } from "../../../../_logics/bookmarks/parseSearchQuery";

const BookmarkDialogContent: FC = () => {
    const {
        bookmarks,
        search,
        selectableCategories,
        selectableTags,
        isSuggesting,
        onUpdate,
        onAddCommand,
        onSelectSuggestion
    } = useBookmarkSearch()
    return (
        <div className="flex h-full flex-col gap-2 overflow-y-hidden px-2 py-4">
            <SearchBox
                searchText={search}
                onChangeSearchText={onUpdate}
                onSelectTag={(tag) => {
                    onSelectSuggestion(TagOperator, tag.name)
                }}
                onSelectCategory={(category) => {
                    onSelectSuggestion(CategoryOperator, category.name)
                }}
                onAddCommand={onAddCommand}
                selectableCategories={selectableCategories}
                selectableTags={selectableTags}
                isSuggesting={isSuggesting}
            />
            <ul className="mt-2 flex h-full flex-1 flex-col gap-2 overflow-y-auto">
                {bookmarks.map((bookmark) => (
                    <BookmarkListItem key={bookmark.bookmarkId}
                        onSelectTag={(tag) => {
                            onSelectSuggestion(TagOperator, tag)
                        }}
                        bookmark={bookmark} />
                ))}
                {bookmarks.length === 0 && (
                    <p className='w-full p-4 text-lg text-muted-foreground'>Bookmark not found.</p>
                )}
            </ul>

        </div>
    );
}

export default BookmarkDialogContent