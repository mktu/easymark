import { Button } from "@/components/ui/button";
import { SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import { TagIcon } from "lucide-react";
import Link from "next/link";
import { FC } from "react";

const Tags: FC = () => {
    return (
        <SidebarMenuItem>
            <SidebarMenuButton asChild>
                <Button variant='ghost' asChild className="w-full justify-start">
                    <Link href="/app/tags" className="flex items-center gap-2">
                        <TagIcon className="size-6" />
                        <span>Tags</span>
                    </Link>
                </Button>
            </SidebarMenuButton>
        </SidebarMenuItem>
    )
}

export default Tags;