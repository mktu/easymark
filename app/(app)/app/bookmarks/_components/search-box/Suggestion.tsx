import { CommandGroup, CommandItem, CommandList } from "@/components/ui/command"
import { CategoryType } from "@/lib/repositories/categories"
import { TagUsageType } from "@/lib/repositories/tag_usage"
import { FC } from "react"

type Props = {
    selectableTags: TagUsageType[],
    selectableCategories: CategoryType[],
    isSuggesting: boolean,
    onSelectTag: (_: TagUsageType) => void,
    onSelectCategory: (_: CategoryType) => void
}

const Suggestion: FC<Props> = ({
    selectableTags,
    selectableCategories,
    isSuggesting,
    onSelectTag,
    onSelectCategory
}) => {
    return (
        <>
            {(selectableTags.length > 0 || selectableCategories.length > 0) && isSuggesting ? (
                <CommandList className="absolute left-0 top-0 z-10 w-full rounded bg-background shadow-md">
                    <CommandItem className="hidden">-</CommandItem>
                    {selectableTags.length > 0 && (
                        <CommandGroup heading="Suggestions">
                            {selectableTags.map(tag => (
                                <CommandItem className="p-2 text-base text-muted-foreground" key={tag.tagId} onSelect={() => {
                                    onSelectTag(tag)
                                }}>
                                    {tag.name}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    )}
                    {selectableCategories.length > 0 && (
                        <CommandGroup heading="Categories">
                            {selectableCategories.map(category => (
                                <CommandItem className="p-2 text-base text-muted-foreground" key={category.categoryId} onSelect={() => {
                                    onSelectCategory(category)
                                }}>
                                    {category.name}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    )}
                </CommandList>
            ) : <CommandList />}
        </>
    )
}

export default Suggestion