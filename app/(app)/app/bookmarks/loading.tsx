import { Skeleton } from "@/components/ui/skeleton";
import { BookIcon } from "lucide-react";
import { FC } from "react";

const Loading: FC = () => {
    return (
        <section className='flex size-full flex-col items-start justify-start gap-2 p-4'>
            <h2 className='flex items-center gap-2 text-lg font-semibold'>
                <BookIcon className='size-5' />Bookmarks
            </h2>
            <div className="flex w-full flex-col gap-4 py-4">
                <Skeleton className={`h-[80px] w-full rounded pl-4 md:w-[400px]`} />
            </div>
            <div className="flex w-full flex-col gap-4 py-4">
                <Skeleton className="h-[60px] w-full" />
                <Skeleton className="h-[60px] w-full" />
                <Skeleton className="h-[60px] w-full" />
                <Skeleton className="h-[60px] w-full" />
                <Skeleton className="h-[60px] w-full" />
                <Skeleton className="h-[60px] w-full" />
            </div>
        </section>
    )
}

export default Loading