import { Skeleton } from "@/components/ui/skeleton";

const BaseSkelton = () =>
    <div className="flex p-2 gap-2 w-full">
        <Skeleton className="size-[92px] rounded" />
        <div className="flex flex-col gap-2 w-full">
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-4 w-full" />
        </div>
    </div>


const BookmarkSkelton = () => {
    return (
        <>
            {Array.from({ length: 5 }).map((_, i) => (
                <BaseSkelton key={i} />
            ))}
        </>
    );
}

export default BookmarkSkelton