import { useCallback, useState } from "react"



export type UploadBookmarkType = {
    title: string | null
    url: string
}

export const useUpload = () => {
    const [bookmarks, setBookmarks] = useState<UploadBookmarkType[]>([])
    const [error, setError] = useState<string | null>(null)

    const onChangeFile = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;
        const file = e.target.files[0];
        if (!file) return;

        try {
            const content = await file.text();

            // HTMLを解析
            const parser = new DOMParser();
            const doc = parser.parseFromString(content, 'text/html');
            const links = doc.querySelectorAll('a');
            const parsedBookmarks = Array.from(links).map((link) => ({
                title: link.textContent,
                url: link.href,
            }));

            setBookmarks(parsedBookmarks);
        } catch (err) {
            setError('Failed to parse the file. Please make sure it is a valid HTML bookmark file.');
        }
    }, [])
    return { onChangeFile, bookmarks, error }
}