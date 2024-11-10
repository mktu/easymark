import { DropdownMenu, DropdownMenuContent } from "@/components/ui/dropdown-menu"
import { TagUsageType } from "@/lib/repositories/tag_usage"
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu"
import { CommandItem, CommandList } from "cmdk"
import { FC } from "react"

type Props = {
    selectableTags: TagUsageType[],
    onSelect: (tag: TagUsageType) => void
}

const TagSuggestions: FC<Props> = ({
    selectableTags,
    onSelect
}) => {
    return (
        <CommandList className="absolute left-0 top-0 w-full rounded bg-background shadow-md">
            {selectableTags.map(tag => (
                <CommandItem key={tag.tagId} onSelect={() => {
                    onSelect(tag)
                }}>
                    {tag.name}
                </CommandItem>
            ))}
        </CommandList>
    )
}

export default TagSuggestions