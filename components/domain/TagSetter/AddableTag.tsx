'use client'
import { Button } from "@/components/ui/button"
import { TagUsageType } from "@/lib/repositories/tags"
import { PlusCircle, PlusIcon } from "lucide-react"
import { FC } from "react"

type Props = {
    tag: TagUsageType,
    onAddTag: () => void
}

const AddableTag: FC<Props> = ({ tag, onAddTag }) => {
    const { name } = tag
    return (
        <div className="flex w-fit items-center gap-2 rounded bg-gray-50 p-2 shadow">
            <div className='text-sm'>{name}</div>
            <Button type='button' variant='ghost' size='icon' className='size-5' onClick={onAddTag}>
                <PlusCircle className="size-5" />
            </Button>
        </div>
    )
}

export default AddableTag