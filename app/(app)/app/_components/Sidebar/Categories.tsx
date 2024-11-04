import { Button } from "@/components/ui/button"
import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"
import { LayoutGridIcon } from "lucide-react"
import Link from "next/link"
import { FC } from "react"

const Categories: FC = () => {
    return (
        <SidebarMenuItem>
            <SidebarMenuButton asChild>
                <Button variant='ghost' asChild className="w-full justify-start">
                    <Link href="/app/categories" className="flex items-center gap-2">
                        <LayoutGridIcon className="size-6" />
                        <span>Categories</span>
                    </Link>
                </Button>
            </SidebarMenuButton>
        </SidebarMenuItem>
    )
}

export default Categories