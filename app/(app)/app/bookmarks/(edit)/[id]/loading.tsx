import { Skeleton } from "@/components/ui/skeleton";
import { FC } from "react";

const Loading: FC = () => {
    return (
        <div className="mb-4 flex size-full flex-col gap-2 p-2">
            <section className='flex w-full flex-1 flex-col gap-2 md:min-w-[470px] md:max-w-[700px]'>
                <div className='flex justify-center gap-4'>
                    <Skeleton className='h-[240px] w-[460px]' />
                </div>
                <div className='flex flex-col gap-2'>
                    <Skeleton className="h-[24px] w-[50px]" />
                    <Skeleton className="h-[40px] w-full" />
                    <Skeleton className="h-[24px] w-[50px]" />
                    <Skeleton className="h-[40px] w-full" />
                    <Skeleton className="h-[24px] w-[50px]" />
                    <Skeleton className="h-[80px] w-full" />
                    <div className='mt-4'>
                        <Skeleton className='h-[20px] w-[600px]' />
                        <div className='flex'>
                            <Skeleton className='ml-auto h-[30px] w-[500px]' />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Loading