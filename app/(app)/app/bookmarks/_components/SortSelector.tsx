import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select"
import { BookmarkSortOption, BookmarkSortOptions } from "@/lib/types"
import { FC } from "react"


type Props = {
    sortOption: BookmarkSortOption,
    setSortOption: (_: BookmarkSortOption) => void,
    id?: string
}

const SortSelector: FC<Props> = ({
    sortOption,
    setSortOption,
    id
}) => {
    return (
        <Select name='category' defaultValue={sortOption} onValueChange={setSortOption}>
            <SelectTrigger id={id} className="w-[150px]" >
                <div className='flex items-center gap-2 truncate'>
                    <div>{BookmarkSortOptions[sortOption].label}</div>
                </div>
            </SelectTrigger>
            <SelectContent className="w-[150px]">
                {Object.keys(BookmarkSortOptions).map(option => (
                    <SelectItem key={option} value={option} className="cursor-pointer">
                        <div className='flex items-center gap-2'>
                            <div>{BookmarkSortOptions[option as BookmarkSortOption].label}</div>
                        </div>
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}

export default SortSelector