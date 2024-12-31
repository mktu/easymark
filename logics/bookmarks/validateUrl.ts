export const createUrlRegExp = () => new RegExp(
    '^(https?:\\/\\/)' + // protocol
    '((([a-zA-Z0-9\\-]+\\.)+[a-zA-Z]{2,6})|' + // domain name and extension
    'localhost|' + // OR localhost
    '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
    '(\\:\\d+)?' + // port
    '(\\/[-a-zA-Z0-9@:%_\\+.~#?&//=]*)?$' // path
)

export const validateURL = (url: string): boolean => {
    const urlPattern = createUrlRegExp();
    return urlPattern.test(url);
};