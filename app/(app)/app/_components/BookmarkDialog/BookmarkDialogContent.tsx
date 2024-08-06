'use client'
import { FC, useState } from "react"
import { useAddBookmarkContext } from "../../_contexts/addBookmarkDialogContext"
import { addBookmark, AddBookmarkState } from "../../_actions/handleAddBookmark"
import { DialogFooter, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useBookmarkInput } from "../../hooks/useBookmarkInput"
import AddBookmarkErrors from "../ValidationError/AddBookmarkErrors"


const BookmarkDialogContent: FC = () => {
    const { close } = useAddBookmarkContext()
    const { ogp, setBookmark, bookmark, validBookmark } = useBookmarkInput()
    const [errors, setErrors] = useState<AddBookmarkState | null>(null)
    return (
        <form action={async () => {
            const result = await addBookmark({
                url: bookmark,
                title: ogp?.title,
                description: ogp?.description,
                imageUrl: ogp?.image?.url
            })
            if (!('success' in result)) {
                setErrors(result)
                return
            }
            close()
        }}>
            <DialogTitle>Add Bookmark</DialogTitle>
            <Input id='url' name='url' value={bookmark} onChange={(e) => {
                setBookmark(e.target.value)
            }} />
            {errors && <AddBookmarkErrors state={errors} />}
            <DialogFooter>
                <Button onClick={close} type="button">Cancel</Button>
                <Button disabled={!validBookmark} type='submit'>Add</Button>
            </DialogFooter>
        </form>
    )
}

export default BookmarkDialogContent