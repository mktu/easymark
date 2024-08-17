'use client'
import { FC, useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { CircleAlertIcon } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import OgpImage from "@/components/domain/OgpImage"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useBookmarkInput } from "../hooks/useBookmarkInput"
import { addBookmark, AddBookmarkState } from "../_actions/handleAddBookmark"

const ImageWitdth = 460
const ImageHeight = Math.floor(ImageWitdth / 1.91)

const NewBookmark: FC = () => {
    const { ogp, setBookmark, bookmark, validBookmark, note, setNote } = useBookmarkInput()
    const [errors, setErrors] = useState<AddBookmarkState | null>(null)
    const router = useRouter();
    return (
        <form className='flex flex-col gap-4 size-full items-center py-2 overflow-hidden' action={async () => {
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
            <div className='flex-1 overflow-y-auto w-full flex justify-center'>
                <div className='flex flex-col gap-1 flex-1 px-[250px] py-2'>
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
            </div>

            <footer className="flex items-center w-full justify-end px-[250px] gap-2">
                <Button variant='outline' onClick={() => {
                    router.back()
                }} type="button">Back</Button>
                <Button disabled={!validBookmark} type='submit'>Add</Button>
            </footer>
        </form>
    )
}

export default NewBookmark