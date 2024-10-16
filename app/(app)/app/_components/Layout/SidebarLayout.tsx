'use client'

import { useCallback, useState } from "react"
import useSplit from "./useSplit"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, CircleChevronLeft, CircleChevronRight } from "lucide-react"

type Props = {
    sidebar: React.ReactNode,
    content: React.ReactNode,
    header: React.ReactNode
}

const MinWidth = 150
const MaxWidth = 300
const WidthClosed = 50

const SidebarLayout: React.FC<Props> = ({ sidebar, content, header }) => {

    const [width, setWidth] = useState(MinWidth)
    const onDragEnd = useCallback((lastWidth: number) => {
        setWidth(lastWidth);
    }, [])
    const hideSidebar = width === WidthClosed
    const { setGutter, setRoot, moving } = useSplit({ onDragEnd, minWidth: MinWidth, maxWidth: MaxWidth })

    return (
        <div ref={setRoot} className="relative flex h-screen w-screen">
            <div className={cn('h-full overflow-y-auto', !moving && 'transition-all ease-in-out')} style={{ width }}>
                {!hideSidebar && sidebar}
            </div>
            <div className={`relative hidden min-h-screen w-0.5 cursor-move bg-input transition-all ease-in-out hover:bg-gray-200 md:block`}
                ref={setGutter} >
                <Button
                    onClick={(e) => {
                        e.stopPropagation()
                        if (hideSidebar) {
                            setWidth(100)
                        } else {
                            setWidth(WidthClosed)
                        }
                    }}
                    className='absolute right-0 top-2 z-10 p-1'
                    variant='ghost'
                    size='icon'
                >
                    {hideSidebar ? <ChevronRight name="open-sidebar" className='size-5 stroke-muted-foreground' /> :
                        <ChevronLeft name="close-sidebar" className='size-5 stroke-muted-foreground' />
                    }
                </Button>
            </div>
            <div className="size-full flex-1 overflow-hidden bg-slate-50">
                {header}
                <div className="mx-auto mt-2 flex size-full max-w-screen-lg flex-1 flex-col overflow-auto  bg-white px-4 shadow">
                    {content}
                </div>
            </div>
        </div>
    )
}

export default SidebarLayout;