import { ReadonlyURLSearchParams } from "next/navigation"
import { isArray } from "util"

export const parseNumber = (searchParam: { [key: string]: string | string[] | undefined } | URLSearchParams | ReadonlyURLSearchParams, key: string, defaultValue: number | null) => {
    if (searchParam instanceof ReadonlyURLSearchParams || searchParam instanceof URLSearchParams) {
        const value = searchParam.get(key)
        return value ? parseInt(value) : defaultValue
    }
    const value = searchParam[key]
    return value ? parseInt(value as string) : defaultValue
}

export const parseArray = (searchParam: { [key: string]: string | string[] | undefined } | URLSearchParams | ReadonlyURLSearchParams, key: string, defaultValue: string[] | null) => {
    if (searchParam instanceof ReadonlyURLSearchParams || searchParam instanceof URLSearchParams) {
        const value = searchParam.getAll(key)
        return value.length > 0 ? value : defaultValue
    }
    const value = searchParam[key]
    if (Array.isArray(value)) {
        return value
    }
    return value ? [value] : defaultValue
}

export const parseNumberArray = (searchParam: { [key: string]: string | string[] | undefined } | URLSearchParams | ReadonlyURLSearchParams, key: string, defaultValue: number[] | null) => {
    const strArray = parseArray(searchParam, key, []);
    if (strArray === null || strArray.length === 0) return defaultValue;
    if (Array.isArray(strArray)) {
        return strArray.map(str => parseInt(str));
    }
    return [parseInt(strArray)];
}