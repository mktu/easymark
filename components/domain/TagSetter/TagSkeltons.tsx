import { Skeleton } from "@/components/ui/skeleton";
import { FC } from "react";

const TagSkeltons: FC = () => {
    return (
        <div className='flex items-center gap-4 p-4'>
            <Skeleton className='h-10 w-20' />
            <Skeleton className='h-10 w-20' />
            <Skeleton className='h-10 w-20' />
            <Skeleton className='h-10 w-20' />
            <Skeleton className='h-10 w-20' />
        </div>
    )
}

export default TagSkeltons;