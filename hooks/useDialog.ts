import { useCallback, useState } from "react"

export const useDialog = () => {
    const [open, setOpen] = useState(false);
    const openDialog = useCallback(() => setOpen(true), []);
    const closeDialog = useCallback(() => setOpen(false), []);
    return {
        openDialog,
        closeDialog,
        open
    }
}