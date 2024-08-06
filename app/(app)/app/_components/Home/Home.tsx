import { BookmarkType } from "@/lib/repositories/bookmarks";
import { CategoryType } from "@/lib/repositories/categories";
import { FC } from "react";
import BookmarkListItem from "./BookmarkListItem";

type Props = {
    user: {
        username: string
    },
    bookmarks: BookmarkType[],
    categories: CategoryType[]

}

const Home: FC<Props> = ({
    user,
    bookmarks,
    categories
}) => {
    return (
        <div className="flex h-full flex-col items-center justify-between p-24">
            <h1> Hello {user.username} !</h1>
            <div className='flex flex-col items-center gap-1'>
                <section>
                    <h2>Your Recent Registered Bookmarks</h2>
                    <ul>
                        {bookmarks.map((bookmark) => (
                            <li key={bookmark.bookmarkId}>
                                <BookmarkListItem
                                    title={bookmark.ogpTitle || bookmark.url}
                                    image={bookmark.ogpImage}
                                    url={bookmark.url}
                                    createdAt={bookmark.createdAt}
                                />
                            </li>))}
                    </ul>
                </section>
                <section>
                    <h2>Frequently used categories</h2>
                    <ul>
                        {categories.map((category) => (
                            <li key={category.categoryId}>
                                {category.name}
                            </li>)
                        )}
                    </ul>
                </section>
            </div>
        </div >
    );
}

export default Home