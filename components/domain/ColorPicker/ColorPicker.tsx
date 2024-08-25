'use client'
import { Popover, PopoverContent, PopoverTrigger } from '../../ui/popover'
import { Button } from '../../ui/button'
import { ColorPallet } from './ColorPallet'
import { useState } from 'react'
import { cn } from '@/lib/utils'

type Props = {
    color: string | null,
    onChandeColor: (color: string) => void,
    caption?: string
    size?: 'small' | 'medium' | 'large'
}

const sizes = {
    small: 'size-7',
    medium: 'size-10',
    large: 'size-12'
}

const ColorPicker = ({ color, onChandeColor, caption, size = 'small' }: Props) => {
    const [open, setOpen] = useState(false)
    return (
        <Popover open={open} onOpenChange={(isOpen) => {
            setOpen(isOpen)
        }}>
            <PopoverTrigger asChild>
                <Button variant='ghost' aria-label='Current Color'
                    className='flex items-center justify-center gap-2 rounded bg-white bg-clip-padding p-1 text-muted-foreground'>
                    {caption && <span>{caption}</span>}
                    <div className={cn('rounded border', sizes[size])} style={{ backgroundColor: color ? color : 'white' }} />
                </Button>
            </PopoverTrigger>
            <PopoverContent className='w-auto p-0'>
                <ColorPallet selectColor={(color) => {
                    onChandeColor(color)
                    setOpen(false)
                }} />
            </PopoverContent>
        </Popover>
    )
}

export default ColorPicker