'use client'
import { BookmarkSearchDialogContext } from "@/contexts/bookmark-search-dialog"
import { useDialog } from "@/hooks/useDialog"

type Props = {
    children: React.ReactNode
}

const Provider: React.FC<Props> = ({ children }) => {
    const values = useDialog()
    return (
        <BookmarkSearchDialogContext.Provider value={values}>{children}</BookmarkSearchDialogContext.Provider>
    )
}

export default Provider