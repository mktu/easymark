'use client'
import { HomeIcon, MenuIcon } from "lucide-react";
import { FC, useState } from "react";
import { Sidebar } from "../Sidebar";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { DrawerContext } from "./context";
import Header from "./Header";
import Categories from "./Categories";
import Bookmarks from "./Bookmarks";
import Tags from "./Tags";
import Footer from "./Footer";

const MenuDrawer: FC = () => {
    const [open, setOpen] = useState(false)
    return (
        <DrawerContext.Provider value={{ open, setOpen }}>
            <Sheet open={open} onOpenChange={(o) => {
                setOpen(o)
            }}>
                <SheetTrigger asChild>
                    <Button variant='ghost' size='icon'>
                        <MenuIcon className='size-6' />
                    </Button>
                </SheetTrigger>
                <SheetContent side={'left'}>
                    <Header />
                    <div className='mb-8 flex flex-1 flex-col gap-2 p-2'>
                        <Categories />
                        <Bookmarks />
                        <Tags />
                    </div>
                    <Footer />
                </SheetContent>
            </Sheet>
        </DrawerContext.Provider>
    )
}

export default MenuDrawer

