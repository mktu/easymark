import AddBookmarkDialogProvider from "./AddBookmarkDialogProvider"

type Props = {
    children: React.ReactNode
}

const Provider: React.FC<Props> = ({ children }) => {
    return (
        <AddBookmarkDialogProvider>
            {children}
        </AddBookmarkDialogProvider>
    )
}

export default Provider