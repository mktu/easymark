import { Toaster } from 'sonner'
import SignalProvider from "./SignalProvider"
import BookmarkSearchDialogProvider from './BookmarkSearchDialogProvider'
import { SidebarProvider } from '@/components/ui/sidebar'

type Props = {
    children: React.ReactNode
}

const Provider: React.FC<Props> = ({ children }) => {
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