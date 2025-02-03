'use client'
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog"
import { useRouter } from "next/navigation"
import { FC, ReactNode } from "react"

type Props = {
    children: ReactNode
}

const Layout: FC<Props> = ({ children }) => {
    const router = useRouter();
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
            <DialogContent className='flex h-full flex-col overflow-hidden'>
                <DialogTitle>Add Bookmark</DialogTitle>
                <DialogDescription>Input url you want to bookmark.</DialogDescription>
                {children}
            </DialogContent>
        </Dialog>
    )
}

export default Layout