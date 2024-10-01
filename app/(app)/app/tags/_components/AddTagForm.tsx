'use client'
import ColorPicker from "@/components/domain/ColorPicker/ColorPicker"
import { InputWithIcon } from "@/components/domain/InputWithIcon"
import { Button } from "@/components/ui/button"
import { TagIcon } from "lucide-react"
import { useState } from "react"
import { handleAddTag } from "../_actions/handleAddTag"

const AdddTagForm = () => {
    const [tagName, setTagName] = useState<string>('')
    const [errors, setErrors] = useState<string | null>(null)
    return (
        <form action={async () => {
            const { error } = await handleAddTag({
                name: tagName
            })
            if (error) {
                setErrors(error)
            } else {
                setErrors(null)
                setTagName('')
            }
        }
        } className='flex flex-col gap-2'>
            <div className='flex w-full items-center gap-1'>
                <InputWithIcon value={tagName} onChange={(e) => {
                    setTagName(e.target.value)
                }} leftIcon={<TagIcon className='size-5' />} />
                <Button type='submit' disabled={!tagName}>Add</Button>
            </div>
            {errors && <p className='text-destructive'>{errors}</p>}
        </form>
    )
}

export default AdddTagForm