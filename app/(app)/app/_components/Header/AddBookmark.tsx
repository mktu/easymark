'use client'

import { Button } from "@/components/ui/button";
import { useAddBookmarkContext } from "../../_contexts/addBookmarkDialogContext";
import Link from "next/link";

const AddBookmark = () => {

    return (
        <Link className="ml-auto" href="/app/new-bookmark" >
            Add Bookmark
        </Link>
    );
}

export default AddBookmark;