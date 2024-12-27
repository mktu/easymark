import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { PopoverClose } from "@radix-ui/react-popover"
import { TrashIcon } from "lucide-react"

type Props = {
    onDelete: () => Promise<void>,
}

const Delete: React.FC<Props> = ({
    onDelete
}) => {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button size='icon' variant='destructive'>
                    <TrashIcon size={16} />
                </Button>
            </PopoverTrigger>
            <PopoverContent>
                <div className="text-sm">Are you sure you want to delete this api key?</div>
                <div className='flex gap-1 text-sm mt-2 justify-end'>
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