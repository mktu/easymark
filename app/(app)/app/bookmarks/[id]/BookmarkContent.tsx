'use client'
import { toast } from "sonner";
import CopyableItem from "@/components/domain/CopyableItem"
import OgpImage from "@/components/domain/OgpImage"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Textarea } from "@/components/ui/textarea"
import { PopoverClose } from "@radix-ui/react-popover"
import { RotateCwIcon, TrashIcon } from "lucide-react"
import { FC, useState } from "react"
import AddBookmarkErrors from "../../_components/ValidationError/AddBookmarkErrors"
import { BookmarkType } from "@/lib/repositories/bookmarks"
import { useBookmarkUpdate } from "../../hooks/useBookmarkUpdate"
import { AddBookmarkState } from "../../_actions/handleAddBookmark"
import { handleUpdateBookmark } from "../../_actions/handleUpdateBookmark"
import { handleDeleteBookmark } from "../../_actions/handleDeleteBookmark"
import { useRouter } from "next/navigation";

type Props = {
    bookmark: BookmarkType
}

const ImageWitdth = 460
const ImageHeight = Math.floor(ImageWitdth / 1.91)

const BookmarkContent: FC<Props> = ({
    bookmark
}) => {
    const { ogp, setNote, note, refetch } = useBookmarkUpdate(bookmark)
    const [errors, setErrors] = useState<AddBookmarkState | null>(null)
    const router = useRouter();
    return (
        <form className='flex flex-col gap-4 size-full items-center py-2' action={async (form) => {
            const result = await handleUpdateBookmark({
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
            toast('Bookmark updated')
        }}>
            <div className='max-w-[700px] flex flex-col gap-2'>
                <div className='flex gap-4 justify-center'>
                    <OgpImage url={bookmark.url} image={ogp?.image?.url || bookmark?.ogpImage} alt={ogp?.title || bookmark?.ogpTitle || bookmark?.url} width={ImageWitdth} height={ImageHeight} />
                    <Button className='w-fit mt-auto' variant='ghost' type='button' onClick={refetch}>
                        <RotateCwIcon className='mr-1 size-5' />
                        Update OGP Info
                    </Button>
                </div>
                <div className='flex flex-col gap-2'>
                    <label htmlFor="url">URL</label>
                    <CopyableItem id='url' content={bookmark.url} />
                    <label htmlFor="title">Title</label>
                    <Input id='title' name='title' value={ogp?.title || bookmark.ogpTitle || bookmark?.url} disabled />
                    <label htmlFor="description">Description</label>
                    <Textarea id='description' name='description' value={ogp?.description || bookmark.ogpDescription || ''} disabled />

                    <label htmlFor="note">Note</label>
                    <Textarea id='note' name='note' value={note} onChange={(e) => { setNote(e.target.value) }} />
                    {errors && <AddBookmarkErrors state={errors} />}
                </div>
            </div>

            <footer className='sticky bottom-0 px-4 py-2 bg-white border-t border-input w-full flex justify-center'>
                <div className='flex items-center w-[700px] gap-2'>
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
                                    const { error } = await handleDeleteBookmark({ bookmarkId: bookmark.bookmarkId })
                                    if (error) {
                                        console.error(error)
                                        setErrors({ error })
                                    } else {
                                        toast('Bookmark deleted')
                                    }
                                }}>Delete</Button>
                            </div>
                        </PopoverContent>
                    </Popover>
                    <Button variant='outline' onClick={() => {
                        router.push('/app')
                    }} type="button">Back to Home</Button>
                    <Button type='submit'>Update</Button>
                </div>
            </footer>
        </form>
    )
}

export default BookmarkContent