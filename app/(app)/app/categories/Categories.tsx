import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CategoryType } from "@/lib/repositories/categories"
import AdddCategoryForm from "./AddCategoryForm"
import CategoryListItem from "./CategoryListItem"

type Props = {
    categories: CategoryType[]
}

const Categories = ({ categories }: Props) => {
    return (
        <div className='flex justify-center w-full'>
            <div className='flex flex-col justify-start gap-4 w-full max-w-[750px]'>
                <h2 className='text-lg font-semibold'>Categories</h2>
                <p>カテゴリを作ることで、ブックマークをカテゴライズすることができます。カテゴリには任意の色を設定することも可能です！</p>
                <section className='flex flex-col items-start gap-2'>
                    <h3 className='font-semibold'>➕ Add New Category</h3>
                    <AdddCategoryForm />
                </section>
                <section>
                    <h3 className='font-semibold mb-2'>Your Categories</h3>
                    {categories.length === 0 && <p>No categories</p>}
                    <ul>
                        {categories.map(category => (
                            <CategoryListItem key={category.categoryId} category={category} />
                        ))}
                    </ul>
                </section>
            </div>

        </div>
    )
}

export default Categories