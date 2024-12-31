export const TagOperator = "tag";
export const CategoryOperator = "category";
export const TitleOperator = "title";
export const FreeWordOperator = "freeWord";
const operators = [`${TagOperator}:`, `${CategoryOperator}:`, `${TitleOperator}:`];

export interface SearchQuery {
    results: Array<{ type: string, value: string[] }>;  // 結果を配列で保持
}

export function parseSearchQuery(searchInput: string): SearchQuery {
    const result: SearchQuery = {
        results: []
    };

    const segments = searchInput.split(",").map(segment => segment.trim());
    segments.forEach(segment => {
        let matched = false;

        // Check each operator to find a match and classify the segment
        operators.forEach(operator => {
            if (segment.startsWith(operator)) {
                const value = segment.slice(operator.length).trim();
                result.results.push({ type: operator.slice(0, -1), value: [value] });
                matched = true;
            }
        });

        // If no operators match, handle as freeWord
        if (!matched) {
            result.results.push({ type: FreeWordOperator, value: [segment] });
        }
    });

    return result;
}

export const buildQueryData = (query: SearchQuery) => {
    const data: { [key: string]: string[] } = {};

    query.results.forEach(result => {
        data[result.type] = result.value;
    });

    return data;
}

export const extractTagQuery = (query: SearchQuery) => {
    return query.results.find(result => result.type === TagOperator)?.value || [];
}

export const extractCategoryQuery = (query: SearchQuery) => {
    return query.results.find(result => result.type === CategoryOperator)?.value || [];
}

export const extractTitleQuery = (query: SearchQuery) => {
    return query.results.find(result => result.type === TitleOperator)?.value || [];
}

type QuerySegment = {
    type: string;
    value: string;
}

export const extractLastQuerySegment = (searchInput: string): QuerySegment | null => {
    const segments = searchInput.split(',').map(segment => segment.trim());
    if (!segments.length) {
        return null;
    }
    const lastSegment = segments[segments.length - 1];
    const colonIndex = lastSegment.indexOf(':');

    if (colonIndex !== -1) {
        // Type and value are explicitly specified
        const type = lastSegment.substring(0, colonIndex).trim();
        const value = lastSegment.substring(colonIndex + 1).trim();
        return { type: type, value: value };
    } else {
        // No explicit type specified; treat as a free word
        return { type: FreeWordOperator, value: lastSegment };
    }
}

export const replaceLastQuerySegment = (query: string, newSegment: QuerySegment): string => {
    const segments = query.split(',').map(segment => segment.trim());
    segments.pop();  // Remove the last segment
    const newSegmentString = `${newSegment.type}:${newSegment.value}`;
    segments.push(newSegmentString);  // Append the new segment
    return segments.join(', ');
}

export const appendQuerySegment = (query: string, newSegment: QuerySegment): string => {
    if (!query) {
        return `${newSegment.type}:${newSegment.value}`;
    }
    const segments = query.split(',').map(segment => segment.trim());
    const newSegmentString = `${newSegment.type}:${newSegment.value}`;
    segments.push(newSegmentString);  // Append the new segment
    return segments.join(', ');
}

export const appendQuerySegmentIfNotExists = (query: string, newSegment: QuerySegment): string => {
    const segments = query.split(',').map(segment => segment.trim());
    const existingSegment = segments.find(segment => segment.startsWith(`${newSegment.type}:`));
    if (existingSegment) {
        // check value is same
        if (existingSegment === `${newSegment.type}:${newSegment.value}`) {
            return query;
        }
        return query;
    }
    return appendQuerySegment(query, newSegment);
}