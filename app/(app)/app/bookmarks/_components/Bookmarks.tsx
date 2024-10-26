'use client'
import { FC, ReactNode } from "react"
import { BookIcon, FilterIcon, SearchIcon, XIcon } from "lucide-react"
import { InputWithIcon } from "@/components/domain/InputWithIcon"
import { useBookmarkInput } from "../_hooks/useBookmarkInput"
import { CategoryType } from "@/lib/repositories/categories"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { TagUsageType } from "@/lib/repositories/tag_usage"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { PopoverClose } from "@radix-ui/react-popover"
import { Button } from "@/components/ui/button"
import FilterContent from "./FilterContent"
import { useBookmarkFilter } from "../_hooks/useBookmarkFilter"
import { cn } from "@/lib/utils"

type Props = {
    bookmarklist: ReactNode,
    categories: CategoryType[],
    tags: TagUsageType[]
}

const Bookmarks: FC<Props> = ({ bookmarklist, categories, tags }) => {
    const { filter, onFilter } = useBookmarkInput()
    const { hasFilter, removeAllFilters } = useBookmarkFilter()
    return (
        <section className='flex size-full flex-col items-start justify-start gap-2 p-4'>
            <h2 className='flex items-center gap-2 text-lg font-semibold'>
                <BookIcon className='size-5' />Bookmarks</h2>
            <div className="flex w-full flex-col gap-2 p-2">
                <div className='flex items-center gap-4'>
                    <InputWithIcon placeholder="Search Bookmarks"
                        leftIcon={<SearchIcon className='size-4 text-muted-foreground' />}
                        className="w-[400px]"
                        defaultValue={filter}
                        onChange={(e) => {
                            onFilter(e.target.value)
                        }} />
                    <Popover>
                        <PopoverTrigger className="group flex items-center gap-2 text-muted-foreground">
                            <FilterIcon className={cn('size-6 stroke-muted-foreground', hasFilter && 'fill-muted-foreground')} />
                            <p className="group-hover:underline">Filters</p>
                        </PopoverTrigger>
                        <PopoverContent className="w-[520px]">
                            <FilterContent
                                categories={categories}
                                tags={tags}
                            />
                            <div className='flex gap-1'>
                                <PopoverClose asChild>
                                    <Button type='button' variant='outline' onClick={removeAllFilters}>
                                        <XIcon className='mr-1 size-4' />
                                        Remove All
                                    </Button>
                                </PopoverClose>
                                <PopoverClose asChild className="ml-auto">
                                    <Button type='button' variant='ghost' >Close</Button>
                                </PopoverClose>
                            </div>
                        </PopoverContent>
                    </Popover>
                </div>
                <Accordion type="single" collapsible className="w-full md:hidden" defaultValue="item-1">
                    <AccordionItem value="item-1" className="border-none">
                        <AccordionTrigger className="group flex w-[120px] items-center justify-start gap-2 font-normal text-muted-foreground">
                            <p className="group-hover:underline">Filters</p>
                        </AccordionTrigger>
                        <AccordionContent className="ml-4 flex flex-col gap-2 p-1">
                            <FilterContent
                                categories={categories}
                                tags={tags}
                            />
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
            {bookmarklist}
        </section>
    )
}

export default Bookmarks