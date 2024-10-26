import AddBookmarkDialogProvider from "./AddBookmarkDialogProvider"
import { Toaster } from 'sonner'
import SignalProvider from "./SignalProvider"

type Props = {
    children: React.ReactNode
}

const Provider: React.FC<Props> = ({ children }) => {
    return (
        <AddBookmarkDialogProvider>
            <SignalProvider>
                <Toaster />
                {children}
            </SignalProvider>
        </AddBookmarkDialogProvider>
    )
}

export default Provider