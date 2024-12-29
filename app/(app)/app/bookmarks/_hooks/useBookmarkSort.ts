import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { getSortOption } from "../../../_logics/bookmarks/parseSortOption";
import { useCallback } from "react";
import { BookmarkSortOption } from "@/lib/types";

export const useBookmarkSort = () => {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const sortOption = getSortOption(searchParams);
    const { replace } = useRouter();

    const onSort = useCallback((sortOption: BookmarkSortOption) => {
        const params = new URLSearchParams(searchParams);
        params.set('sort', sortOption);
        replace(`${pathname}?${params.toString()}`);
    }, [replace, searchParams, pathname]);

    return {
        sortOption,
        onSort
    }
}