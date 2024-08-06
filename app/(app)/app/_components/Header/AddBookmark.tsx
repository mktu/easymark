'use client'

import { Button } from "@/components/ui/button";
import { useAddBookmarkContext } from "../../_contexts/addBookmarkDialogContext";

const AddBookmark = () => {

    const { open } = useAddBookmarkContext()
    return (
        <Button onClick={() => {
            open()
        }} className="ml-auto">Add Bookmark</Button>
    );
}

export default AddBookmark;