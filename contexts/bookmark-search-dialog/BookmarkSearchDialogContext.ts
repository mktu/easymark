'use client'
import { useDialog } from "@/hooks/useDialog";
import { createContext, useContext } from "react";

type ContextType = ReturnType<typeof useDialog>

export const BookmarkSearchDialogContext = createContext<ContextType>({
    open: false,
    openDialog: () => { },
    closeDialog: () => { }
})

export default BookmarkSearchDialogContext

export const useBookmarkSearchDialogContext = () =>
    useContext(BookmarkSearchDialogContext)