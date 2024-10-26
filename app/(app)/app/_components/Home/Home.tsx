import { BookmarkType } from "@/lib/repositories/bookmarks";
import { CategoryType } from "@/lib/repositories/categories";
import { FC } from "react";
import BookmarkListItem from "./BookmarkListItem";
import { HomeIcon, StarsIcon } from "lucide-react";
import HomePanel from "./HomePanel";
import BookmarkList from "./BookmarkList";

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
        <div className="flex size-full flex-col items-start justify-start gap-4 p-4">
            <h2 className='mb-4 flex items-center gap-2 text-lg font-semibold'>
                <HomeIcon className='size-5' />
                <span>{user.username}&apos;s Home</span>
            </h2>
            <div className='flex flex-col items-center gap-1'>
                <HomePanel title={<>
                    <StarsIcon className='size-5' />
                    <span>Your Recent Registered Bookmarks</span>
                </>}>
                    <BookmarkList bookmarks={bookmarks} categories={categories} />
                </HomePanel>
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