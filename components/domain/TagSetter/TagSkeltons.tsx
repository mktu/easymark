import { Skeleton } from "@/components/ui/skeleton";
import { FC } from "react";

const TagSkeltons: FC = () => {
    return (
        <div className='flex items-center gap-4 p-4'>
            <Skeleton className='w-20 h-10' />
            <Skeleton className='w-20 h-10' />
            <Skeleton className='w-20 h-10' />
            <Skeleton className='w-20 h-10' />
            <Skeleton className='w-20 h-10' />
        </div>
    )
}

export default TagSkeltons;