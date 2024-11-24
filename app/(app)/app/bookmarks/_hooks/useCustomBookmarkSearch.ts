import { CategoryType } from "@/lib/repositories/categories";
import { TagUsageType } from "@/lib/repositories/tag_usage";
import { parseNumber, parseNumberArray } from "@/lib/urlParser";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useDebounce, useDebouncedCallback } from "use-debounce";

type Props = {
    categories: CategoryType[],
    tags: TagUsageType[]
}

export const useCustomBookmarkSearch = ({
    categories,
    tags
}: Props) => {
    const searchParams = useSearchParams();
    const filter = searchParams.get('filter')?.toString();
    const categoryIds = parseNumber(searchParams, 'category', null);
    const tagNumbers = parseNumberArray(searchParams, 'tags', []);
    const [search, setSearch] = useState<string>('');
    const [debouncedSearch] = useDebounce(search, 500);
    const pathname = usePathname();


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