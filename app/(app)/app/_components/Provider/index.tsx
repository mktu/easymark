import { Toaster } from 'sonner'
import SignalProvider from "./SignalProvider"
import BookmarkSearchDialogProvider from './BookmarkSearchDialogProvider'
import { SidebarProvider } from '@/components/ui/sidebar'
import { FC, ReactNode } from 'react'

type Props = {
    children: ReactNode
}

const Provider: FC<Props> = ({ children }) => {
    return (
        <SignalProvider>
            <BookmarkSearchDialogProvider>
                <SidebarProvider>
                    <Toaster />
                    {children}
                </SidebarProvider>
            </BookmarkSearchDialogProvider>
        </SignalProvider>
    )
}

export default Provider