import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { TagUsageType } from "@/lib/repositories/tag_usage"
import TagTableItem from "./TagTableItem"

type Props = {
    tags: TagUsageType[]
}

const TagsTable = ({ tags }: Props) => {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead className="whitespace-nowrap">Bookmarks</TableHead>
                    <TableHead className="text-right"></TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {tags.map((tag) => (
                    <TagTableItem key={tag.tagId} tag={tag} />
                ))}
            </TableBody>
        </Table>
    )
}

export default TagsTable