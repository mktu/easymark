'use client'
import { FC } from "react"
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
import ErrorIndicator from "../../../_components/ErrorIndicator/ErrorIndicator"
import { useRouter } from 'next/navigation';
import { CategoryType } from "@/lib/repositories/categories"
import CategorySelector from "@/components/domain/CategorySelector"
import { TagUsageType } from "@/lib/repositories/tag_usage"
import { useSignalContext } from "@/contexts/signal"
import { TagSelectableInput } from "@/components/domain/TagSetter"


const ImageWitdth = 460
const ImageHeight = Math.floor(ImageWitdth / 1.91)

type Props = {
    bookmark: BookmarkType,
    categories: CategoryType[],
    tagUsage: TagUsageType[],
    selectedCategoryId?: number
    from?: string | null
}

const BookmarkDialogContent: FC<Props> = ({ tagUsage, bookmark, categories, selectedCategoryId, from }) => {
    const { ogp, setNote, note, refetch, category, setCategory,
        registeredTags,
        handleSubmit, handleDelete,
        handleClearTag, handleSelectTag,
        handleClearAllTags,
        updateResult, error } = useBookmarkUpdate(tagUsage, bookmark, selectedCategoryId)
    const router = useRouter();
    const { fireBookmarkFetchSignal, fireBookmarkTagSignal } = useSignalContext();
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
                {error && <ErrorIndicator error={error} />}
                <form className='flex flex-col gap-1' action={async () => {
                    if (!await handleSubmit()) {
                        return
                    }
                    fireBookmarkFetchSignal([bookmark.bookmarkId])
                    fireBookmarkTagSignal(true)
                    router.back()
                }}>
                    <OgpImage url={bookmark.url} image={ogp?.image?.url || bookmark?.ogpImage} alt={ogp?.title || bookmark?.ogpTitle || bookmark?.url} width={ImageWitdth} height={ImageHeight} />
                    <label htmlFor="url">URL</label>
                    <CopyableItem id='url' content={bookmark.url} />
                    <ErrorIndicator error={updateResult?.validatedErrors?.url} />
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
                    <label htmlFor="category">Category</label>
                    <CategorySelector id='category' categories={categories} selectedCategory={category} selectCategory={setCategory} />
                    <ErrorIndicator error={updateResult?.validatedErrors?.category} />
                    <label htmlFor="tags">Tags</label>
                    <TagSelectableInput
                        id='tags'
                        registeredTags={registeredTags}
                        onClearTag={handleClearTag}
                        onSelectTag={handleSelectTag}
                        onClearAll={handleClearAllTags}
                    />
                    <label htmlFor="note">Note</label>
                    <Textarea id='note' name='note' value={note} onChange={(e) => { setNote(e.target.value) }} />
                    <ErrorIndicator error={updateResult?.validatedErrors?.note} />
                    <DialogFooter className='mt-2'>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button type='button' variant='destructive' className='mr-auto hidden md:block'>
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
                                        if (await handleDelete()) {
                                            router.back()
                                        }
                                    }}>Delete</Button>
                                </div>
                            </PopoverContent>
                        </Popover>
                        <Button variant={'ghost'} onClick={() => {
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