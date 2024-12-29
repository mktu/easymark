import { Skeleton } from "@/components/ui/skeleton";
import { FC } from "react";

const Loading: FC = () => {
    return (
        <div className='flex w-full flex-col gap-4'>
            <Skeleton className="h-[50px] w-full rounded" />
            <div className='flex flex-col gap-2 p-2'>
                <Skeleton className="h-[40px] w-full rounded" />
                <Skeleton className="h-[40px] w-full rounded" />
                <Skeleton className="h-[40px] w-full rounded" />
                <Skeleton className="h-[40px] w-full rounded" />
            </div>
        </div>
    )
}

export default Loading