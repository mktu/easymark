import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { PlusCircleIcon, RefreshCwIcon } from "lucide-react"
import { FC } from "react"
import CategorySelector from "@/components/domain/CategorySelector"
import { CategoryType } from "@/lib/repositories/categories"
import { AddBookmarkState, HandleAddBookmarkReturnType } from "../_actions/handleAddBookmark"
import ErrorIndicator from "../_components/ErrorIndicator/ErrorIndicator"

type Props = {
    note?: string,
    setNote: (note: string) => void,
    categories: CategoryType[],
    category?: number | null,
    setCategory: (category: number | null) => void,
    validBookmark: boolean,
    result?: HandleAddBookmarkReturnType | null
}

const EditSection: FC<Props> = ({
    note,
    setNote,
    category,
    setCategory,
    categories,
    validBookmark,
    result
}) => {
    return (
        <section className='flex size-full min-w-[470px] max-w-[500px] flex-col gap-2'>
            <label htmlFor="note">Note</label>
            <Textarea id='note' name='note' value={note} onChange={(e) => { setNote(e.target.value) }} />
            <ErrorIndicator error={result?.validatedErrors?.note} />
            <label htmlFor="category">Category</label>
            <CategorySelector id='category' categories={categories} selectedCategory={category} selectCategory={(c) => {
                setCategory(c)
            }} />
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