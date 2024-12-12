'use client'
import { createContext, useContext } from "react";

export type ViewportType = 'mobile' | 'desktop'

type ContextType = {
    viewport: ViewportType
}

export const ViewportContext = createContext<ContextType>({
    viewport: 'desktop'
})

export default ViewportContext

export const useViewportContext = () =>
    useContext(ViewportContext)