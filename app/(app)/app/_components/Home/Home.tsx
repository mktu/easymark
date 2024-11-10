import { BookmarkType } from "@/lib/repositories/bookmarks";
import { CategoryType } from "@/lib/repositories/categories";
import { FC } from "react";
import { HeartIcon, HomeIcon, StarsIcon } from "lucide-react";
import HomePanel from "./HomePanel";
import BookmarkList from "./BookmarkList";

type Props = {
    user: {
        username: string
    },
    recentBookmarks: BookmarkType[],
    frequentBookmarks: BookmarkType[],
    categories: CategoryType[]

}

const Home: FC<Props> = ({
    user,
    recentBookmarks,
    frequentBookmarks,
    categories
}) => {
    return (
        <div className="flex size-full flex-col items-start justify-start gap-4 p-4">
            <h2 className='mb-4 flex items-center gap-2 text-lg font-semibold'>
                <HomeIcon className='size-5' />
                <span>{user.username}&apos;s Home</span>
            </h2>
            <div className='flex w-full flex-col items-center gap-1'>
                <HomePanel title={<>
                    <StarsIcon className='size-5' />
                    <span>Your Recent Registered Bookmarks</span>
                </>}>
                    <BookmarkList bookmarks={recentBookmarks} categories={categories} detailLink="/app/bookmarks?sort=date" />
                </HomePanel>
                <HomePanel title={<>
                    <HeartIcon className='size-5' />
                    <span>Frequently Accessed Bookmarks</span>
                </>}>
                    <BookmarkList bookmarks={frequentBookmarks} categories={categories} detailLink="/app/bookmarks?sort=frequency" />
                </HomePanel>
            </div>
        </div >
    );
}

export default Home