import { Button } from "@/components/ui/button"
import { CategoryType } from "@/lib/repositories/categories"
import { TrashIcon } from "lucide-react"
import Link from "next/link"

type Props = {
    category: CategoryType
}

const CategoryListItem = ({ category }: Props) => {
    return (
        <>
            <li className='flex items-center w-full'>
                <div className={`size-7 rounded border`} style={{ backgroundColor: category.color ? category.color : 'white' }} />
                <Button variant='link' className="flex-1 justify-start" asChild>
                    <Link href={`/app/categories/${category.categoryId}`}>{category.name}</Link>
                </Button>
                <Button variant='ghost' size='icon'>
                    <TrashIcon className='size-5' />
                </Button>
            </li>
        </>
    )
}

export default CategoryListItem