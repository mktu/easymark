'use client'
import { InfoIcon, TagIcon } from "lucide-react"
import { useSearchTagUsage } from "@/hooks/useSearchTagUsage"
import DeletableTag from "./DeletableTag"
import AddableTag from "./AddableTag"
import { Button } from "@/components/ui/button"
import ErrorIndicator from "@/app/(app)/app/_components/ErrorIndicator/ErrorIndicator"
import { TagUsageType } from "@/lib/repositories/tag_usage"

type Props = {
    id?: string
    registeredTags: TagUsageType[],
    onSelectTag: (tag: TagUsageType) => void,
    onClearTag: (tag: TagUsageType) => void,
}

const TagsSetter = ({ id,
    registeredTags,
    onClearTag,
    onSelectTag
}: Props) => {
    const {
        selectableTags,
        searchTag,
        setSearchTag,
        addTagTarget,
        error,
        handleEnter,
        handleAddTag,
        handleCancelAddTag } = useSearchTagUsage(onSelectTag, registeredTags)
    return (
        <div className='relative'>
            <div className='flex w-full flex-wrap items-center gap-2 rounded border border-input bg-background px-3 py-2 ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2'>
                {registeredTags.length > 0 && registeredTags.map(tag => (
                    <DeletableTag registered key={tag.tagId} tag={tag} onClearTag={() => {
                        onClearTag(tag)
                    }} />))}
                <div className='flex flex-1 items-center gap-2 py-1'>
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
                                handleEnter()
                            }
                        }}
                        type="text" className='min-w-[150px] flex-1 bg-background 
                    text-sm
                    placeholder:text-muted-foreground focus-visible:bg-background focus-visible:outline-none
                    disabled:cursor-not-allowed disabled:opacity-50
                    ' />
                </div>
            </div>
            {error && <ErrorIndicator className='my-2' error={error} />}
            {addTagTarget && (
                <div className='mt-4 flex flex-col gap-2 rounded bg-blue-50 p-2 shadow'>
                    <div className='flex w-full items-center justify-end gap-2'>
                        <InfoIcon className='size-5 text-muted-foreground' />
                        <span>Not Registered.</span>
                        <span>Register</span>
                        <span className='rounded bg-white p-2 shadow'>{addTagTarget}</span>
                        <span>?</span>
                    </div>
                    <div className='flex w-full items-center justify-end gap-2'>
                        <Button onClick={handleAddTag} type='button' variant='outline' size={'sm'}>Register</Button>
                        <Button onClick={handleCancelAddTag} type='button' variant='ghost' size={'sm'}>Cancel</Button>
                    </div>
                </div>
            )}
            {selectableTags.length > 0 && (
                <div className='flex w-full flex-wrap items-center gap-2 p-3'>
                    {selectableTags.map(tag => (
                        <AddableTag key={tag.tagId} tag={tag} onAddTag={() => {
                            onSelectTag(tag)
                            setSearchTag('')
                        }} />
                    ))}
                </div>
            )}
        </div>
    )
}

export default TagsSetter