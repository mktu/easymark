import { BookmarkType } from "@/lib/repositories/bookmarks"
import BookmarkListItem from "../../../_components/Home/BookmarkListItem"
import { CategoryType } from "@/lib/repositories/categories"

type Props = {
    bookmarks: BookmarkType[],
    category?: CategoryType
}

const Bookmarks = ({ bookmarks, category }: Props) => {
    return (
        <section className='flex w-full max-w-[700px] flex-col items-start justify-start gap-2'>
            <h3 className='font-semibold'>📗 Bookmarks in This Category</h3>
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