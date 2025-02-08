import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { PopoverClose } from "@radix-ui/react-popover"
import { TrashIcon } from "lucide-react"
import { FC, ReactNode } from "react"

type Props = {
    onDelete: () => Promise<void>,
    message: string | ReactNode
}

const DeleteWithPopup: FC<Props> = ({
    onDelete,
    message
}) => {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button size='icon' variant='destructive'>
                    <TrashIcon size={16} />
                </Button>
            </PopoverTrigger>
            <PopoverContent>
                <div className="text-sm">{message}</div>
                <div className='mt-2 flex justify-end gap-1 text-sm'>
                    <PopoverClose asChild>
                        <Button type='button' variant='ghost' >Cancel</Button>
                    </PopoverClose>
                    <Button type='button' variant='destructive' onClick={onDelete}>Delete</Button>
                </div>
            </PopoverContent>
        </Popover>
    )
}

export default DeleteWithPopup