import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { PopoverClose } from "@radix-ui/react-popover"
import { TrashIcon } from "lucide-react"
import { FC } from "react"

type Props = {
    onDelete: () => Promise<void>,
}

const Delete: FC<Props> = ({
    onDelete
}) => {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button type='button' variant='ghost' className='flex items-center whitespace-normal text-sm text-destructive'>
                    <TrashIcon className='mr-1 size-5' />
                    DELETE
                </Button>
            </PopoverTrigger>
            <PopoverContent>
                <div>Are you sure you want to delete this bookmark?</div>
                <div className='flex gap-1'>
                    <PopoverClose asChild>
                        <Button type='button' variant='ghost' >Cancel</Button>
                    </PopoverClose>
                    <Button type='button' variant='destructive' onClick={onDelete}>Delete</Button>
                </div>
            </PopoverContent>
        </Popover>
    )
}

export default Delete