import { CategoryType } from "@/lib/repositories/categories"
import { FC } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger } from "../ui/select"
import CategoryBox from "./CategoryBox"
import { cn } from "@/lib/utils"

type Props = {
    id?: string,
    className?: string,
    categories: CategoryType[],
    selectedCategory?: number | null,
    selectCategory: (category: number | null) => void
}

const CategorySelector: FC<Props> = ({
    id,
    className,
    categories,
    selectedCategory,
    selectCategory
}) => {
    const emptyCategory = { categoryId: 'dummy', name: 'No Category', color: '' }
    return (
        <Select name='category' value={String(selectedCategory)} onValueChange={(value) => {
            selectCategory(value === emptyCategory.categoryId ? null : Number(value))
        }}>
            <SelectTrigger id={id}>
                <div className={cn('flex items-center gap-2', className)}>
                    <CategoryBox size='sm' color={categories.find(
                        (c) => c.categoryId === selectedCategory)?.color} />
                    <div className='w-full truncate'>{categories.find((c) => c.categoryId === selectedCategory)?.name || emptyCategory.name}</div>
                </div>
            </SelectTrigger>
            <SelectContent>
                {[emptyCategory, ...categories].map(category => (
                    <SelectItem key={category.categoryId} value={String(category.categoryId)} className="cursor-pointer">
                        <div className='flex items-center gap-2'>
                            <CategoryBox size='sm' color={category?.color} />
                            <div>{category.name}</div>
                        </div>
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}

export default CategorySelector