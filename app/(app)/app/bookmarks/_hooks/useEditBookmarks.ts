import { useCallback } from "react";
import { handleUpdateCategory } from "../_actions/handleUpdateCategory";

export const useEditBookmarks = (bookmarks: number[]) => {
    const selectCategory = useCallback(async (category: number) => {
        handleUpdateCategory(bookmarks, category);
    }, [bookmarks]);

    return {
        selectCategory
    }
}