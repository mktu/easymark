import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "../supabase/schema";

const convertCategory = (category: Database['public']['Tables']['categories']['Row']) => {
    return {
        categoryId: category.id!,
        userId: category.user_id!,
        name: category.name!,
        createdAt: category.created_at!,
        parentId: category.parent_id,
        color: category.color
    }
}

const convertCategories = (categories: Database['public']['Tables']['categories']['Row'][]) => {
    return categories.map(convertCategory)
}

const convertCategoriesWithBookmarkCount = (categories: Database['public']['Views']['categories_with_bookmark_count']['Row'][]) => {
    return categories.map(category => {
        return {
            categoryId: category.id!,
            userId: category.user_id!,
            name: category.name!,
            createdAt: category.created_at!,
            parentId: category.parent_id,
            color: category.color,
            bookmarkCount: category.bookmark_count
        }
    })
}

export const getCategories = async (supabase: SupabaseClient<Database>, userId: string, limit = 100) => {
    const { data, error } = await supabase.from('categories').select('*').eq('user_id', userId).order('created_at', { ascending: false }).limit(limit)
    if (error) {
        console.error(error)
        throw Error('cannot fetch categories')
    }
    return convertCategories(data)
}

export const getCategory = async (supabase: SupabaseClient<Database>, userId: string, categoryId: number) => {
    const { data, error } = await supabase.from('categories').select('*').eq('user_id', userId).eq('id', categoryId).limit(1)
    if (error) {
        console.error(error)
        throw Error('cannot fetch category')
    }
    return convertCategories(data)[0]
}

export const getCategoryByName = async (supabase: SupabaseClient<Database>, userId: string, name: string) => {
    const { data, error } = await supabase.from('categories').select('*').eq('user_id', userId).eq('name', name).limit(1)
    if (error) {
        console.error(error)
        throw Error('cannot fetch category')
    }
    return convertCategories(data)[0]
}

export const getCategoriesWithBookmarkCount = async (supabase: SupabaseClient<Database>, userId: string) => {
    const { data: categories, error: categoriesError } = await supabase.from('categories_with_bookmark_count').select('*').eq('user_id', userId).order('created_at', { ascending: false })
    if (categoriesError) {
        console.error(categoriesError)
        throw Error('cannot fetch categories')
    }
    return convertCategoriesWithBookmarkCount(categories)
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
    const { error, data } = await supabase.from('categories').insert({ user_id: userId, name, parent_id: parentId, color }).select('*').single()
    if (error) {
        console.error(error)
        return { error: 'cannnot add category' }
    }
    return { categoryId: convertCategory(data).categoryId, success: true }
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

export const searchCategories = async (supabase: SupabaseClient<Database>, { userId, name, limit }: { userId: string, name: string, limit: number }) => {
    const { data: categories, error } = await supabase.from('categories').select('*').eq('user_id', userId).ilike('name', `%${name}%`).limit(limit)
    if (error) {
        console.error(error)
        return { error: 'cannot fetch categories' }
    }
    return convertCategories(categories)
}

export type CategoryType = ReturnType<typeof convertCategories>[0]
export type CategoryWithBookmarkCountType = ReturnType<typeof convertCategoriesWithBookmarkCount>[0]