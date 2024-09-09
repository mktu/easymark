'use client'
import { CategoryType } from "@/lib/repositories/categories"
import { useState } from "react"
import { handleUpdateCategory } from "../../_actions/handleUpdateCategory"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { EditIcon, TrashIcon } from "lucide-react"
import { ColorPallet } from "@/components/domain/ColorPicker/ColorPallet"
import { Input } from "@/components/ui/input"
import { PopoverClose } from "@radix-ui/react-popover"
import { handleDeleteCategory } from "../../_actions/handleDeleteCategory"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { BookmarkType } from "@/lib/repositories/bookmarks"
import CategorySection from "./CategorySection"
import Bookmarks from "./Bookmarks"

type Props = {
    category: CategoryType,
    bookmarks: BookmarkType[]
}

const CategoryPage = ({ category, bookmarks }: Props) => {
    return (
        <div className="flex flex-col size-full items-center gap-4">
            <h2 className='text-lg font-semibold'>About "{category.name}" category</h2>
            <CategorySection category={category} />
            <Bookmarks bookmarks={bookmarks} />
        </div>
    )
}

export default CategoryPage