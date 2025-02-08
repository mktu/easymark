import { TagUsageType } from "@/lib/repositories/tag_usage"
import { cn } from "@/lib/utils"
import { cva } from "class-variance-authority"
import { FC, FocusEventHandler } from "react"
import DeletableTag from "./DeletableTag"
import DeleteAll from "./DeleteAll"
import { TagIcon } from "lucide-react"

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
    selectedTags: TagUsageType[],
    onClearTag: (_: TagUsageType) => void,
    onClearAll: () => void,
    onSearchTag: (_: string) => void,
    onEnter?: () => void,
    onFocus?: () => void,
    onBlur?: FocusEventHandler<HTMLInputElement>,
    onEscape: () => void,
    searchTag?: string,
    variants?: Variants,
    id?: string,
}

const TagInput: FC<Props> = ({
    selectedTags,
    onClearTag,
    onClearAll,
    onSearchTag,
    onEnter,
    onFocus,
    onBlur,
    onEscape,
    searchTag,
    variants,
    id
}) => {
    return (
        <div className={cn(inputWrapperVariants({ size: variants?.size }))}>
            {selectedTags.length > 0 && selectedTags.map(tag => (
                <DeletableTag registered key={tag.tagId} tag={tag} onClearTag={() => {
                    onClearTag(tag)
                }} />))}
            {selectedTags.length > 0 && <DeleteAll onClearAll={onClearAll} />
            }
            <div className={cn(inputVariants({ size: variants?.size }))}>
                <TagIcon className='size-4 text-muted-foreground' />
                <input
                    placeholder="Input Tag Name"
                    id={id}
                    autoComplete="off"
                    onChange={(e) => onSearchTag(e.target.value)}
                    value={searchTag}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            if (onEnter) {
                                onEnter();
                            }
                        } else if (e.key === 'Escape') {
                            onEscape();
                        }
                    }}
                    type="text" className={cn(inputInternalVariants({ size: variants?.size }))} />
            </div>
        </div>
    )
}

export default TagInput