import { TagUsageType } from "@/lib/repositories/tag_usage"
import { parseNumberArray } from "@/lib/urlParser";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react"

type TagLike = {
    tagId: number
}

export const useTags = () => {
    const { replace } = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();

    const onDeleteTag = useCallback((tag: TagLike) => {
        const params = new URLSearchParams(searchParams);
        const tags = parseNumberArray(searchParams, 'tags', []) || [];
        params.delete('tags');
        tags.filter(t => t !== tag.tagId).forEach(tag => params.append('tags', tag.toString()))
        replace(`${pathname}?${params.toString()}`);
    }, [searchParams, pathname, replace])

    const onSelectTag = useCallback((tag: TagLike) => {
        const params = new URLSearchParams(searchParams);
        const tags = parseNumberArray(searchParams, 'tags', []) || [];
        if (tags.includes(tag.tagId)) return;
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
        onDeleteTag,
        onSelectTag,
        onClearTags
    }
}