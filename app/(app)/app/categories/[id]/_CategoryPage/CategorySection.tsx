import { ColorPallet } from "@/components/domain/ColorPicker/ColorPallet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CategoryType } from "@/lib/repositories/categories";
import { EditIcon, TrashIcon } from "lucide-react";
import { FC, useState } from "react";
import { handleUpdateCategory } from "@/actions/categories/handleUpdateCategory";
import { toast } from "sonner";
import { PopoverClose } from "@radix-ui/react-popover";
import router from "next/router";
import { handleDeleteCategory } from "@/actions/categories/handleDeleteCategory";

type CategorySectionProps = {
    category: CategoryType,
}

const CategorySection: FC<CategorySectionProps> = ({
    category
}) => {
    const [categoryName, setCategoryName] = useState<string>(category.name)
    const [color, setColor] = useState<string | null>(category.color)
    const [errors, setErrors] = useState<string | null>(null)
    const [colorPalletOpen, setColorPalletOpen] = useState(false)
    return (
        <section className="flex w-full max-w-[700px] flex-col items-start justify-start gap-2">
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
            }} className='flex w-full flex-col gap-3 rounded border border-input p-3'>
                <h3 className='font-semibold'>⚙️ Category Settings ⚙️</h3>
                <p>カテゴリは、ブックマークを分類する時に役立ちます。カテゴリ名とカテゴリカラーを設定し、ブックマークの効率性をあげましょう！</p>
                <div className='flex w-full items-center gap-4'>
                    <Input className='flex-1' aria-label="category-name" id='category-name' value={categoryName} onChange={(e) => {
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

                {errors && <p className='text-destructive'>{errors}</p>}
                <div className='flex items-center gap-2'>
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
                </div>

            </form>
        </section>
    );
}

export default CategorySection;