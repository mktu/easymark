'use client'
import { useSearchTagUsage } from "@/hooks/useSearchTagUsage"
import ErrorIndicator from "@/app/(app)/app/_components/ErrorIndicator/ErrorIndicator"
import { TagUsageType } from "@/lib/repositories/tag_usage"
import { useState } from "react"
import TagInput from "./TagInput"
import { Command, CommandGroup, CommandItem, CommandList } from "@/components/ui/command"



type Variants = {
    size: 'md' | 'full',
}

type Props = {
    id?: string,
    className?: string,
    variants?: Variants,
    registeredTags: TagUsageType[],
    onSelectTag: (tag: TagUsageType) => void,
    onClearTag: (tag: TagUsageType) => void,
    onClearAll: () => void,
}

const TagSelectableInput = ({
    id,
    variants = { size: 'full' },
    registeredTags,
    onClearTag,
    onSelectTag,
    onClearAll
}: Props) => {
    const {
        selectableTags,
        searchTag,
        onChange,
        error,
        loading,
        handleAddTag2,
        handleEnter } = useSearchTagUsage(onSelectTag, registeredTags)
    const [open, setOpen] = useState(false)
    return (
        <Command loop shouldFilter={false} className="overflow-visible">
            <TagInput
                id={id}
                variants={variants}
                searchTag={searchTag}
                selectedTags={registeredTags}
                onClearTag={onClearTag}
                onClearAll={onClearAll}
                onEnter={handleEnter}
                onSearchTag={(text) => {
                    onChange(text)
                    setOpen(!!text)
                }}
                onBlur={() => {
                    // for clicking command list
                    setTimeout(() => {
                        setOpen(false)
                    }, 100);
                }}
                onEscape={() => {
                    setOpen(false)
                }}
            />
            {error && <ErrorIndicator className='my-2' error={error} />}
            <div className='relative mt-1'>
                {open ? (
                    <CommandList className="absolute left-0 top-0 z-10 w-full rounded bg-background shadow-md">
                        {selectableTags.length > 0 && (
                            <CommandGroup heading="Suggestions">
                                <CommandItem className="hidden">-</CommandItem>
                                {selectableTags.map(tag => (
                                    <CommandItem className="p-2 text-base text-muted-foreground" key={tag.tagId} onSelect={() => {
                                        onSelectTag(tag)
                                        onChange('')
                                    }}>
                                        {tag.name}
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        )}
                        {!selectableTags.find(v => v.name === searchTag) && searchTag && !loading && (
                            <CommandGroup heading="Tag not found?">
                                <CommandItem onSelect={() => {
                                    handleAddTag2(searchTag)
                                    onChange('')
                                }} className="p-2 text-base text-muted-foreground">create # {searchTag}</CommandItem>
                            </CommandGroup>
                        )}
                    </CommandList>
                ) : <CommandList />}
            </div>
        </Command>
    )
}

export default TagSelectableInput