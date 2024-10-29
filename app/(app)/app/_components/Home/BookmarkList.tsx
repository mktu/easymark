import { BookmarkType } from "@/lib/repositories/bookmarks"
import { CategoryType } from "@/lib/repositories/categories"
import { FC } from "react"
import BookmarkListItem from "./BookmarkListItem"
import Link from "next/link"
import { Button } from "@/components/ui/button"

type Props = {
    bookmarks: BookmarkType[],
    categories: CategoryType[],
    detailLink: string
}


const BookmarkList: FC<Props> = ({
    bookmarks,
    categories,
    detailLink
}) => {
    return (
        <ul className="flex flex-col gap-1 w-full">
            {bookmarks.map((bookmark) => (
                <li key={bookmark.bookmarkId} className="w-full">
                    <BookmarkListItem
                        bookmark={bookmark}
                        category={categories.find((c) => c.categoryId === bookmark.categoryId)}
                    />
                </li>))}

            <Button variant='link' asChild className="ml-auto">
                <Link href={detailLink} >
                    ...Show more
                </Link>
            </Button>
        </ul>
    );
}

export default BookmarkList