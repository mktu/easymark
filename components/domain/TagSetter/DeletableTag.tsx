'use client'
import { Button } from "@/components/ui/button"
import { TagUsageType } from "@/lib/repositories/tags"
import { cn } from "@/lib/utils"
import { XCircleIcon, XIcon } from "lucide-react"
import { FC } from "react"

type Props = {
    tag: TagUsageType,
    registered: boolean,
    onClearTag: () => void
}

const DeletableTag: FC<Props> = ({ tag, onClearTag, registered }) => {
    const { name } = tag
    return (
        <div className={cn('flex w-fit items-center gap-2 rounded p-2 text-sm shadow', registered ? 'bg-gray-100' :
            'bg-gray-50 border-2 border-dashed')}>
            <div>{name}</div>
            <Button variant='ghost' size='icon' className='size-4' onClick={onClearTag}>
                <XCircleIcon className="size-4" />
            </Button>
        </div>
    )
}

export default DeletableTag