import { useCallback, useState } from "react";

export const useSignal = () => {
    const [fetchBookmarkSignal, setBookmarkFetchSignal] = useState<number[]>([]);
    const [bookmarkTagSignal, setBookmarkTagSignal] = useState(false);
    const [bookmarkReloadSignal, setBookmarkReloadSignal] = useState(false);
    const fireBookmarkFetchSignal = useCallback((bookmarkIds: number[]) => {
        setBookmarkFetchSignal(bookmarkIds)
    }, [])
    const fireBookmarkTagSignal = useCallback((signal: boolean) => {
        setBookmarkTagSignal(signal)
    }, [])
    const fireBookmarkReloadSignal = useCallback((signal: boolean) => {
        setBookmarkReloadSignal(signal)
    }, [])
    return {
        fetchBookmarkSignal,
        fireBookmarkFetchSignal,
        bookmarkTagSignal,
        fireBookmarkTagSignal,
        bookmarkReloadSignal,
        fireBookmarkReloadSignal
    }
}