'use client'
import { FC, useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import OgpImage from "@/components/domain/OgpImage"
import CopyableItem from "@/components/domain/CopyableItem"
import { RotateCwIcon, TrashIcon } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { PopoverClose } from "@radix-ui/react-popover"
import { BookmarkType } from "@/lib/repositories/bookmarks"
import { useBookmarkUpdate } from "../../../hooks/useBookmarkUpdate"
import { AddBookmarkState } from "../../../_actions/handleAddBookmark"
import { updateBookmark } from "../../../_actions/handleUpdateBookmark"
import AddBookmarkErrors from "../../../_components/ValidationError/AddBookmarkErrors"
import { deleteBookmark } from "../../../_actions/handleDeleteBookmark"
import { useRouter } from 'next/navigation';


const ImageWitdth = 460
const ImageHeight = Math.floor(ImageWitdth / 1.91)

type Props = {
    bookmark: BookmarkType
}

const BookmarkDialogContent: FC<Props> = ({ bookmark }) => {
    const { ogp, setNote, note, refetch } = useBookmarkUpdate(bookmark)
    const [errors, setErrors] = useState<AddBookmarkState | null>(null)
    const router = useRouter();
    if (!bookmark) return null
    return (
        <Dialog
            modal
            open
            onOpenChange={(isOpen) => {
                if (!isOpen) {
                    router.back()
                }
            }}
        >
            <DialogContent className='flex h-full flex-col overflow-auto'>
                <DialogTitle>Update Bookmark</DialogTitle>
                <DialogDescription>Edit your bookmark information.</DialogDescription>
                <form className='flex flex-col gap-1' action={async (form) => {
                    const result = await updateBookmark({
                        url: bookmark.url,
                        title: ogp?.title || bookmark.ogpTitle,
                        description: ogp?.description || bookmark.ogpDescription,
                        imageUrl: ogp?.image?.url || bookmark.ogpImage,
                        note
                    })
                    if (!('success' in result)) {
                        setErrors(result)
                        return
                    }
                    router.back()
                }}>
                    <OgpImage image={ogp?.image?.url || bookmark?.ogpImage} alt={ogp?.title || bookmark?.ogpTitle || bookmark?.url} width={ImageWitdth} height={ImageHeight} />
                    <label htmlFor="url">URL</label>
                    <CopyableItem id='url' content={bookmark.url} />
                    <label htmlFor="title">Title</label>
                    <Input id='title' name='title' value={ogp?.title || bookmark.ogpTitle || bookmark?.url} disabled />
                    <label htmlFor="description">Description</label>
                    <Textarea id='description' name='description' value={ogp?.description || bookmark.ogpDescription || ''} disabled />
                    <div className='flex w-full items-center'>
                        <Button className='ml-auto w-fit' variant='ghost' type='button' onClick={refetch}>
                            <RotateCwIcon className='mr-1 size-5' />
                            Update OGP Info
                        </Button>
                    </div>
                    <label htmlFor="note">Note</label>
                    <Textarea id='note' name='note' value={note} onChange={(e) => { setNote(e.target.value) }} />
                    {errors && <AddBookmarkErrors state={errors} />}

                    <DialogFooter className='mt-2'>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button type='button' variant='destructive' className='mr-auto'>
                                    <TrashIcon className='mr-1 size-5' />
                                    DELETE</Button>
                            </PopoverTrigger>
                            <PopoverContent>
                                <div>Are you sure you want to delete this bookmark?</div>
                                <div className='flex gap-1'>
                                    <PopoverClose asChild>
                                        <Button type='button' variant='ghost' >Cancel</Button>
                                    </PopoverClose>
                                    <Button type='button' variant='destructive' onClick={async () => {
                                        const { error } = await deleteBookmark({ bookmarkId: bookmark.bookmarkId })
                                        if (error) {
                                            console.error(error)
                                            setErrors({ error })
                                        } else {
                                            router.back()
                                        }
                                    }}>Delete</Button>
                                </div>
                            </PopoverContent>
                        </Popover>
                        <Button onClick={() => {
                            router.back()
                        }} type="button">Cancel</Button>
                        <Button type='submit'>Update</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default BookmarkDialogContent