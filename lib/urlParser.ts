import { ReadonlyURLSearchParams } from "next/navigation"

export const parseNumber = (searchParam: { [key: string]: string | string[] | undefined } | URLSearchParams | ReadonlyURLSearchParams, key: string, defaultValue: number | null) => {
    if (searchParam instanceof ReadonlyURLSearchParams || searchParam instanceof URLSearchParams) {
        const value = searchParam.get(key)
        return value ? parseInt(value) : defaultValue
    }
    const value = searchParam[key]
    return value ? parseInt(value as string) : defaultValue
}