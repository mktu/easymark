import { TagUsageType } from "@/lib/repositories/tag_usage";
import { parseNumber, parseNumberArray } from "@/lib/urlParser";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export const useBookmarkFilter = () => {
    const searchParams = useSearchParams();
    const pathname = usePathname();

    const category = parseNumber(searchParams, 'category', null);
    const tags = parseNumberArray(searchParams, 'tags', []);
    const hasFilter = category || (tags && tags.length > 0);


    const { replace } = useRouter();

    const removeAllFilters = useCallback(() => {
        const params = new URLSearchParams(searchParams);
        params.delete('category');
        params.delete('tags');
        replace(`${pathname}?${params.toString()}`);
    }, [pathname, replace, searchParams]);

    const onChangeCategory = useCallback((category: number | null) => {
        const params = new URLSearchParams(searchParams);
        if (category === null) {
            params.delete('category');
        } else {
            params.set('category', String(category));
        }
        replace(`${pathname}?${params.toString()}`);
    }, [pathname, replace, searchParams]);

    const onDeleteTag = useCallback((tag: TagUsageType) => {
        const params = new URLSearchParams(searchParams);
        const tags = parseNumberArray(searchParams, 'tags', []) || [];
        params.delete('tags');
        tags.filter(t => t !== tag.tagId).forEach(tag => params.append('tags', tag.toString()))
        replace(`${pathname}?${params.toString()}`);
    }, [searchParams, pathname, replace])

    const onSelectTag = useCallback((tag: TagUsageType) => {
        const params = new URLSearchParams(searchParams);
        const tags = parseNumberArray(searchParams, 'tags', []) || [];
        params.delete('tags');
        [...tags, tag.tagId].forEach(tag => params.append('tags', tag.toString()))
        replace(`${pathname}?${params.toString()}`);
    }, [searchParams, pathname, replace])

    const onClearTags = useCallback(() => {
        const params = new URLSearchParams(searchParams);
        params.delete('tags');
        replace(`${pathname}?${params.toString()}`);
    }, [searchParams, pathname, replace])

    return {
        category,
        onChangeCategory,
        onDeleteTag,
        onSelectTag,
        onClearTags,
        hasFilter,
        removeAllFilters
    }
}