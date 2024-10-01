'use client'
import { CategoryType } from "@/lib/repositories/categories"
import { LayoutGridIcon } from "lucide-react"
import { BookmarkType } from "@/lib/repositories/bookmarks"
import CategorySection from "./CategorySection"
import Bookmarks from "./Bookmarks"

type Props = {
    category: CategoryType,
    bookmarks: BookmarkType[]
}

const CategoryPage = ({ category, bookmarks }: Props) => {
    return (
        <div className="flex size-full flex-col items-center gap-8">
            <section className='w-full max-w-[700px]'>
                <h2 className='flex items-center gap-2 text-lg font-semibold'>
                    <LayoutGridIcon className="size-6" /> &quot;{category.name}&quot; category</h2>
            </section>
            <CategorySection category={category} />
            <Bookmarks bookmarks={bookmarks} category={category} />
        </div>
    )
}

export default CategoryPage