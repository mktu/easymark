import { Toaster } from 'sonner'
import SignalProvider from "./SignalProvider"
import BookmarkSearchDialogProvider from './BookmarkSearchDialogProvider'

type Props = {
    children: React.ReactNode
}

const Provider: React.FC<Props> = ({ children }) => {
    return (
        <SignalProvider>
            <BookmarkSearchDialogProvider>
                <Toaster />
                {children}
            </BookmarkSearchDialogProvider>
        </SignalProvider>
    )
}

export default Provider