'use client'
import { FC } from "react";
import { InputWithIcon } from "@/components/domain/InputWithIcon";
import { SearchIcon } from "lucide-react";
import { useBookmarkSearch } from "../../_hooks/useBookmarkSearch";
import BookmarkListItem from "./BookmarkListItem";

const BookmarkDialogContent: FC = () => {
    const { bookmarks, search, setSearch } = useBookmarkSearch()
    return (
        <div className="flex h-full flex-col gap-2 overflow-y-hidden px-2 py-4">
            <InputWithIcon
                placeholder="Search Bookmarks"
                value={search}
                leftIcon={<SearchIcon className='size-4 text-muted-foreground' />}
                className="w-[400px]"
                onChange={(e) => {
                    setSearch(e.target.value)
                }} />
            <ul className="mt-2 flex flex-1 flex-col gap-2 overflow-y-auto">
                {bookmarks.map((bookmark) => (
                    <BookmarkListItem key={bookmark.bookmarkId} bookmark={bookmark} />
                ))}
                {bookmarks.length === 0 && (
                    <p className='w-full p-4 text-lg text-muted-foreground'>Bookmark not found.</p>
                )}
            </ul>

        </div>
    );
}

export default BookmarkDialogContent