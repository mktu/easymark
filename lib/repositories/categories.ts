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
            color: category.color
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

export const fetchCategory = async (supabase: SupabaseClient<Database>, userId: string, categoryId: number) => {
    const { data, error } = await supabase.from('categories').select('*').eq('user_id', userId).eq('id', categoryId).limit(1)
    if (error) {
        console.error(error)
        throw Error('cannot fetch category')
    }
    return convertCategories(data)[0]
}

export const addCategory = async (supabase: SupabaseClient<Database>, {
    userId,
    name,
    parentId,
    color
}: {
    userId: string,
    name: string,
    parentId?: number,
    color?: string
}) => {
    const { error } = await supabase.from('categories').insert({ user_id: userId, name, parent_id: parentId, color })
    if (error) {
        console.error(error)
        return { error: 'cannnot add category' }
    }
    return { error: null }
}

export const updateCategory = async (supabase: SupabaseClient<Database>, {
    userId,
    categoryId,
    name,
    parentId,
    color
}: {
    userId: string,
    categoryId: number,
    name: string,
    parentId?: number | null,
    color?: string | null
}) => {
    const { error } = await supabase.from('categories').update({ name, parent_id: parentId, color }).eq('id', categoryId).eq('user_id', userId)
    if (error) {
        console.error(error)
        return { error: 'cannnot update category' }
    }
    return { error: null }
}

export const deleteCategory = async (supabase: SupabaseClient<Database>, {
    userId,
    categoryId
}: {
    userId: string,
    categoryId: number
}) => {
    const { error } = await supabase.from('categories').delete().eq('id', categoryId).eq('user_id', userId)
    if (error) {
        console.error(error)
        return { error: 'cannnot delete category' }
    }
    return { error: null }
}

export type CategoryType = ReturnType<typeof convertCategories>[0]