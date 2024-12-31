'use client'
import { FC, useState } from "react"
import { DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { EditIcon, TrashIcon } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { PopoverClose } from "@radix-ui/react-popover"
import { useRouter } from 'next/navigation';
import { CategoryType } from "@/lib/repositories/categories"
import { ColorPallet } from "@/components/domain/ColorPicker/ColorPallet"
import { toast } from "sonner"
import { handleUpdateCategory, HandleUpdateCategoryType } from "@/actions/categories/handleUpdateCategory"
import ErrorIndicator from "../../../_components/ErrorIndicator/ErrorIndicator"


type Props = {
    category: CategoryType,
}

const CategoryDialogContent: FC<Props> = ({ category }) => {
    const [categoryName, setCategoryName] = useState<string>(category.name)
    const [color, setColor] = useState<string | null>(category.color)
    const [colorPalletOpen, setColorPalletOpen] = useState(false)
    const [updateResult, setUpdateResult] = useState<HandleUpdateCategoryType>()
    const router = useRouter();
    return (
        <form className='flex flex-col gap-1' action={async () => {
            const result = await handleUpdateCategory({
                categoryId: category.categoryId,
                name: categoryName,
                color,
                parentId: category.parentId
            })
            setUpdateResult(result)
            if (result.error) {
                return
            }
            // use hard navigation to refresh state
            location.href = `/app/categories`

        }}>
            <label id='category-name'>Name</label>
            <div className='flex w-full items-center gap-4'>
                <Input className='flex-1' id='category-name' value={categoryName} onChange={(e) => {
                    setCategoryName(e.target.value)
                }
                } />
                <div className={'size-12 rounded border'} style={{ backgroundColor: color ? color : 'white' }} />
                <div className='flex flex-col items-start'>
                    <div className='text-sm text-muted-foreground'>{color}</div>
                    <Popover open={colorPalletOpen} onOpenChange={(isOpen) => {
                        setColorPalletOpen(isOpen)
                    }}>
                        <PopoverTrigger asChild>
                            <Button size='sm' className='p-0' variant='link' aria-label='Change Color'>
                                <EditIcon className='mr-2 size-5' />
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
            <ErrorIndicator error={updateResult?.validatedErrors?.name} />
            <DialogFooter className='mt-4 flex items-center gap-2'>
                <Popover>
                    <PopoverTrigger asChild>
                        <Button type='button' variant='destructive' className='mr-auto'>
                            <TrashIcon className='mr-1 size-5' />
                            DELETE
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent>
                        <div>Are you sure you want to delete this categories?</div>
                        <div className='flex gap-1'>
                            <PopoverClose asChild>
                                <Button type='button' variant='ghost' >Cancel</Button>
                            </PopoverClose>
                            <Button type='button' variant='destructive' onClick={async () => {
                                const result = await handleDeleteCategory({ categoryId: category.categoryId })
                                if (result.error) {
                                    toast.error(result.error)
                                } else {
                                    router.push('/app/categories')
                                }
                            }}>Delete</Button>
                        </div>
                    </PopoverContent>
                </Popover>
                <Button variant='outline' onClick={() => {
                    router.back()
                }} type="button">Cancel</Button>
                <Button type='submit'>Update</Button>
            </DialogFooter>
        </form>
    )
}

export default CategoryDialogContent