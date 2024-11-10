import { Button } from "@/components/ui/button";
import { TagIcon } from "lucide-react";
import Link from "next/link";
import { FC } from "react";
import { useDrawerContext } from "./context";

const Tags: FC = () => {
    const { setOpen } = useDrawerContext()
    return (
        <Button variant='ghost' asChild className="w-full justify-start">
            <Link href="/app/tags" className="flex items-center gap-2" onClick={() => {
                setOpen(false)
            }}>
                <TagIcon className="size-6" />
                <span>Tags</span>
            </Link>
        </Button>
    )
}

export default Tags;