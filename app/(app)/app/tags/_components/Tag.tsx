'use client'
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { TagType } from "@/lib/repositories/tags"
import { PopoverClose } from "@radix-ui/react-popover"
import { XIcon } from "lucide-react"
import { FC } from "react"
import { handleDeleteTag } from "../_actions/handleDeleteTag"

type Props = {
    tag: TagType,
}

const Tag: FC<Props> = ({ tag }) => {
    const { name } = tag
    return (
        <div className="flex w-fit items-center gap-2 rounded bg-gray-100 p-2">
            <div>{name}</div>
            <Popover>
                <PopoverTrigger>
                    <XIcon className="size-4" />
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