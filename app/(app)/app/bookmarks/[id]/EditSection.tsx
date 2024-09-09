import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { RefreshCwIcon, TrashIcon } from "lucide-react"
import { FC } from "react"
import AddBookmarkErrors from "../../_components/ValidationError/AddBookmarkErrors"
import { AddBookmarkState } from "../../_actions/handleAddBookmark"
import CategorySelector from "@/components/domain/CategorySelector"
import { CategoryType } from "@/lib/repositories/categories"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { PopoverClose } from "@radix-ui/react-popover"

type Props = {
    note?: string,
    setNote: (note: string) => void,
    categories: CategoryType[],
    category?: number | null,
    setCategory: (category: number | null) => void,
    errors: AddBookmarkState | null,
    onDelete: () => void
}

const EditSection: FC<Props> = ({
    note,
    setNote,
    category,
    setCategory,
    categories,
    errors,
    onDelete
}) => {
    return (
        <section className='flex size-full max-w-[500px] flex-col gap-2'>
            <label htmlFor="note">Note</label>
            <Textarea id='note' name='note' value={note} onChange={(e) => { setNote(e.target.value) }} />
            <label htmlFor="category">Category</label>
            <CategorySelector id='category' categories={categories} selectedCategory={category} selectCategory={(c) => {
                setCategory(c)
            }} />
            {errors && <AddBookmarkErrors state={errors} />}
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