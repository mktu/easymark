import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { RefreshCwIcon, TrashIcon } from "lucide-react"
import { FC } from "react"
import ErrorIndicator from "../../_components/ErrorIndicator/ErrorIndicator"
import CategorySelector from "@/components/domain/CategorySelector"
import { CategoryType } from "@/lib/repositories/categories"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { PopoverClose } from "@radix-ui/react-popover"
import { HandleUpdateBookmarkReturnType } from "../../_actions/handleUpdateBookmark"
import { TagSetter } from "@/components/domain/TagSetter"
import { TagUsageType } from "@/lib/repositories/tag_usage"

type Props = {
    note?: string,
    setNote: (note: string) => void,
    categories: CategoryType[],
    category?: number | null,
    setCategory: (category: number | null) => void,
    result?: HandleUpdateBookmarkReturnType | null,
    registeredTags: TagUsageType[],
    onSelectTag: (tag: TagUsageType) => void
    onClearTag: (tag: TagUsageType) => void
    onDelete: () => void
}

const EditSection: FC<Props> = ({
    note,
    setNote,
    category,
    setCategory,
    categories,
    result,
    onDelete,
    registeredTags,
    onSelectTag,
    onClearTag
}) => {
    return (
        <section className='flex size-full max-w-[500px] flex-col gap-2 pr-2'>
            <label htmlFor="note">Note</label>
            <Textarea id='note' name='note' value={note} onChange={(e) => { setNote(e.target.value) }} />
            <ErrorIndicator error={result?.validatedErrors?.note} />
            <label htmlFor="category">Category</label>
            <CategorySelector id='category' categories={categories} selectedCategory={category} selectCategory={(c) => {
                setCategory(c)
            }} />
            <ErrorIndicator error={result?.validatedErrors?.category} />
            <label htmlFor='tags'>Tags</label>
            <TagSetter
                id='tags'
                registeredTags={registeredTags}
                onSelectTag={onSelectTag}
                onClearTag={onClearTag} />
            <div className='mt-4 flex items-center'>
                <div className="mr-auto">
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button type='button' variant='destructive'>
                                <TrashIcon className='mr-1 size-5' />
                                DELETE</Button>
                        </PopoverTrigger>
                        <PopoverContent align="start">
                            <div>Are you sure you want to delete this bookmark?</div>
                            <div className='flex gap-1'>
                                <PopoverClose asChild>
                                    <Button type='button' variant='ghost' >Cancel</Button>
                                </PopoverClose>
                                <Button type='button' variant='destructive' onClick={onDelete}>Delete</Button>
                            </div>
                        </PopoverContent>
                    </Popover>
                </div>
                <Button type='submit'>
                    <RefreshCwIcon className='mr-1 size-5' />
                    Update
                </Button>
            </div>
        </section>
    )
}

export default EditSection