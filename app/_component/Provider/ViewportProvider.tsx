'use client'

import { ViewportContext, ViewportType } from "@/contexts/viewport"

type Props = {
    children: React.ReactNode,
    viewport: ViewportType
}

const Provider: React.FC<Props> = ({ children, viewport }) => {
    return (
        <ViewportContext.Provider value={{ viewport }}>{children}</ViewportContext.Provider>
    )
}

export default Provider