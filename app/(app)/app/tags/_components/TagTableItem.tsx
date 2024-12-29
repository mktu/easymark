import DeleteWithPopup from "@/components/domain/DeleteWithPopup"
import { TableCell, TableRow } from "@/components/ui/table"
import { TagUsageType } from "@/lib/repositories/tag_usage"
import { handleDeleteTag } from "../_actions/handleDeleteTag"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import Link from "next/link"

type Props = {
    tag: TagUsageType
}

const TagTableItem = ({ tag }: Props) => {
    return (
        <TableRow >
            <TableCell>{tag.name}</TableCell>
            <TableCell>
                <Button variant='link' className='p-0 text-muted-foreground' asChild>
                    <Link href={`/app/bookmarks?tag=${tag.name}`}>{tag.count} Bookmarks</Link>
                </Button>
            </TableCell>
            <TableCell className="text-right">
                <DeleteWithPopup
                    message='Are you sure you want to delete this tag?'
                    onDelete={async () => {
                        const result = await handleDeleteTag({ tagId: tag.tagId })
                        if (result.error) {
                            toast.error(result.error)
                        }
                    }} />
            </TableCell>
        </TableRow >
    )
}

export default TagTableItem