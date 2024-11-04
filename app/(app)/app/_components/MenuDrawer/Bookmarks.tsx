import { Button } from "@/components/ui/button";
import { BookIcon } from "lucide-react";
import Link from "next/link";
import { FC } from "react";
import { useDrawerContext } from "./context";

const Bookmarks: FC = () => {
    const { setOpen } = useDrawerContext()
    return (
        <Button variant='ghost' asChild className="w-full justify-start">
            <Link href="/app/bookmarks" className="flex items-center gap-2" onClick={() => {
                setOpen(false)
            }}>
                <BookIcon className="size-6" />
                <span>Bookmarks</span>
            </Link>
        </Button>
    )
}

export default Bookmarks