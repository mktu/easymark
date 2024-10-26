import { BookmarkType } from "@/lib/repositories/bookmarks"
import { CategoryType } from "@/lib/repositories/categories"
import { FC } from "react"
import BookmarkListItem from "./BookmarkListItem"

type Props = {
    bookmarks: BookmarkType[],
    categories: CategoryType[]
}


const BookmarkList: FC<Props> = ({
    bookmarks,
    categories
}) => {
    return (
        <ul className="flex flex-col gap-1">
            {bookmarks.map((bookmark) => (
                <li key={bookmark.bookmarkId}>
                    <BookmarkListItem
                        bookmark={bookmark}
                        category={categories.find((c) => c.categoryId === bookmark.categoryId)}
                    />
                </li>))}
        </ul>
    );
}

export default BookmarkList