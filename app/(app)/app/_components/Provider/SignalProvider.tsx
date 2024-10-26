'use client'
import SignalContext from "@/contexts/signal/SignalContext"
import { useSignal } from "@/hooks/useSignal"

type Props = {
    children: React.ReactNode
}

const Provider: React.FC<Props> = ({ children }) => {
    const signalValues = useSignal()
    return (
        <SignalContext.Provider value={signalValues}>{children}</SignalContext.Provider>
    )
}

export default Provider