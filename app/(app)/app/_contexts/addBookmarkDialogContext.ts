import { BookmarkType } from "@/lib/repositories/bookmarks";
import { createContext, useContext } from "react";

type ContextType = {
    isOpen: boolean,
    bookmark?: BookmarkType,
    open: (bookmark?: BookmarkType) => void,
    close: () => void
}

const AddBookmarkDialogContext = createContext<ContextType>({
    isOpen: false,
    open: () => { },
    close: () => { }
})

export const useAddBookmarkContext = () => useContext(AddBookmarkDialogContext)

export default AddBookmarkDialogContext;