import { DialogFooter } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { FC } from "react";


const Loading: FC = () => {
    return (
        <div className="mb-4 flex size-full flex-col gap-2 p-2">
            <Skeleton className={`h-[240px] w-full md:w-[460px] rounded`} />
            <div className="flex w-full flex-col gap-4 py-4">
                <Skeleton className="h-[60px] w-full" />
                <Skeleton className="h-[60px] w-full" />
                <Skeleton className="h-[60px] w-full" />
            </div>
            <DialogFooter className='mt-auto'>
                <Skeleton className="h-[60px] w-full" />
            </DialogFooter>
        </div>
    )
}

export default Loading