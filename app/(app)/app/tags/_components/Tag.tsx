'use client'
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { PopoverClose } from "@radix-ui/react-popover"
import { BookIcon, TrashIcon, XCircleIcon } from "lucide-react"
import { FC } from "react"
import { handleDeleteTag } from "../_actions/handleDeleteTag"
import { TagUsageType } from "@/lib/repositories/tag_usage"

type Props = {
    tag: TagUsageType,
}

const Tag: FC<Props> = ({ tag }) => {
    const { name } = tag
    return (
        <div className="flex w-full items-center gap-2 text-muted-foreground">
            <div className="truncate p-2"># {name}</div>
            <div className='ml-auto flex items-center gap-1'>
                <BookIcon className='size-4' />
                <span className='text-sm'>{tag.count}</span>
            </div>
            <Popover>
                <PopoverTrigger>
                    <TrashIcon className="size-5" />
                </PopoverTrigger>
                <PopoverContent align="start">
                    <div>Are you sure you want to delete this Tag?</div>
                    <div className='flex gap-1'>
                        <PopoverClose asChild>
                            <Button type='button' variant='ghost' >Cancel</Button>
                        </PopoverClose>
                        <Button type='button' variant='destructive' onClick={async () => {
                            handleDeleteTag({ tagId: tag.tagId })
                        }}>Delete</Button>
                    </div>
                </PopoverContent>
            </Popover>

        </div>
    )
}

export default Tag