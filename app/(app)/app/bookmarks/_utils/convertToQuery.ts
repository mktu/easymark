import { CategoryOperator, TagOperator } from "./parseSearchQuery"

export const convertTagToQuery = (tag: string | string[]) => {
    if (Array.isArray(tag)) {
        return `${tag.map(t => `${TagOperator}:${t}`).join(',')}`
    }
    return `${TagOperator}:${tag}`
}

export const convertCategoryToQuery = (category: string | string[]) => {
    if (Array.isArray(category)) {
        return `${category.map(c => `${CategoryOperator}:${c}`).join(',')}`
    }
    return `${CategoryOperator}:${category}`
}