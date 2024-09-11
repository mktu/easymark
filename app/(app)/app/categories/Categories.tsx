import { CategoryWithBookmarkCountType } from "@/lib/repositories/categories"
import AdddCategoryForm from "./AddCategoryForm"
import CategoryListItem from "./CategoryListItem"

type Props = {
    categories: CategoryWithBookmarkCountType[]
}

const Categories = ({ categories }: Props) => {
    return (
        <div className='flex w-full justify-center'>
            <div className='flex w-full max-w-[750px] flex-col justify-start gap-4'>
                <h2 className='text-lg font-semibold'>Categories</h2>
                <p>カテゴリを作ることで、ブックマークをカテゴライズすることができます。カテゴリには任意の色を設定することも可能です！</p>
                <section className='flex flex-col items-start gap-2'>
                    <h3 className='font-semibold'>➕ Add New Category</h3>
                    <AdddCategoryForm />
                </section>
                <section>
                    <h3 className='mb-2 font-semibold'>Your Categories</h3>
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