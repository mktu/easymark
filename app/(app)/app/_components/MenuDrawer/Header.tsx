import { SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import Link from "next/link";
import { FC } from "react";
import { useDrawerContext } from "./context";

const Header: FC = () => {
    const { setOpen } = useDrawerContext()
    return (
        <SheetHeader>
            <SheetTitle asChild>
                <Link href="/app" onClick={() => {
                    setOpen(false)
                }}>
                    Easy mark
                </Link>
            </SheetTitle>
            <SheetDescription>Manage your bookmarks easily</SheetDescription>
        </SheetHeader>
    )
}

export default Header