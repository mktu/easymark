import { createContext, useContext } from "react"

type ContextType = {
    open: boolean,
    setOpen: (open: boolean) => void
}

export const DrawerContext = createContext<ContextType>({
    open: false,
    setOpen: () => { }
})

export const useDrawerContext = () => useContext(DrawerContext)