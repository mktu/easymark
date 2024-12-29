import { Skeleton } from "@/components/ui/skeleton";
import { BookIcon } from "lucide-react";
import { FC } from "react";
import BookmarkSkelton from "./_components/BookmarkSkelton";

const Loading: FC = () => {
    return (
        <section className='flex size-full flex-col items-start justify-start gap-2 p-4'>
            <h2 className='flex items-center gap-2 text-lg font-semibold'>
                <BookIcon className='size-5' />Bookmarks
            </h2>
            <Skeleton className={`h-[60px] w-full rounded pl-4 md:w-[400px]`} />
            <BookmarkSkelton />
        </section>
    )
}

export default Loading