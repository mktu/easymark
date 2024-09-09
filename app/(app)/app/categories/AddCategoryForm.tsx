'use client'
import ColorPicker from "@/components/domain/ColorPicker/ColorPicker"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { handleAddCategory } from "./_actions/handleAddCategory"

const AdddCategoryForm = () => {
    const [color, setColor] = useState<string>('##fff')
    const [categoryName, setCategoryName] = useState<string>('')
    const [errors, setErrors] = useState<string | null>(null)
    return (
        <form action={async () => {
            const { error } = await handleAddCategory({
                name: categoryName,
                color,
            })
            if (error) {
                setErrors(error)
            }
        }} className='flex w-full items-center gap-1'>
            <div className="flex items-center rounded border border-input  bg-background pl-3">
                <input className="mr-2 w-[400px] outline-none" aria-label="add-new-category" placeholder='Input category name'
                    value={categoryName} onChange={(e) => {
                        setCategoryName(e.target.value)
                    }} />
                <ColorPicker caption="Color" color={color} onChandeColor={(color) => {
                    setColor(color)
                }} />
            </div>
            <Button type='submit' disabled={!categoryName}>Add</Button>
            {errors && <p className='text-destructive'>{errors}</p>}
        </form>
    )
}

export default AdddCategoryForm