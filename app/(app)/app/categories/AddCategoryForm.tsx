'use client'
import ColorPicker from "@/components/domain/ColorPicker/ColorPicker"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { handleAddCategory, HandleAddCategoryResultType } from "./_actions/handleAddCategory"
import ErrorIndicator from "../_components/ErrorIndicator/ErrorIndicator"

const AdddCategoryForm = () => {
    const [color, setColor] = useState<string>('#fff')
    const [categoryName, setCategoryName] = useState<string>('')
    const [addCategoryResult, setAddCategoryResult] = useState<HandleAddCategoryResultType>()
    return (
        <div className="flex flex-col gap-2">
            <form action={async () => {
                const result = await handleAddCategory({
                    name: categoryName,
                    color,
                })
                setAddCategoryResult(result)
                if (result.success) {
                    setColor('#fff')
                    setCategoryName('')
                }
            }} className='flex w-full items-center gap-1'>
                <div className="flex items-center rounded border border-input  bg-background pl-3">
                    <input className="mr-2 w-full outline-none md:w-[400px]" aria-label="add-new-category" placeholder='Input category name'
                        value={categoryName} onChange={(e) => {
                            setCategoryName(e.target.value)
                        }} />
                    <ColorPicker caption="Color" color={color} onChandeColor={(color) => {
                        setColor(color)
                    }} />
                </div>
                <Button type='submit' disabled={!categoryName}>Add</Button>
            </form>
            <ErrorIndicator error={addCategoryResult?.error || addCategoryResult?.validatedErrors?.name} />
        </div>
    )
}

export default AdddCategoryForm