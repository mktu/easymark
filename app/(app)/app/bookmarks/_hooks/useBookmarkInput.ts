import { useDebounce, useDebouncedCallback } from 'use-debounce';
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { appendQuerySegment, CategoryOperator, extractCategoryQuery, extractLastQuerySegment, extractTagQuery, FreeWordOperator, parseSearchQuery, replaceLastQuerySegment, TagOperator } from '../_utils/parseSearchQuery';
import { useTagQuery } from './useTagQuery';
import { useCategoryQuery } from './useCategoryQuery';
import { useCallback, useEffect, useMemo, useState } from 'react';

export const useBookmarkInput = () => {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const filter = searchParams.get('filter')?.toString();

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


    return {
        onFilter,
        filter,
    }
}

export const useBookmarkQuery = (query: string) => {
    const [input, setInput] = useState(query)
    const [urlUpdatable, setUrlUpdatable] = useState(false)
    const [isSuggesting, setIsSuggesting] = useState(false)
    const [debouncedInput] = useDebounce(input, 500);
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
    const parsedQuery = parseSearchQuery(debouncedInput);
    const tags = extractTagQuery(parsedQuery);
    const categories = extractCategoryQuery(parsedQuery);
    const lastQuery = useMemo(() => extractLastQuerySegment(input), [input]);
    const { tags: selectableTags } = useTagQuery(lastQuery?.type === TagOperator, lastQuery?.value);
    const { categories: selectableCategories } = useCategoryQuery(lastQuery?.type === CategoryOperator, lastQuery?.value);

    useEffect(() => {
        if (!urlUpdatable) {
            return;
        }
        const params = new URLSearchParams(searchParams);
        if (debouncedInput) {
            params.set('query', debouncedInput);
        } else {
            params.delete('query');
        }
        replace(`${pathname}?${params.toString()}`);
    }, [debouncedInput, urlUpdatable]);

    const onUpdate = useCallback((text: string) => {
        setInput(text)
        const lq = extractLastQuerySegment(text)
        const isSuggesting = lq?.type === TagOperator || lq?.type === CategoryOperator
        setIsSuggesting(isSuggesting)
        setUrlUpdatable(!isSuggesting)
    }, []);

    const onSelectSuggestion = useCallback(async (type: typeof TagOperator | typeof CategoryOperator, value: string) => {
        setInput(last => replaceLastQuerySegment(last, { type, value }));
        setIsSuggesting(false)
        setUrlUpdatable(true)
    }, []);

    const onAddCommand = useCallback((command: string) => {
        setInput(last => appendQuerySegment(last, { type: command, value: '' }))
        setIsSuggesting(true)
        setUrlUpdatable(false)
    }, [input]);


    return {
        onUpdate,
        tags,
        selectableTags,
        categories,
        selectableCategories,
        onSelectSuggestion,
        onAddCommand,
        input,
        isSuggesting
    }
}