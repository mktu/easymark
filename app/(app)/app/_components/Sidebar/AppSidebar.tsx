// sidebar component

import { FC } from "react";
import { SidebarContent, SidebarFooter, SidebarHeader, Sidebar, SidebarMenu, SidebarRail } from "@/components/ui/sidebar";
import Categories from "./Categories";
import Bookmarks from "./Bookmarks";
import Tags from "./Tags";
import SignoutButton from "./SignoutButton";
import Home from "./Home";
import Import from "./Import";


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
                    <Import />
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