import { createContext, useContext } from "react";

type ContextType = {
    isOpen: boolean,
    open: () => void,
    close: () => void
}

const AddBookmarkDialogContext = createContext<ContextType>({
    isOpen: false,
    open: () => { },
    close: () => { }
})

export const useAddBookmarkContext = () => useContext(AddBookmarkDialogContext)

export default AddBookmarkDialogContext;