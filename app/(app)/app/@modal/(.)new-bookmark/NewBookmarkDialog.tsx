'use client'
import { FC, useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogTitle } from "@/components/ui/dialog"
import { addBookmark, AddBookmarkState } from "../../_actions/handleAddBookmark"
import { Input } from "@/components/ui/input"
import { CircleAlertIcon } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import OgpImage from "@/components/domain/OgpImage"
import { Button } from "@/components/ui/button"
import { useBookmarkInput } from "../../hooks/useBookmarkInput"
import { useRouter } from "next/navigation"

const ImageWitdth = 460
const ImageHeight = Math.floor(ImageWitdth / 1.91)

const NewBookmarkDialog: FC = () => {
    const { ogp, setBookmark, bookmark, validBookmark, note, setNote } = useBookmarkInput()
    const [errors, setErrors] = useState<AddBookmarkState | null>(null)
    const router = useRouter();
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
            <DialogContent className='flex h-full flex-col overflow-hidden'>
                <DialogTitle>Add Bookmark</DialogTitle>
                <DialogDescription>Input url you want to bookmark.</DialogDescription>
                <form className='flex h-full flex-1 flex-col gap-1 overflow-hidden' action={async () => {
                    const result = await addBookmark({
                        url: bookmark,
                        title: ogp?.title,
                        description: ogp?.description,
                        imageUrl: ogp?.image?.url,
                        note
                    })
                    if (!('success' in result)) {
                        setErrors(result)
                        return
                    }
                    router.back()
                }}>
                    <div className='flex flex-1 flex-col gap-1 overflow-y-auto px-3'>
                        <label htmlFor="url">URL</label>
                        <Input id='url' name='url' value={bookmark} onChange={(e) => {
                            setBookmark(e.target.value)
                        }} />
                        {errors && 'error' in errors && (
                            <p className='flex items-center text-destructive'>
                                <CircleAlertIcon className='mr-1 size-5' />
                                {errors.error}
                            </p>
                        )}
                        <label htmlFor="note">Note</label>
                        <Textarea className='mb-2' id='note' name='note' value={note} onChange={(e) => { setNote(e.target.value) }} />
                        <h3 className='my-1 font-semibold'>OGP Information</h3>
                        {ogp ? (
                            <>
                                <OgpImage image={ogp?.image?.url} alt={ogp?.title || bookmark} width={ImageWitdth} height={ImageHeight} />
                                <label htmlFor="title">Title</label>
                                <Input id='title' name='title' value={ogp?.title || bookmark} disabled />
                                <label htmlFor="description">Description</label>
                                <Textarea id='description' name='description' value={ogp?.description || ''} disabled />
                            </>
                        ) : (
                            <p>URLを入力すると自動取得されます（サイトによっては取得できない場合があります）</p>
                        )}
                    </div>

                    <DialogFooter>
                        <Button onClick={() => {
                            router.back()
                        }} type="button">Cancel</Button>
                        <Button disabled={!validBookmark} type='submit'>Add</Button>
                    </DialogFooter>
                </form>
            </DialogContent>

        </Dialog>
    )
}

export default NewBookmarkDialog