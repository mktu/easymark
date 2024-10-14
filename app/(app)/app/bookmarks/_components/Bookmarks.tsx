'use client'
import { FC, ReactNode } from "react"
import { BookIcon, PlusCircle, SearchIcon } from "lucide-react"
import SortSelector from "./SortSelector"
import { InputWithIcon } from "@/components/domain/InputWithIcon"
import { useBookmarkInput } from "../_hooks/useBookmarkInput"
import CategorySelector from "@/components/domain/CategorySelector"
import { CategoryType } from "@/lib/repositories/categories"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { useTags } from "../_hooks/useTags"
import { TagSetter } from "@/components/domain/TagSetter"
import { TagUsageType } from "@/lib/repositories/tag_usage"

type Props = {
    bookmarklist: ReactNode,
    categories: CategoryType[],
    tags: TagUsageType[]
}

const Bookmarks: FC<Props> = ({ bookmarklist, categories, tags }) => {
    const { filter, onFilter, sortOption, onSort, category, onChangeCategory } = useBookmarkInput()
    const { onDeleteTag, onSelectTag, onClearTags } = useTags()
    return (
        <section className='flex size-full flex-col items-start justify-start gap-2 p-4'>
            <h3 className='flex items-center gap-2 font-semibold'>
                <BookIcon className='size-5' />Bookmarks</h3>
            <nav className="flex w-full flex-col gap-2 p-2">
                <div className='flex items-center gap-4'>
                    <InputWithIcon placeholder="Search Bookmarks"
                        leftIcon={<SearchIcon className='size-4 text-muted-foreground' />}
                        className="w-[400px]"
                        defaultValue={filter}
                        onChange={(e) => {
                            onFilter(e.target.value)
                        }} />
                    <div className='flex items-center gap-2'>
                        <label className='whitespace-nowrap text-muted-foreground'>Sort by</label>
                        <SortSelector {...{ setSortOption: onSort, sortOption }} />
                    </div>
                </div>
                <Accordion type="single" collapsible className="w-full" defaultValue="item-1">
                    <AccordionItem value="item-1" className="border-none">
                        <AccordionTrigger className="group flex w-[120px] items-center justify-start gap-2 font-normal text-muted-foreground">
                            <PlusCircle className='size-4 stroke-muted-foreground' />
                            <p className="group-hover:underline">Filters: </p>
                            {tags.length > 0 ? <span>{tags.length} tags</span> : <span>-</span>}
                            <span>/</span>
                            {category ? <span>&quot;{categories.find(v => v.categoryId === category)?.name}&quot; category</span> : <span>-</span>}
                        </AccordionTrigger>
                        <AccordionContent className="ml-4 flex flex-col gap-2 p-1">
                            <div className='flex items-start gap-2'>
                                <label htmlFor="category" className="whitespace-nowrap text-muted-foreground">Category</label>
                                <div className="w-fit">
                                    <CategorySelector id='category' className="w-[280px]" categories={categories} selectedCategory={category} selectCategory={onChangeCategory} />
                                </div>
                            </div>
                            <div className='flex items-start gap-2'>
                                <label htmlFor="tags" className="whitespace-nowrap text-muted-foreground">Tags</label>
                                <TagSetter variants={{ size: 'md' }} id={'tags'} registeredTags={tags} onSelectTag={onSelectTag} onClearTag={onDeleteTag} onClearAll={onClearTags} />
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </nav>
            <ul className="w-full p-2">
                {bookmarklist}
            </ul>
        </section>
    )
}

export default Bookmarks