'use client'
import { BookmarkSearchDialogContext } from "@/contexts/bookmark-search-dialog"
import { useDialog } from "@/hooks/useDialog"
import { FC, ReactNode } from "react"

type Props = {
    children: ReactNode
}

const Provider: FC<Props> = ({ children }) => {
    const values = useDialog()
    return (
        <BookmarkSearchDialogContext.Provider value={values}>{children}</BookmarkSearchDialogContext.Provider>
    )
}

export default Provider