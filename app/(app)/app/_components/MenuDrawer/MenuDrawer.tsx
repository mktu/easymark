'use client'
import { MenuIcon } from "lucide-react";
import { FC } from "react";
import { Sidebar } from "../Sidebar";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

const MenuDrawer: FC = () => {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant='ghost' size='icon'>
                    <MenuIcon className='size-6' />
                </Button>
            </SheetTrigger>
            <SheetContent side={'left'}>
                <SheetHeader>
                    <SheetTitle >Easy mark</SheetTitle>
                    <SheetDescription>Manage your bookmarks easily</SheetDescription>
                </SheetHeader>
                <Sidebar />
            </SheetContent>
        </Sheet>
    )
}

export default MenuDrawer

