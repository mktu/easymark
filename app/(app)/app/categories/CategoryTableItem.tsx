'use client'
import { Button } from "@/components/ui/button"
import { TableCell, TableRow } from "@/components/ui/table"
import { CategoryWithBookmarkCountType } from "@/lib/repositories/categories"
import Link from "next/link"
import { handleDeleteCategory } from "./_actions/handleDeleteCategory"
import { toast } from "sonner"
import DeleteWithPopup from "@/components/domain/DeleteWithPopup"

type Props = {
    category: CategoryWithBookmarkCountType
}

const CategoryTableItem = ({ category }: Props) => {
    return (
        <TableRow >
            <TableCell>
                <div className={`size-7 rounded border`} style={{ backgroundColor: category.color ? category.color : 'white' }} />
            </TableCell>
            <TableCell className="flex items-center gap-2">
                <Button variant='link' asChild className="p-0">
                    <Link href={`/app/categories/${category.categoryId}`}>{category.name}</Link>
                </Button>
            </TableCell >
            <TableCell>
                <Button variant='link' className='p-0 text-muted-foreground' asChild>
                    <Link href={`/app/bookmarks?category=${category.name}`}>{category.bookmarkCount} bookmarks</Link>
                </Button>
            </TableCell>
            <TableCell className="text-right">
                <DeleteWithPopup
                    message='Are you sure you want to delete this category?'
                    onDelete={async () => {
                        const result = await handleDeleteCategory({ categoryId: category.categoryId })
                        if (result.error) {
                            toast.error(result.error)
                        }
                    }} />
            </TableCell>
        </TableRow >
    )
}

export default CategoryTableItem