'use client'
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { FC } from "react";

type Props = {
    children: React.ReactNode
}

const Layout: FC<Props> = ({ children }) => {
    const router = useRouter()
    return (
        <Dialog
            modal
            open
            onOpenChange={(isOpen) => {
                if (!isOpen) {
                    router.back()
                }
            }}
        >
            <DialogContent className='flex h-full flex-col overflow-auto'>
                <DialogTitle>Update Bookmark</DialogTitle>
                <DialogDescription>Edit your bookmark information.</DialogDescription>
                {children}
            </DialogContent>
        </Dialog>
    );
}

export default Layout