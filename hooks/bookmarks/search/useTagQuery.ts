import { TagUsageType } from "@/lib/repositories/tag_usage";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { callSearchTags } from "@/fetcher/tags/callSearchTags";

export const useTagQuery = (hasTagSegment: boolean, tagQuery?: string) => {
    const [tags, setTags] = useState<TagUsageType[]>([]);
    const [debouncedSearch] = useDebounce(tagQuery, 500);

    useEffect(() => {
        if (!hasTagSegment) {
            setTags([])
            return
        }
        const searchInternal = async () => {
            const result = await callSearchTags(debouncedSearch || '')
            if ('error' in result) {
                console.error(result.error);
                return;
            }
            setTags(result);
        }
        searchInternal();
    }, [debouncedSearch, hasTagSegment]);
    return {
        tags,
    }
}