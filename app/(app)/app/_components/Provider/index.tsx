import AddBookmarkDialogProvider from "./AddBookmarkDialogProvider"
import { Toaster } from 'sonner'

type Props = {
    children: React.ReactNode
}

const Provider: React.FC<Props> = ({ children }) => {
    return (
        <AddBookmarkDialogProvider>
            <Toaster />
            {children}
        </AddBookmarkDialogProvider>
    )
}

export default Provider