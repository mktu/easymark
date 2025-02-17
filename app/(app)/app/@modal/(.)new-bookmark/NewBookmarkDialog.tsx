'use client'
import { FC } from "react"
import { DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import OgpImage from "@/components/domain/OgpImage"
import { Button } from "@/components/ui/button"
import { useBookmarkInput } from "../../../../../hooks/bookmarks/new/useBookmarkInput"
import { useRouter } from "next/navigation"
import CategorySelector from "@/components/domain/CategorySelector"
import { CategoryType } from "@/lib/repositories/categories"
import ErrorIndicator from "../../_components/ErrorIndicator/ErrorIndicator"
import { TagSelectableInput } from "@/components/domain/TagSetter"

const ImageWitdth = 460
const ImageHeight = Math.floor(ImageWitdth / 1.91)

type Props = {
    categories: CategoryType[],
    selectedCategoryId?: number,
    from?: string | null
}

const NewBookmarkDialog: FC<Props> = ({
    categories,
    selectedCategoryId,
    from
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
        handleSelectTag,
        handleClearAllTags
    } = useBookmarkInput(selectedCategoryId)
    const router = useRouter();
    return (
        <form className='flex h-full flex-1 flex-col gap-1 overflow-hidden' action={async () => {
            if (!await handleSubmit()) {
                return
            }
            location.href = from || `/app/bookmarks`
        }}>
            <ErrorIndicator error={addBookmarkResult?.error} />
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
                <TagSelectableInput
                    id='tags'
                    registeredTags={registeredTags}
                    onClearTag={handleClearTag}
                    onSelectTag={handleSelectTag}
                    onClearAll={handleClearAllTags}
                />
                <h3 className='font-semibold'>OGP Information</h3>
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
                }} variant='ghost' type="button">Cancel</Button>
                <Button disabled={!validBookmark} type='submit'>Add</Button>
            </DialogFooter>
        </form>
    )
}

export default NewBookmarkDialog