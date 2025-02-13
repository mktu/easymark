'use client'
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { handleAddTag, HandleAddTagReturnType } from "@/actions/tags/handleAddTag"
import ErrorIndicator from "../../_components/ErrorIndicator/ErrorIndicator"
import { Input } from "@/components/ui/input"

const AdddTagForm = () => {
    const [tagName, setTagName] = useState<string>('')
    const [updateResult, setUpdateResult] = useState<HandleAddTagReturnType>()

    return (
        <form action={async () => {
            const result = await handleAddTag({
                name: tagName
            })
            setUpdateResult(result)
            if (result.success) {
                setTagName('')
            }
        }
        } className='flex w-full flex-col gap-2'>
            <div className='flex w-full items-center gap-2'>
                <Input className="w-full" placeholder="Input tag name" value={tagName} onChange={(e) => {
                    setTagName(e.target.value)
                }} />
                <Button type='submit' disabled={!tagName}>Add</Button>
            </div>
            <ErrorIndicator error={updateResult?.validatedErrors?.name} />
            <ErrorIndicator error={updateResult?.error} />
        </form>
    )
}

export default AdddTagForm