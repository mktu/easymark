import { TagUsageType } from "@/lib/repositories/tags";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

export const useSearchTagUsage = () => {
    const [searchTag, setSearchTag] = useState('');
    const [tags, setTags] = useState<TagUsageType[]>([]);
    const [debouncedSearch] = useDebounce(searchTag, 500);
    useEffect(() => {
        // fetch tags from server
        const fetchTags = async () => {
            const result = await fetch(`/api/tags?search=${debouncedSearch}&limit=10`);
            const { tags } = await result.json() as { tags: TagUsageType[] };
            setTags(tags);
        }
        fetchTags();
    }, [debouncedSearch]);
    return {
        searchTag,
        setSearchTag,
        tags,
    }
}