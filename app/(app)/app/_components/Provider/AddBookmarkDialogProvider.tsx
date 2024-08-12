'use client'
import { useState } from "react"
import AddBookmarkDialogContext from "../../_contexts/addBookmarkDialogContext"
import { BookmarkType } from "@/lib/repositories/bookmarks"

type Props = {
    children: React.ReactNode
}

const AddBookmarkDialogProvider: React.FC<Props> = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [bookmark, setBookmark] = useState<BookmarkType>()
    const open = (bookmark?: BookmarkType) => {
        setIsOpen(true)
        if (bookmark) {
            setBookmark(bookmark)
        }
    }
    const close = () => {
        setIsOpen(false)
        setBookmark(undefined)
    }

    return (
        <AddBookmarkDialogContext.Provider value={{ open, close, isOpen, bookmark }}>
            {children}
        </AddBookmarkDialogContext.Provider>
    )
}

export default AddBookmarkDialogProvider