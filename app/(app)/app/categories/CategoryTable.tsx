import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CategoryWithBookmarkCountType } from "@/lib/repositories/categories"
import { FC } from "react"
import CategoryTableItem from "./CategoryTableItem"

type Props = {
    categories: CategoryWithBookmarkCountType[]
}

const CategoryTable: FC<Props> = ({
    categories
}) => {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="md:w-[100px]">Color</TableHead>
                    <TableHead className="md:w-[350px]">Name</TableHead>
                    <TableHead className="whitespace-nowrap">Bookmarks</TableHead>
                    <TableHead className="text-right"></TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {categories.map((category) => (
                    <CategoryTableItem key={category.categoryId} category={category} />
                ))}
            </TableBody>
        </Table>
    )
}

export default CategoryTable