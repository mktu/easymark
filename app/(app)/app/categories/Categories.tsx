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
        <div className='px-[150px] flex flex-col gap-2'>
            <h1>Categories</h1>
            <p>カテゴリを作ることで、ブックマークをカテゴライズすることができます。カテゴリには任意の色を設定することも可能です！</p>
            <section>
                <h2>Add New Category</h2>
                <AdddCategoryForm />
            </section>
            <section>
                <h2>Your Categories</h2>
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