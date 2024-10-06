'use client'
import { FC } from "react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import OgpImage from "@/components/domain/OgpImage"
import { Button } from "@/components/ui/button"
import { useBookmarkInput } from "../../hooks/useBookmarkInput"
import { useRouter } from "next/navigation"
import CategorySelector from "@/components/domain/CategorySelector"
import { CategoryType } from "@/lib/repositories/categories"
import ErrorIndicator from "../../_components/ErrorIndicator/ErrorIndicator"
import TagsSetter from "@/components/domain/TagSetter/TagSetter"

const ImageWitdth = 460
const ImageHeight = Math.floor(ImageWitdth / 1.91)

type Props = {
    categories: CategoryType[],
    selectedCategoryId?: number
}

const NewBookmarkDialog: FC<Props> = ({
    categories,
    selectedCategoryId
}) => {
    const {
        ogp,
        setBookmark,
        bookmark,
        validBookmark,
        note,
        setNote,
        category,
        setCategory,
        handleSubmit,
        addBookmarkResult,
        registeredTags,
        handleClearTag,
        handleSelectTag
    } = useBookmarkInput(selectedCategoryId)
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
                <ErrorIndicator error={addBookmarkResult?.error} />
                <form className='flex h-full flex-1 flex-col gap-1 overflow-hidden' action={async () => {
                    if (!await handleSubmit()) {
                        return
                    }
                    router.back()
                }}>
                    <div className='flex flex-1 flex-col gap-1 overflow-y-auto px-3'>
                        <label htmlFor="url">URL</label>
                        <Input id='url' name='url' value={bookmark} onChange={(e) => {
                            setBookmark(e.target.value)
                        }} />
                        <ErrorIndicator error={addBookmarkResult?.validatedErrors?.url} />
                        <label htmlFor="note">Note</label>
                        <Textarea className='mb-2' id='note' name='note' value={note} onChange={(e) => { setNote(e.target.value) }} />
                        <ErrorIndicator error={addBookmarkResult?.validatedErrors?.note} />
                        <label htmlFor="category">Category</label>
                        <CategorySelector id='category' categories={categories} selectedCategory={category} selectCategory={setCategory} />
                        <ErrorIndicator error={addBookmarkResult?.validatedErrors?.category} />
                        <label htmlFor="tags">Tags</label>
                        <TagsSetter
                            id='tags'
                            registeredTags={registeredTags}
                            onClearTag={handleClearTag}
                            onSelectTag={handleSelectTag} />
                        <h3 className='my-4 font-semibold'>OGP Information</h3>
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