import { DialogFooter } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { FC } from "react";

const Loader: FC = () => {
    return (
        <div className='flex h-full flex-1 flex-col gap-1 overflow-hidden'>
            <div className='flex flex-1 flex-col gap-1 overflow-y-auto px-3'>
                <Skeleton className='h-[24px] w-[52px]' />
                <Skeleton className='h-[40px] w-full' />

                <Skeleton className='h-[24px] w-[52px]' />
                <Skeleton className='h-[80px] w-full' />

                <Skeleton className='h-[24px] w-[52px]' />
                <Skeleton className='h-[40px] w-full' />

                <Skeleton className='h-[24px] w-[52px]' />
                <Skeleton className='h-[40px] w-full' />

                <Skeleton className='h-[24px] w-[52px]' />
                <Skeleton className='h-[48px] w-full' />
            </div>

            <DialogFooter>
                <Skeleton className='h-[24px] w-[52px]' />
                <Skeleton className='h-[24px] w-[52px]' />
            </DialogFooter>
        </div>
    )
}

export default Loader;