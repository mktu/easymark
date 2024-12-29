import { DialogFooter } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { FC } from "react";

const Loading: FC = () => {
    return (
        <div className='flex flex-col gap-1'>
            <Skeleton className='h-14 w-full' />
            <DialogFooter className="mt-4">
                <Skeleton className='h-12 w-full' />
            </DialogFooter>
        </div>
    )
}

export default Loading