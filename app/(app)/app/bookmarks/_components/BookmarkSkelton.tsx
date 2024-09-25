import { Skeleton } from "@/components/ui/skeleton";

const BaseSkelton = () =>
    <div className="flex w-full gap-2 p-2">
        <Skeleton className="size-[92px] rounded" />
        <div className="flex w-full flex-col gap-2">
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