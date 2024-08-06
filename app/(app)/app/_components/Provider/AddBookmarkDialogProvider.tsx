'use client'
import { useState } from "react"
import AddBookmarkDialogContext from "../../_contexts/addBookmarkDialogContext"

type Props = {
    children: React.ReactNode
}

const AddBookmarkDialogProvider: React.FC<Props> = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false)
    const open = () => setIsOpen(true)
    const close = () => setIsOpen(false)

    return (
        <AddBookmarkDialogContext.Provider value={{ open, close, isOpen }}>
            {children}
        </AddBookmarkDialogContext.Provider>
    )
}

export default AddBookmarkDialogProvider