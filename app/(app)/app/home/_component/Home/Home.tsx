import { BookmarkType } from "@/lib/repositories/bookmarks";
import { CategoryType } from "@/lib/repositories/categories";
import { FC } from "react";
import { HeartIcon, HomeIcon, StarsIcon, Volume2Icon, VolumeIcon } from "lucide-react";
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
            {/* <div className='flex w-full flex-col items-center gap-1'>
                <div className='w-full md:w-[500px] h-[200px] border border-input rounded p-4'>
                    <h3 className="text-muted-foreground flex items-center gap-1">
                        <span>News</span>
                        <Volume2Icon className='size-5' />
                    </h3>
                </div>
            </div> */}
            <div className='flex w-full flex-col items-center gap-1'>
                <HomePanel title={<>
                    <StarsIcon className='size-5' />
                    <span>Your Recent Registered Bookmarks</span>
                </>}>
                    <BookmarkList bookmarks={recentBookmarks} categories={categories} detailLink="/app/bookmarks?sort=date" />
                </HomePanel>
            </div>
        </div >
    );
}

export default Home