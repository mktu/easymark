'use client'
import { CategoryType } from "@/lib/repositories/categories"
import { useState } from "react"
import { handleUpdateCategory } from "../_actions/handleUpdateCategory"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { EditIcon, TrashIcon } from "lucide-react"
import { ColorPallet } from "@/components/domain/ColorPicker/ColorPallet"
import { Input } from "@/components/ui/input"
import { PopoverClose } from "@radix-ui/react-popover"
import { handleDeleteCategory } from "../_actions/handleDeleteCategory"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

type Props = {
    category: CategoryType
}

const CategoryPage = ({ category }: Props) => {
    const [categoryName, setCategoryName] = useState<string>(category.name)
    const [color, setColor] = useState<string | null>(category.color)
    const [errors, setErrors] = useState<string | null>(null)
    const [colorPalletOpen, setColorPalletOpen] = useState(false)
    const router = useRouter();
    return (
        <form action={async () => {
            const { error } = await handleUpdateCategory({
                categoryId: category.categoryId,
                name: categoryName,
                color,
                parentId: category.parentId
            })
            if (error) {
                setErrors(error)
                return
            }
            setErrors(null)
            toast('Category updated')
        }} className="flex flex-col size-full">
            <div className='px-[150px]'>
                <h2>Category</h2>
                <p>Edit your category information.</p>
            </div>
            <div className="flex flex-col items-start justify-start gap-2 flex-1 px-[150px]">
                <label>Color</label>
                <div className='flex gap-4'>
                    <div className={'rounded border size-12'} style={{ backgroundColor: color ? color : 'white' }} />
                    <div className='flex flex-col items-start'>
                        <div className='text-sm text-muted-foreground'>{color}</div>
                        <Popover open={colorPalletOpen} onOpenChange={(isOpen) => {
                            setColorPalletOpen(isOpen)
                        }}>
                            <PopoverTrigger asChild>
                                <Button className='px-0' variant='link' aria-label='Current Color'>
                                    <EditIcon className='size-5 mr-2' />
                                    Change Color
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className='w-auto p-0'>
                                <ColorPallet selectColor={(color) => {
                                    setColorPalletOpen(false)
                                    setColor(color)
                                }} />
                            </PopoverContent>
                        </Popover>
                    </div>
                </div>
                <label htmlFor="category-name">Category Name</label>
                <Input id='category-name' value={categoryName} onChange={(e) => {
                    setCategoryName(e.target.value)
                }
                } />
                {errors && <p className='text-destructive'>{errors}</p>}
                <section>
                    <h3>Bookmarks</h3>
                </section>
            </div>
            <footer className='mt-auto flex items-center w-full px-[150px] py-3 gap-2 border-t border-input'>
                <Popover>
                    <PopoverTrigger asChild>
                        <Button type='button' variant='destructive' className='mr-auto'>
                            <TrashIcon className='mr-1 size-5' />
                            DELETE</Button>
                    </PopoverTrigger>
                    <PopoverContent>
                        <div>Are you sure you want to delete this categories?</div>
                        <div className='flex gap-1'>
                            <PopoverClose asChild>
                                <Button type='button' variant='ghost' >Cancel</Button>
                            </PopoverClose>
                            <Button type='button' variant='destructive' onClick={async () => {
                                const { error } = await handleDeleteCategory({ categoryId: category.categoryId })
                                if (error) {
                                    console.error(error)
                                    setErrors(error)
                                } else {
                                    router.push('/app/categories')
                                }
                            }}>Delete</Button>
                        </div>
                    </PopoverContent>
                </Popover>
                <Button variant='outline' onClick={() => {
                }} type="button">Cancel</Button>
                <Button type='submit'>Update</Button>
            </footer>
        </form>
    )
}

export default CategoryPage