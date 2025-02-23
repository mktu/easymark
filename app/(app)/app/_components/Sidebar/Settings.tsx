import { Button } from "@/components/ui/button";
import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { SettingsIcon } from "lucide-react";
import Link from "next/link";
import { FC } from "react";

const Settings: FC = () => {
    return (
        <SidebarMenuItem>
            <SidebarMenuButton asChild>
                <Button variant='ghost' asChild className="w-full justify-start">
                    <Link href="/app/settings" className="flex items-center gap-2">
                        <SettingsIcon className="size-6" />
                        <span>Settings</span>
                    </Link>
                </Button>
            </SidebarMenuButton>
        </SidebarMenuItem>
    )
}

export default Settings;