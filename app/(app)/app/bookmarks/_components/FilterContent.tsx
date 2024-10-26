import { CategoryType } from "@/lib/repositories/categories"
import { TagUsageType } from "@/lib/repositories/tag_usage"
import { FC } from "react"
import { useTags } from "../_hooks/useTags"
import CategorySelector from "@/components/domain/CategorySelector"
import { TagSetter } from "@/components/domain/TagSetter"
import { useBookmarkFilter } from "../_hooks/useBookmarkFilter"

type Props = {
    categories: CategoryType[],
    tags: TagUsageType[]
}

const FilterContent: FC<Props> = ({
    categories,
    tags
}) => {
    const { onDeleteTag, onSelectTag, onClearTags, category, onChangeCategory } = useBookmarkFilter()
    return (
        <div className="flex flex-col gap-2 p-1">
            <div className='flex items-start gap-2'>
                <label htmlFor="category" className="whitespace-nowrap text-muted-foreground">Category</label>
                <div className="w-fit">
                    <CategorySelector id='category' categories={categories} selectedCategory={category} selectCategory={onChangeCategory} />
                </div>
            </div>
            <div className='flex items-start gap-2'>
                <label htmlFor="tags" className="whitespace-nowrap text-muted-foreground">Tags</label>
                <TagSetter variants={{ size: 'md' }} id={'tags'} registeredTags={tags} onSelectTag={onSelectTag} onClearTag={onDeleteTag} onClearAll={onClearTags} />
            </div>
        </div>
    )
}

export default FilterContent