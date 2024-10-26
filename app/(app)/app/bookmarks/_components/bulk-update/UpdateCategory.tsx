import CategorySelector from "@/components/domain/CategorySelector";
import { Button } from "@/components/ui/button";
import { CategoryType } from "@/lib/repositories/categories";
import { useState } from "react";
import { handleUpdateCategory } from "../../_actions/handleUpdateCategory";
import { useSignalContext } from "@/contexts/signal";
import { PopoverClose } from "@radix-ui/react-popover";

type Props = {
    categories: CategoryType[],
    bookmarks: number[]
}

const UpdateCategory = ({ categories, bookmarks }: Props) => {
    const [category, setCategory] = useState<number | null>(null)
    const { fireBookmarkFetchSignal } = useSignalContext()
    return (
        <div className="flex flex-col gap-2">
            <label htmlFor="bulk-category" className="text-muted-foreground">Choose Category</label>
            <CategorySelector id='bulk-category' className='w-full' selectedCategory={category} categories={categories} selectCategory={setCategory} />
            <PopoverClose asChild>
                <Button className="ml-auto" onClick={async () => {
                    if (!category) return
                    const result = await handleUpdateCategory(bookmarks, category)
                    if (result.error) {
                        console.error(result.error)
                        return
                    }
                    fireBookmarkFetchSignal(bookmarks)
                }}>
                    UPDATE
                </Button>
            </PopoverClose>
        </div>
    )
}

export default UpdateCategory