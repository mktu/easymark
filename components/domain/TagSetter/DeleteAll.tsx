'use client'
import { Button } from "@/components/ui/button"
import { FC } from "react"

type Props = {
    onClearAll: () => void
}

const DeleteAll: FC<Props> = ({ onClearAll }) => {
    return (
        <Button variant='outline' onClick={onClearAll}>
            Clear All
        </Button>
    )
}

export default DeleteAll