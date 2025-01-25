import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { BookmarkSortOption, BookmarkSortOptions } from "@/lib/types"
import { SortDescIcon, TrashIcon } from "lucide-react"

type Props = {
    sortOption: BookmarkSortOption,
    setSortOption: (option: BookmarkSortOption) => void,
}

const SortOptionPopup: React.FC<Props> = ({
    sortOption,
    setSortOption,
}) => {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button size='icon' variant='ghost'>
                    <SortDescIcon className='size-6 stroke-muted-foreground' />
                </Button>
            </PopoverTrigger>
            <PopoverContent>
                <div className="text-muted-foreground my-2">Select sort option</div>
                <RadioGroup defaultValue={sortOption} onValueChange={(value) => {
                    setSortOption(value as BookmarkSortOption)
                }} >
                    {Object.keys(BookmarkSortOptions).map(option => (
                        <div className='flex items-center gap-2' key={option}>
                            <RadioGroupItem value={option} />
                            <Label htmlFor={option}>{BookmarkSortOptions[option as BookmarkSortOption].label}</Label>
                        </div>
                    ))}
                </RadioGroup>
            </PopoverContent>
        </Popover>
    )
}

export default SortOptionPopup