'use client'
import SignalContext from "@/contexts/signal/SignalContext"
import { useSignal } from "@/hooks/useSignal"
import { FC, ReactNode } from "react"

type Props = {
    children: ReactNode
}

const Provider: FC<Props> = ({ children }) => {
    const signalValues = useSignal()
    return (
        <SignalContext.Provider value={signalValues}>{children}</SignalContext.Provider>
    )
}

export default Provider