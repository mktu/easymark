import { BookmarkSortOption } from "@/lib/types";
import { useDebouncedCallback } from 'use-debounce';
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { getSortOption } from "../_utils/parseSortOption";

export const useBookmarkInput = () => {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const filter = searchParams.get('filter')?.toString();
    const sortOption = getSortOption(searchParams);
    const { replace } = useRouter();

    const onFilter = useDebouncedCallback(async (filter: string) => {
        const params = new URLSearchParams(searchParams);
        if (filter) {
            params.set('filter', filter);
        } else {
            params.delete('filter');
        }
        replace(`${pathname}?${params.toString()}`);
    }, 300);

    const onSort = useCallback((sortOption: BookmarkSortOption) => {
        const params = new URLSearchParams(searchParams);
        params.set('sort', sortOption);
        replace(`${pathname}?${params.toString()}`);
    }, [replace, searchParams, pathname]);

    return {
        sortOption,
        onSort,
        onFilter,
        filter
    }
}