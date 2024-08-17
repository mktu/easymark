'use client'
import { FC } from "react"
import { useAddBookmarkContext } from "../../_contexts/addBookmarkDialogContext"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import AddBookmarkDialogContent from "./AddBookmarkDialogContent"


const BookmarkDialog: FC = () => {
    const { isOpen, close } = useAddBookmarkContext()
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
            <DialogContent className='flex h-full flex-col'>
                <AddBookmarkDialogContent />
            </DialogContent>

        </Dialog>
    )
}

export default BookmarkDialog