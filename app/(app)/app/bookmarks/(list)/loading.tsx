import { Skeleton } from "@/components/ui/skeleton";
import { FC } from "react";
import BookmarkSkelton from "../_components/BookmarkSkelton";

const Loading: FC = () => {
    return (
        <>
            <Skeleton className={`h-[60px] w-full rounded pl-4 md:w-[400px]`} />
            <BookmarkSkelton />
        </>
    )
}

export default Loading