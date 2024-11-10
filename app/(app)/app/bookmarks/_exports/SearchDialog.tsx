'use client';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogTitle } from "@/components/ui/dialog";
import { FC } from "react";
import { Button } from "@/components/ui/button";
import { useBookmarkSearchDialogContext } from "@/contexts/bookmark-search-dialog";
import BookmarkDialogContent from "../_components/dialog-content/BookmarkDialogContent";

const SearchDialog: FC = () => {
    const { open, closeDialog } = useBookmarkSearchDialogContext()
    return (
        <Dialog
            modal
            open={open}
            onOpenChange={closeDialog}
        >
            <DialogContent className='flex h-[720px] max-w-xl flex-col overflow-auto'>
                <DialogTitle>Search Bookmark</DialogTitle>
                <DialogDescription>Search bookmarks by keyword, category, tags...</DialogDescription>
                <BookmarkDialogContent />
                <DialogFooter className='mt-auto'>
                    <Button onClick={() => {
                        closeDialog()
                    }} type="button">Close</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default SearchDialog;