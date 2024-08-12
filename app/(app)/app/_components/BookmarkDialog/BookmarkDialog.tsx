'use client'
import { FC } from "react"
import { useAddBookmarkContext } from "../../_contexts/addBookmarkDialogContext"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import AddBookmarkDialogContent from "./AddBookmarkDialogContent"
import EditBookmarkDialogContent from "./EditBookmarkDialogContent"


const BookmarkDialog: FC = () => {
    const { isOpen, close, bookmark } = useAddBookmarkContext()
    return (
        <Dialog
            modal
            open={isOpen}
            onOpenChange={(isOpen) => {
                if (!isOpen) {
                    close()
                }
            }}
        >
            <DialogContent className='h-full overflow-auto'>
                {bookmark ? <EditBookmarkDialogContent /> : <AddBookmarkDialogContent />}
            </DialogContent>

        </Dialog>
    )
}

export default BookmarkDialog