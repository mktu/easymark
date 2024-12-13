'use client'
import { FC } from "react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import OgpImage from "@/components/domain/OgpImage"
import CopyableItem from "@/components/domain/CopyableItem"
import { MoreVertical, RotateCwIcon, TrashIcon } from "lucide-react"
import { BookmarkType } from "@/lib/repositories/bookmarks"
import { useBookmarkUpdate } from "../../../hooks/useBookmarkUpdate"
import ErrorIndicator from "../../../_components/ErrorIndicator/ErrorIndicator"
import { useRouter } from 'next/navigation';
import { CategoryType } from "@/lib/repositories/categories"
import CategorySelector from "@/components/domain/CategorySelector"
import { TagUsageType } from "@/lib/repositories/tag_usage"
import { useSignalContext } from "@/contexts/signal"
import { TagSelectableInput } from "@/components/domain/TagSetter"
import { useViewportContext } from "@/contexts/viewport"
import Delete from "./Delete"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"


const ImageWitdth = 460
const ImageHeight = Math.floor(ImageWitdth / 1.91)

type Props = {
    bookmark: BookmarkType,
    categories: CategoryType[],
    tagUsage: TagUsageType[],
    selectedCategoryId?: number
}

const BookmarkDialogContent: FC<Props> = ({ tagUsage, bookmark, categories, selectedCategoryId
}) => {
    const { ogp, setNote, note, refetch, category, setCategory,
        registeredTags,
        handleSubmit, handleDelete,
        handleClearTag, handleSelectTag,
        handleClearAllTags,
        updateResult, error } = useBookmarkUpdate(tagUsage, bookmark, selectedCategoryId)
    const router = useRouter();
    const { fireBookmarkFetchSignal, fireBookmarkTagSignal, fireBookmarkReloadSignal } = useSignalContext();
    const { viewport } = useViewportContext()
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
                <div className="absolute right-6 top-1">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant='ghost' size='icon' className='mr-2 flex items-center'>
                                <MoreVertical className='size-4' />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem onSelect={async () => {
                                if (await handleDelete()) {
                                    fireBookmarkReloadSignal(true)
                                    router.back()
                                }
                            }}>
                                <TrashIcon className='mr-2 size-4' />
                                <span>DELETE </span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
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
                        {viewport !== 'mobile' && (
                            <div className="mr-auto">
                                <Delete onDelete={async () => {
                                    if (await handleDelete()) {
                                        router.back()
                                    }
                                }} />
                            </div>
                        )}
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