import { useDebouncedCallback } from 'use-debounce';
import { usePathname, useRouter, useSearchParams } from "next/navigation";

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