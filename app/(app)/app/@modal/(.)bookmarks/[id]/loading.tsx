import { DialogFooter } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { FC } from "react";


const Loading: FC = () => {
    return (
        <div className="flex size-full flex-col gap-2 p-2 mb-4">
            <Skeleton className={`w-[460px] h-[240px] rounded`} />
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