import { TagType, TagUsageType } from "@/lib/repositories/tags";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDebounce } from "use-debounce";

export const useSearchTagUsage = (
    onSelectTag: (tag: TagUsageType, registered: boolean) => void,
    registeredTags: TagUsageType[]) => {
    const [searchTag, setSearchTag] = useState('');
    const [addTagTarget, setAddTagTarget] = useState<string | null>(null);
    const [tags, setTags] = useState<TagUsageType[]>([]);
    const [debouncedSearch] = useDebounce(searchTag, 500);
    const [error, setError] = useState<string | null>(null);
    const fetchTags = useCallback(async (search: string) => {
        const result = await fetch(`/api/tags?search=${search}&limit=10`);
        const { tags } = await result.json() as { tags: TagUsageType[] };
        return tags;
    }, []);

    useEffect(() => {
        fetchTags(debouncedSearch).then(setTags)
    }, [fetchTags, debouncedSearch]);

    const handleEnter = useCallback(async () => {
        if (searchTag) {
            const fetchedTags = await fetchTags(searchTag)
            const target = fetchedTags.find(tag => tag.name === searchTag)
            if (registeredTags.find(tag => tag.tagId === target?.tagId)) {
                setError(`tag "${target?.name}" is already exists`)
                return
            }
            if (target) {
                onSelectTag(target, true)
                return
            }
            setAddTagTarget(searchTag)
            setSearchTag('')
        }
    }, [searchTag, fetchTags, registeredTags, onSelectTag])

    const handleAddTag = useCallback(async () => {
        if (addTagTarget) {
            const result = await fetch(`/api/tags/new?tag=${addTagTarget}`)
            if (!result.ok) {
                setError('cannot add tag')
                return
            }
            const { tag, error } = await result.json() as { tag?: TagType, error?: string };
            if (error) {
                setError(error)
                return
            }
            if (tag) {
                onSelectTag({
                    tagId: tag.tagId,
                    name: tag.name,
                    count: 0,
                    userId: tag.userId
                }, true)
            }
            setAddTagTarget(null)
        }
    }, [addTagTarget, onSelectTag])
    const handleCancelAddTag = useCallback(() => {
        setAddTagTarget(null)
    }, [])
    const selectableTags = useMemo(() => tags.filter(tag => !registeredTags.find(t => t.name === tag.name)), [tags, registeredTags])

    return {
        searchTag,
        setSearchTag,
        tags,
        addTagTarget,
        error,
        selectableTags,
        handleEnter,
        handleAddTag,
        handleCancelAddTag
    }
}