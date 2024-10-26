'use client'
import { useSignal } from "@/hooks/useSignal";
import { createContext, useContext } from "react";

type ContextType = ReturnType<typeof useSignal>

export const SignalContext = createContext<ContextType>({
    fetchBookmarkSignal: [],
    fireBookmarkFetchSignal: () => { },
    bookmarkTagSignal: false,
    fireBookmarkTagSignal: () => { },
    bookmarkReloadSignal: false,
    fireBookmarkReloadSignal: () => { }
})

export default SignalContext

export const useSignalContext = () =>
    useContext(SignalContext)