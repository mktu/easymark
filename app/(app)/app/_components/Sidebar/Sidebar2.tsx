// sidebar component

import { FC } from "react";
import Link from "next/link";
import { HomeIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SidebarContent, SidebarFooter, SidebarGroup, SidebarHeader, Sidebar, SidebarMenu, SidebarTrigger, SidebarRail } from "@/components/ui/sidebar";
import Categories from "./Categories";
import Bookmarks from "./Bookmarks";
import Tags from "./Tags";
import SignoutButton from "./SignoutButton";
import Home from "./Home";


const AppSidebar: FC = () => {
    return (
        <Sidebar collapsible='icon'>
            <SidebarHeader>
                <SidebarMenu>
                    <Home />
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <SidebarMenu>
                    <Categories />
                    <Bookmarks />
                    <Tags />
                </SidebarMenu>
            </SidebarContent>
            <SidebarFooter>
                <SignoutButton />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}

export default AppSidebar;