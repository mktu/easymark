import { searchTags } from "@/loader/tags/searchTags";
import { handleAddTag } from "@/actions/tags/handleAddTag";
import { TagUsageType } from "@/lib/repositories/tag_usage";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDebounce } from "use-debounce";

export const useSearchTagUsage = (
    onSelectTag: (tag: TagUsageType, registered: boolean) => void,
    registeredTags: TagUsageType[]) => {
    const [loading, setLoading] = useState(true)
    const [searchTag, setSearchTag] = useState('');
    const [addTagTarget, setAddTagTarget] = useState<string | null>(null);
    const [tags, setTags] = useState<TagUsageType[]>([]);
    const [debouncedSearch] = useDebounce(searchTag, 500);
    const [error, setError] = useState<string | null>(null);
    const fetchTags = useCallback(async (search: string) => {
        const result = await searchTags(search)
        if ('error' in result) {
            setError(result.error)
            return []
        }
        return result;
    }, []);

    useEffect(() => {
        if (!debouncedSearch) {
            setTags([])
            return
        }
        fetchTags(debouncedSearch).then(tags => {
            setTags(tags)
            setLoading(false)
        })
    }, [fetchTags, debouncedSearch]);

    const onAddTag = useCallback(async (tagName: string) => {
        if (!tagName) {
            return
        }
        const result = await handleAddTag({ name: tagName })
        if (result.error) {
            setError(result.error)
            return
        }
        const { tag } = result
        if (tag) {
            onSelectTag({
                tagId: tag.tagId,
                name: tag.name,
                count: 0,
                userId: tag.userId
            }, true)
        }
    }, [onSelectTag])

    const handleCancelAddTag = useCallback(() => {
        setAddTagTarget(null)
    }, [])
    const selectableTags = useMemo(() => tags.filter(tag => !registeredTags.find(t => t.name === tag.name)), [tags, registeredTags])
    const onChange = useCallback((text: string) => {
        setSearchTag(text)
        setLoading(true)
    }, [])
    return {
        searchTag,
        setSearchTag,
        tags,
        addTagTarget,
        error,
        selectableTags,
        onAddTag,
        handleCancelAddTag,
        loading,
        onChange
    }
}