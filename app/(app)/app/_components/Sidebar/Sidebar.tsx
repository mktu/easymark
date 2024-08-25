// sidebar component

import { FC } from "react";
import SignoutButton from "../SignoutButton";
import Link from "next/link";
import { HomeIcon } from "lucide-react";
import { Button } from "@/components/ui/button";


const Sidebar: FC = () => {
    return (
        <div className="flex flex-col p-2">
            <Button asChild>
                <Link href="/app" className="flex items-center gap-2">
                    <HomeIcon className="size-6" />
                    <span>Home</span>
                </Link>
            </Button>

            <Button variant='ghost' asChild>
                <Link href="/app/categories" className="flex items-center gap-2">
                    <span>Categories</span>
                </Link>
            </Button>
            <div>Tags</div>
            <div>Recent Bookmarks</div>
            <SignoutButton />
        </div>
    )
}

export default Sidebar;