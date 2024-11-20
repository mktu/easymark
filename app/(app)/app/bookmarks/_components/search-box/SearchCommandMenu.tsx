import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { LayoutGridIcon, SlidersHorizontalIcon, TagIcon } from "lucide-react"
import { FC } from "react"
import { CategoryOperator, TagOperator } from "../../_utils/parseSearchQuery"

type Props = {
    className?: string,
    onSelectCommand?: (command: string) => void
}

const SearchCommandMenu: FC<Props> = ({
    className,
    onSelectCommand
}) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button className={className} variant={'ghost'} size='icon'>
                    <SlidersHorizontalIcon className='size-4 text-muted-foreground' />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Search by</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem onSelect={() => {
                        onSelectCommand && onSelectCommand(TagOperator)
                    }}>
                        <TagIcon />
                        <span>Tag</span>
                        <DropdownMenuShortcut>tag:</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => {
                        onSelectCommand && onSelectCommand(CategoryOperator)
                    }}>
                        <LayoutGridIcon />
                        <span>Category</span>
                        <DropdownMenuShortcut>category:</DropdownMenuShortcut>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default SearchCommandMenu