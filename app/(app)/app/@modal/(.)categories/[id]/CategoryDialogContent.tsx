'use client'
import { CategoryType } from "@/lib/repositories/categories"
import { useState } from "react"
import { handleUpdateCategory } from "../../../categories/_actions/handleUpdateCategory"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogTitle } from "@/components/ui/dialog"
import { useRouter } from "next/navigation"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { ColorPallet } from "@/components/domain/ColorPicker/ColorPallet"
import { EditIcon, TrashIcon } from "lucide-react"
import { Input } from "@/components/ui/input"
import { PopoverClose } from "@radix-ui/react-popover"
import { handleDeleteCategory } from "../../../categories/_actions/handleDeleteCategory"
import Link from "next/link"

type Props = {
    category: CategoryType
}

const CategoryDialogContent = ({ category }: Props) => {
    const [categoryName, setCategoryName] = useState<string>(category.name)
    const [color, setColor] = useState<string | null>(category.color)
    const [errors, setErrors] = useState<string | null>(null)
    const [colorPalletOpen, setColorPalletOpen] = useState(false)
    const router = useRouter();
    return (
        <Dialog
            modal
            open
            onOpenChange={(isOpen) => {
                if (!isOpen) {
                    router.back()
                }
            }}
        >
            <DialogContent className='flex h-full flex-col overflow-auto'>
                <DialogTitle>Category</DialogTitle>
                <DialogDescription>Edit your category information.</DialogDescription>
                <form action={async () => {
                    console.log('update')
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
                    router.back()
                }} className="flex flex-col items-start justify-start gap-2 flex-1">
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
                        <Link href={`/app/new-bookmark`}>Add new</Link>
                    </section>
                    <DialogFooter className='mt-auto flex items-center w-full'>
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
                                            router.back()
                                        }
                                    }}>Delete</Button>
                                </div>
                            </PopoverContent>
                        </Popover>
                        <Button onClick={() => {
                            router.back()
                        }} type="button">Cancel</Button>
                        <Button type='submit'>Update</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default CategoryDialogContent