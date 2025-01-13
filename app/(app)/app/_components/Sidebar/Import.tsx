import { Button } from "@/components/ui/button";
import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { ImportIcon, LayoutGridIcon } from "lucide-react";
import Link from "next/link";
import { FC } from "react";

const Import: FC = () => {
    return (
        <SidebarMenuItem>
            <SidebarMenuButton asChild>
                <Button variant='ghost' asChild className="w-full justify-start">
                    <Link href="/app/import" className="flex items-center gap-2">
                        <ImportIcon className="size-6" />
                        <span>Import</span>
                    </Link>
                </Button>
            </SidebarMenuButton>
        </SidebarMenuItem>
    )
}

export default Import;