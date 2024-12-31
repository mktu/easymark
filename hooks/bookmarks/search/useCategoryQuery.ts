import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { seachCategory } from "@/loader/categories/seachCategory";
import { CategoryType } from "@/lib/repositories/categories";

export const useCategoryQuery = (hasCotegorySegment: boolean, categoryQuery?: string) => {
    const [categories, setCategories] = useState<CategoryType[]>([]);
    const [debouncedSearch] = useDebounce(categoryQuery, 500);
    useEffect(() => {
        if (!hasCotegorySegment) {
            setCategories([])
            return
        }
        const searchInternal = async () => {
            const result = await seachCategory(debouncedSearch || '');
            if ('error' in result) {
                console.error(result.error);
                return;
            }
            setCategories(result);
        }
        searchInternal();
    }, [debouncedSearch, hasCotegorySegment]);
    return {
        categories,
    }
}