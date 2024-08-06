'use client'
import { FC } from "react"
import { useAddBookmarkContext } from "../../_contexts/addBookmarkDialogContext"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import BookmarkDialogContent from "./BookmarkDialogContent"


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
            <DialogContent>
                <BookmarkDialogContent />
            </DialogContent>

        </Dialog>
    )
}

export default BookmarkDialog