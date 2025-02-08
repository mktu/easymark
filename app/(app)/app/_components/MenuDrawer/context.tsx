import { createContext, useContext } from "react"

type ContextType = {
    open: boolean,
    setOpen: (_: boolean) => void
}

export const DrawerContext = createContext<ContextType>({
    open: false,
    setOpen: () => { }
})

export const useDrawerContext = () => useContext(DrawerContext)