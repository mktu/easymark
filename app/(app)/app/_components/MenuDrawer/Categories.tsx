import { Button } from "@/components/ui/button";
import { LayoutGridIcon } from "lucide-react";
import Link from "next/link";
import { FC } from "react";
import { useDrawerContext } from "./context";

const Categories: FC = () => {
    const { setOpen } = useDrawerContext()
    return (
        <Button variant='ghost' asChild className="w-full justify-start">
            <Link href="/app/categories" className="flex items-center gap-2" onClick={() => {
                setOpen(false)
            }}>
                <LayoutGridIcon className="size-6" />
                <span>Categories</span>
            </Link>
        </Button>
    )
}

export default Categories