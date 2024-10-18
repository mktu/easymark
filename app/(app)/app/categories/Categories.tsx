import { CategoryWithBookmarkCountType } from "@/lib/repositories/categories"
import AdddCategoryForm from "./AddCategoryForm"
import CategoryListItem from "./CategoryListItem"
import { LayoutGridIcon, PinIcon, PlusCircleIcon } from "lucide-react"

type Props = {
    categories: CategoryWithBookmarkCountType[]
}

const Categories = ({ categories }: Props) => {
    return (
        <div className='flex size-full flex-col items-start justify-start gap-6 p-4'>
            <section className='flex flex-col gap-2'>
                <h2 className='flex items-center gap-2 text-lg font-semibold'>
                    <LayoutGridIcon className="size-5" />
                    <span>Categories</span>
                </h2>
                <p>カテゴリを作ることで、ブックマークをカテゴライズすることができます。カテゴリには任意の色を設定することも可能です！</p>
            </section>
            <section className='flex flex-col items-start gap-2'>
                <h3 className='flex items-center gap-2 font-semibold'>
                    <PlusCircleIcon className='size-4' />
                    Add New Category
                </h3>
                <AdddCategoryForm />
            </section>
            <section>
                <h3 className='mb-2 flex items-center gap-2 font-semibold'>
                    <PinIcon className='size-4' />
                    Your Categories
                </h3>
                {categories.length === 0 && <p>No categories</p>}
                <ul>
                    {categories.map(category => (
                        <CategoryListItem key={category.categoryId} category={category} />
                    ))}
                </ul>
            </section>

        </div>
    )
}

export default Categories