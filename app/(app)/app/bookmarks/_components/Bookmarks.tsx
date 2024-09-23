'use client'
import { FC, ReactNode } from "react"
import { BookIcon, SearchIcon } from "lucide-react"
import SortSelector from "./SortSelector"
import { InputWithIcon } from "@/components/domain/InputWithIcon"
import { useBookmarkInput } from "../_hooks/useBookmarkInput"

type Props = {
    bookmarklist: ReactNode,
}

const Bookmarks: FC<Props> = ({ bookmarklist }) => {
    const { filter, onFilter, sortOption, onSort } = useBookmarkInput()
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
                <label className='ml-10 whitespace-nowrap text-muted-foreground'>Sort by</label>
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