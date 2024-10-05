'use client'
import {
    TagUsageType
} from "@/lib/repositories/tags"
import { TagIcon } from "lucide-react"
import { useSearchTagUsage } from "@/hooks/useSearchTagUsage"
import DeletableTag from "./DeletableTag"
import AddableTag from "./AddableTag"
import { useMemo } from "react"

type Props = {
    id?: string
    registeredTags: TagUsageType[],
    unregisteredTags: TagUsageType[],
    onSelectTag: (tag: TagUsageType, registered: boolean) => void,
    onClearTag: (tag: TagUsageType, registered: boolean) => void,
}

const TagsSetter = ({ id,
    registeredTags,
    unregisteredTags,
    onClearTag,
    onSelectTag
}: Props) => {
    const { tags: searchedTags, searchTag, setSearchTag } = useSearchTagUsage()
    const searchedTagsWithoutRegistered = useMemo(() => searchedTags.filter(tag => !registeredTags.find(t => t.name === tag.name)), [searchedTags, registeredTags])
    return (
        <div className='relative'>
            <div className='flex-wrap gap-2 w-full px-3 py-2 rounded border-input flex items-center border bg-background ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2'>
                {registeredTags.length > 0 && registeredTags.map(tag => (
                    <DeletableTag registered key={tag.tagId} tag={tag} onClearTag={() => {
                        onClearTag(tag, true)
                    }} />))}
                {unregisteredTags.length > 0 && unregisteredTags.map(tag => (
                    <DeletableTag registered={false} key={tag.tagId} tag={tag} onClearTag={() => {
                        onClearTag(tag, false)
                    }} />))}
                <div className='flex items-center flex-1 gap-2 py-1'>
                    <TagIcon className='size-4 text-muted-foreground' />
                    <input
                        placeholder="Input Tag Name"
                        id={id}
                        onChange={(e) => setSearchTag(e.target.value)}
                        value={searchTag}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                e.preventDefault()
                                e.stopPropagation()
                                if (searchTag) {
                                    const target = registeredTags.find(tag => tag.name === searchTag)
                                    if (target) {
                                        onSelectTag(target, true)
                                        return
                                    }
                                    onSelectTag({
                                        tagId: -1,
                                        userId: '',
                                        name: searchTag,
                                        count: 0,
                                    }, false)
                                    setSearchTag('')
                                }
                            }
                        }}
                        type="text" className='bg-background text-sm placeholder:text-muted-foreground 
                    focus-visible:bg-background
                    focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50
                    flex-1 min-w-[150px]
                    ' />
                </div>
            </div>
            {searchedTagsWithoutRegistered.length > 0 && (
                <div className='flex items-center p-3 w-full gap-2 flex-wrap'>
                    {searchedTagsWithoutRegistered.map(tag => (
                        <AddableTag key={tag.tagId} tag={tag} onAddTag={() => {
                            onSelectTag(tag, true)
                            setSearchTag('')
                        }} />
                    ))}
                </div>
            )}
        </div>
    )
}

export default TagsSetter