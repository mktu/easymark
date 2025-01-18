import { useEffect, useState } from "react";
import { UploadBookmarkType } from "./useUpload";

export type ImportBookmarkType = UploadBookmarkType & {
    checked: boolean
}

export const useImport = (initialBookmarks: UploadBookmarkType[]) => {
    const [bookmarks, setBookmarks] = useState<ImportBookmarkType[]>([]);
    useEffect(() => {
        setBookmarks(initialBookmarks.map((b) => ({ ...b, checked: true })));
    }, [initialBookmarks]);

    const onCheckBookmark = (bookmark: ImportBookmarkType, checked: boolean) => {
        setBookmarks((prev) => prev.map((b) => {
            if (b === bookmark) {
                return { ...b, checked };
            }
            return b;
        }));
    }

    return { bookmarks, onCheckBookmark };
}