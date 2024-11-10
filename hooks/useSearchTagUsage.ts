import { TagUsageType } from "@/lib/repositories/tag_usage";
import { TagType } from "@/lib/repositories/tags";
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
        const result = await fetch(`/api/tag_usage?search=${search}&limit=10`);
        const { tags } = await result.json() as { tags: TagUsageType[] };
        return tags;
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

    const handleAddTag2 = useCallback(async (tagName: string) => {
        if (!tagName) {
            return
        }
        const result = await fetch(`/api/tags/new?tag=${tagName}`)
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
    }, [])

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
        handleEnter,
        handleAddTag,
        handleAddTag2,
        handleCancelAddTag,
        loading,
        onChange
    }
}