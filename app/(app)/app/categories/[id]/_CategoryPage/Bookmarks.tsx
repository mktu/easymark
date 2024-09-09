import { BookmarkType } from "@/lib/repositories/bookmarks"
import BookmarkListItem from "../../../_components/Home/BookmarkListItem"

type Props = {
    bookmarks: BookmarkType[]
}

const Bookmarks = ({ bookmarks }: Props) => {
    return (
        <section className='flex flex-col items-start justify-start gap-2 max-w-[700px] w-full'>
            <h3 className='font-semibold text-md'>📗 Bookmarks in This Category</h3>
            {bookmarks.length === 0 && <p>No bookmarks</p>}
            <ul>
                {bookmarks.map((bookmark) => (
                    <li key={bookmark.bookmarkId}>
                        <BookmarkListItem
                            bookmark={bookmark}
                        />
                    </li>))}
            </ul>
        </section>
    )
}

export default Bookmarks