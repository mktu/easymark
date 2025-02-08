'use client'

import { ViewportContext, ViewportType } from "@/contexts/viewport"
import { FC, ReactNode } from "react"

type Props = {
    children: ReactNode,
    viewport: ViewportType
}

const Provider: FC<Props> = ({ children, viewport }) => {
    return (
        <ViewportContext.Provider value={{ viewport }}>{children}</ViewportContext.Provider>
    )
}

export default Provider