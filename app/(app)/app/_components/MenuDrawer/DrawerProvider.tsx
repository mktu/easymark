import { createContext, FC, ReactNode, useState } from "react";
import { DrawerContext } from "./context";


type Props = {
    children: ReactNode
}


const DrawerProvider: FC<Props> = ({ children }) => {
    const [open, setOpen] = useState(false)
    return (
        <DrawerContext.Provider value={{ open, setOpen }}>
            {children}
        </DrawerContext.Provider>
    )
}

export default DrawerProvider