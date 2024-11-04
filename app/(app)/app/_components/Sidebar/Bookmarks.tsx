import { Button } from "@/components/ui/button";
import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { BookIcon } from "lucide-react";
import Link from "next/link";
import { FC } from "react";

const Bookmarks: FC = () => {
    return (
        <SidebarMenuItem>
            <SidebarMenuButton asChild>
                <Button variant='ghost' asChild className="w-full justify-start">
                    <Link href="/app/bookmarks" className="flex items-center gap-2">
                        <BookIcon className="size-6" />
                        <span>Bookmarks</span>
                    </Link>
                </Button>
            </SidebarMenuButton>
        </SidebarMenuItem>
    )
}

export default Bookmarks