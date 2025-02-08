import { TagUsageType } from "@/lib/repositories/tag_usage"
import { CommandItem, CommandList } from "cmdk"
import { FC } from "react"

type Props = {
    selectableTags: TagUsageType[],
    onSelect: (_: TagUsageType) => void
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