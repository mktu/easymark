import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "../supabase/schema";

const convertCategories = (categories: Database['public']['Tables']['categories']['Row'][]) => {
    return categories.map(category => {
        return {
            categoryId: category.id!,
            userId: category.user_id!,
            name: category.name!,
            createdAt: category.created_at!,
            parentId: category.parent_id,
        }
    })
}

export const fetchCategories = async (supabase: SupabaseClient<Database>, userId: string) => {
    const { data, error } = await supabase.from('categories').select('*').eq('user_id', userId).order('created_at', { ascending: false })
    if (error) {
        console.error(error)
        throw Error('cannot fetch categories')
    }
    return convertCategories(data)
}

export type CategoryType = ReturnType<typeof convertCategories>[0]