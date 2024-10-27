'use client'
import { InfoIcon, TagIcon } from "lucide-react"
import { useSearchTagUsage } from "@/hooks/useSearchTagUsage"
import DeletableTag from "./DeletableTag"
import AddableTag from "./AddableTag"
import { Button } from "@/components/ui/button"
import ErrorIndicator from "@/app/(app)/app/_components/ErrorIndicator/ErrorIndicator"
import { TagUsageType } from "@/lib/repositories/tag_usage"
import { useMemo } from "react"
import { cn } from "@/lib/utils"
import { cva } from "class-variance-authority"
import DeleteAll from "./DeleteAll"
import { Skeleton } from "@/components/ui/skeleton"
import TagSkeltons from "./TagSkeltons"

const inputVariants = cva(
    'flex flex-1 items-center gap-2 py-1',
    {
        variants: {
            size: {
                md: "",
                full: 'w-full'
            },
        },
        defaultVariants: {
            size: "full",
        },
    }
)
const inputWrapperVariants = cva(
    'flex flex-wrap items-center gap-2 rounded border border-input bg-background px-3 py-2 ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2',
    {
        variants: {
            size: {
                md: "",
                full: 'w-full'
            },
        },
        defaultVariants: {
            size: "full",
        },
    }
)

const inputInternalVariants = cva(
    'bg-background text-sm placeholder:text-muted-foreground focus-visible:bg-background focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
    {
        variants: {
            size: {
                md: "w-full flex-1",
                full: 'min-w-[150px] flex-1',
            },
        },
        defaultVariants: {
            size: "full",
        },
    }
)

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

const TagsSetter = ({
    id,
    className,
    variants = { size: 'full' },
    registeredTags,
    onClearTag,
    onSelectTag,
    onClearAll
}: Props) => {
    const {
        selectableTags,
        searchTag,
        setSearchTag,
        addTagTarget,
        error,
        loading,
        handleEnter,
        handleAddTag,
        handleCancelAddTag } = useSearchTagUsage(onSelectTag, registeredTags)
    const selectableItems = useMemo(() => {
        return selectableTags.length > 0 && (
            <div className='flex w-full flex-wrap items-center gap-2 p-3'>
                {selectableTags.map(tag => (
                    <AddableTag key={tag.tagId} tag={tag} onAddTag={() => {
                        onSelectTag(tag)
                        setSearchTag('')
                    }} />
                ))}
            </div>
        )
    }, [selectableTags, onSelectTag, setSearchTag])
    return (
        <div className={cn('w-full', className)}>
            <div className='flex w-full items-center gap-4'>
                <div className={cn(inputWrapperVariants({ size: variants?.size }))}>
                    {registeredTags.length > 0 && registeredTags.map(tag => (
                        <DeletableTag registered key={tag.tagId} tag={tag} onClearTag={() => {
                            onClearTag(tag)
                        }} />))}
                    {registeredTags.length > 0 && <DeleteAll onClearAll={onClearAll} />
                    }
                    <div className={cn(inputVariants({ size: variants?.size }))}>
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
                            type="text" className={cn(inputInternalVariants({ size: variants?.size }))} />
                    </div>
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
            <div className='w-fit p-2'>
                <p className='text-sm text-muted-foreground'>Suggestion</p>
                {loading ? <TagSkeltons /> :
                    selectableTags.length === 0 ? <p className='p-4 text-sm text-muted-foreground'>No Tag Registered</p> : selectableItems}
            </div>
        </div>
    )
}

export default TagsSetter