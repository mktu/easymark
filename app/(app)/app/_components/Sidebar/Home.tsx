import { Button } from "@/components/ui/button";
import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { HomeIcon } from "lucide-react";
import Link from "next/link";
import { FC } from "react";

const Home: FC = () => {
    return (
        <SidebarMenuItem>
            <SidebarMenuButton asChild className="">
                <Button variant='ghost' asChild className="w-full justify-start">
                    <Link href="/app/home" className="flex items-center gap-2">
                        <HomeIcon className="size-6" />
                        <span>Home</span>
                    </Link>
                </Button>
            </SidebarMenuButton>
        </SidebarMenuItem>
    )
}

export default Home;