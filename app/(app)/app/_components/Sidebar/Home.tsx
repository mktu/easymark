import { Button } from "@/components/ui/button";
import { SidebarMenuButton } from "@/components/ui/sidebar";
import { HomeIcon } from "lucide-react";
import Link from "next/link";
import { FC } from "react";

const Home: FC = () => {
    return (
        <SidebarMenuButton asChild>
            <Button asChild className="w-full justify-start">
                <Link href="/app" className="flex items-center gap-2">
                    <HomeIcon className="size-6" />
                    <span>Home</span>
                </Link>
            </Button>
        </SidebarMenuButton>
    )
}

export default Home;