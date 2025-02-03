'use client'
import { MenuIcon } from "lucide-react";
import { FC, useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
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
                    <Button className="md:hidden" variant='ghost' size='icon'>
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

