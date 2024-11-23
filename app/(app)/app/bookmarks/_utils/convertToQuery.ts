export const convertTagToQuery = (tag: string | string[]) => {
    if (Array.isArray(tag)) {
        return `${tag.map(t => `tag:${t}`).join(',')}`
    }
    return `tag:${tag}`
}