'use client'

import { useCallback, useState } from "react"
import useSplit from "./useSplit"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

type Props = {
    sidebar: React.ReactNode,
    content: React.ReactNode,
    header: React.ReactNode
}

const MinWidth = 150
const MaxWidth = 300
const WidthClosed = 50

const SidebarLayout: React.FC<Props> = ({ sidebar, content, header }) => {

    // const [width, setWidth] = useState(MinWidth)
    // const onDragEnd = useCallback((lastWidth: number) => {
    //     setWidth(lastWidth);
    // }, [])
    // const hideSidebar = width === WidthClosed
    // const { setGutter, setRoot, moving } = useSplit({ onDragEnd, minWidth: MinWidth, maxWidth: MaxWidth })

    return (
        <div className="relative flex h-screen w-screen">
            <div className={cn('h-full overflow-y-auto hidden md:block')} >
                {sidebar}
            </div>
            <div className="flex size-full flex-1 flex-col overflow-hidden bg-slate-50">
                {header}
                <div className="mx-auto mt-2 size-full max-w-screen-lg flex-1 overflow-auto bg-white shadow md:px-4">
                    {content}
                </div>
            </div>
        </div >
    )
}

export default SidebarLayout;