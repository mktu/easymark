// sidebar component

import { FC } from "react";
import SignoutButton from "../SignoutButton";
import Link from "next/link";
import { BookIcon, HomeIcon, LayoutGridIcon, TagIcon } from "lucide-react";
import { Button } from "@/components/ui/button";


const Sidebar: FC = () => {
    return (
        <div className="flex w-full flex-col items-start p-2">
            <Button asChild className="mb-2 w-full md:w-fit">
                <Link href="/app" className="flex items-center gap-2">
                    <HomeIcon className="size-6" />
                    <span>Home</span>
                </Link>
            </Button>

            <Button variant='ghost' asChild className="w-full md:w-fit">
                <Link href="/app/categories" className="flex items-center gap-2">
                    <LayoutGridIcon className="size-6" />
                    <span>Categories</span>
                </Link>
            </Button>
            <Button variant='ghost' asChild className="w-full md:w-fit">
                <Link href="/app/bookmarks" className="flex items-center gap-2">
                    <BookIcon className="size-6" />
                    <span>Bookmarks</span>
                </Link>
            </Button>
            <Button variant='ghost' asChild className="w-full md:w-fit">
                <Link href="/app/tags" className="flex items-center gap-2">
                    <TagIcon className="size-6" />
                    <span>Tags</span>
                </Link>
            </Button>
            <div className='mt-6' />
            <SignoutButton />
        </div>
    )
}

export default Sidebar;