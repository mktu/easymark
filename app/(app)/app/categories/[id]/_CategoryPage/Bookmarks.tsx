import { BookmarkType } from "@/lib/repositories/bookmarks"
import BookmarkListItem from "../../../_components/Home/BookmarkListItem"
import { CategoryType } from "@/lib/repositories/categories"
import { Button } from "@/components/ui/button"
import { PlusCircleIcon } from "lucide-react"
import Link from "next/link"

type Props = {
    bookmarks: BookmarkType[],
    category?: CategoryType
}

const Bookmarks = ({ bookmarks, category }: Props) => {
    return (
        <section className='flex w-full max-w-[700px] flex-col items-start justify-start gap-2'>
            <h3 className='font-semibold'>📗 Bookmarks in This Category</h3>
            <div className='flex items-center justify-end w-full'>
                <Button variant='ghost' asChild>
                    <Link href={`/app/new-bookmark?category=${category?.categoryId}`}>
                        <PlusCircleIcon className='mr-2 size-5' />
                        Add Bookmark
                    </Link>
                </Button>
            </div>
            {bookmarks.length === 0 && <p>No bookmarks</p>}
            <ul>
                {bookmarks.map((bookmark) => (
                    <li key={bookmark.bookmarkId}>
                        <BookmarkListItem
                            bookmark={bookmark}
                            category={category}
                        />
                    </li>))}
            </ul>
        </section>
    )
}

export default Bookmarks