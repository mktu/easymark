import { BookmarkSortOption } from "@/lib/types";
import { useDebouncedCallback } from 'use-debounce';
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { getSortOption } from "../_utils/parseSortOption";
import { parseNumber } from "@/lib/urlParser";

export const useBookmarkInput = () => {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const filter = searchParams.get('filter')?.toString();

    const category = parseNumber(searchParams, 'category', null);
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

    const onChangeCategory = useCallback((category: number | null) => {
        const params = new URLSearchParams(searchParams);
        if (category === null) {
            params.delete('category');
        } else {
            params.set('category', String(category));
        }
        replace(`${pathname}?${params.toString()}`);
    }, []);

    return {
        sortOption,
        onSort,
        onFilter,
        filter,
        category,
        onChangeCategory
    }
}