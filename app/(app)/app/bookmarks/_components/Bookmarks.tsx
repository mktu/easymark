'use client'
import { FC, ReactNode } from "react"
import { BookIcon, SearchIcon } from "lucide-react"
import SortSelector from "./SortSelector"
import { InputWithIcon } from "@/components/domain/InputWithIcon"
import { useBookmarkInput } from "../_hooks/useBookmarkInput"
import CategorySelector from "@/components/domain/CategorySelector"
import { CategoryType } from "@/lib/repositories/categories"

type Props = {
    bookmarklist: ReactNode,
    categories: CategoryType[]
}

const Bookmarks: FC<Props> = ({ bookmarklist, categories }) => {
    const { filter, onFilter, sortOption, onSort, category, onChangeCategory } = useBookmarkInput()
    return (
        <section className='flex size-full flex-col items-start justify-start gap-2 p-4'>
            <h3 className='flex items-center gap-2 font-semibold'>
                <BookIcon className='size-5' /> Bookmarks</h3>
            <nav className="flex w-full items-center gap-2 p-2">
                <InputWithIcon placeholder="Search Bookmarks"
                    leftIcon={<SearchIcon className='size-4 text-muted-foreground' />}
                    className="w-[400px]"
                    defaultValue={filter}
                    onChange={(e) => {
                        onFilter(e.target.value)
                    }} />
                <label htmlFor="category" className="ml-4 whitespace-nowrap text-muted-foreground">Category</label>
                <div className="w-fit">
                    <CategorySelector id='category' categories={categories} selectedCategory={category} selectCategory={onChangeCategory} />
                </div>
                <label className='whitespace-nowrap text-muted-foreground'>Sort by</label>
                <SortSelector {...{ setSortOption: onSort, sortOption }} />

            </nav>
            <hr />
            <ul className="w-full p-2">
                {bookmarklist}
            </ul>
        </section>
    )
}

export default Bookmarks