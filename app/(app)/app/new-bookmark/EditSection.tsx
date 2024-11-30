import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { PlusCircleIcon } from "lucide-react"
import { FC } from "react"
import CategorySelector from "@/components/domain/CategorySelector"
import { CategoryType } from "@/lib/repositories/categories"
import { HandleAddBookmarkReturnType } from "../_actions/handleAddBookmark"
import ErrorIndicator from "../_components/ErrorIndicator/ErrorIndicator"
import { TagUsageType } from "@/lib/repositories/tag_usage"
import { TagSelectableInput } from "@/components/domain/TagSetter"

type Props = {
    note?: string,
    setNote: (note: string) => void,
    categories: CategoryType[],
    category?: number | null,
    setCategory: (category: number | null) => void,
    validBookmark: boolean,
    result?: HandleAddBookmarkReturnType | null,
    registeredTags: TagUsageType[],
    onSelectTag: (tag: TagUsageType) => void
    onClearTag: (tag: TagUsageType) => void
    onClearAllTags: () => void
}

const EditSection: FC<Props> = ({
    note,
    setNote,
    category,
    setCategory,
    categories,
    validBookmark,
    result,
    registeredTags,
    onSelectTag,
    onClearTag,
    onClearAllTags
}) => {
    return (
        <section className='flex size-full flex-col gap-2 md:min-w-[470px] md:max-w-[500px]'>
            <label htmlFor="note">Note</label>
            <Textarea id='note' name='note' value={note} onChange={(e) => { setNote(e.target.value) }} />
            <ErrorIndicator error={result?.validatedErrors?.note} />
            <label htmlFor="category">Category</label>
            <CategorySelector id='category' categories={categories} selectedCategory={category} selectCategory={(c) => {
                setCategory(c)
            }} />
            <label htmlFor="tags">Tags</label>
            <TagSelectableInput
                id='tags'
                registeredTags={registeredTags}
                onClearTag={onClearTag}
                onSelectTag={onSelectTag}
                onClearAll={onClearAllTags}
            />
            <ErrorIndicator error={result?.validatedErrors?.category} />
            <div className='mt-4 flex items-center'>
                <Button type='submit' disabled={!validBookmark}>
                    <PlusCircleIcon className='mr-1 size-5' />
                    Add Bookmark
                </Button>
            </div>
        </section>
    )
}

export default EditSection