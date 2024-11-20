// parseSearchQuery.test.ts
import { extractLastQuerySegment, parseSearchQuery } from './parseSearchQuery';

describe('parseSearchQuery', () => {
    it('parses basic tag, category, and title correctly', () => {
        const query = "tag:react, category:programming, title:JavaScript tutorial";
        const expected = {
            results: [
                { type: 'tag', value: ['react'] },
                { type: 'category', value: ['programming'] },
                { type: 'title', value: ['JavaScript tutorial'] }
            ]
        };
        expect(parseSearchQuery(query)).toEqual(expected);
    });

    it('handles multiple tags and categories', () => {
        const query = "tag:react, tag:vue, category:programming, category:web";
        const expected = {
            results: [
                { type: 'tag', value: ['react'] },
                { type: 'tag', value: ['vue'] },
                { type: 'category', value: ['programming'] },
                { type: 'category', value: ['web'] }
            ]
        };
        expect(parseSearchQuery(query)).toEqual(expected);
    });

    it('treats input without an operator as freeWord', () => {
        const query = "some random words";
        const expected = {
            results: [
                { type: 'freeWord', value: ['some random words'] }
            ]
        };
        expect(parseSearchQuery(query)).toEqual(expected);
    });

    it('parses mixed inputs correctly', () => {
        const query = "tag:react, a spontaneous title, category:fun learning";
        const expected = {
            results: [
                { type: 'tag', value: ['react'] },
                { type: 'freeWord', value: ['a spontaneous title'] },
                { type: 'category', value: ['fun learning'] }
            ]
        };
        expect(parseSearchQuery(query)).toEqual(expected);
    });
});

describe('extractLastQuerySegment', () => {
    it('should extract the last segment when it is a tag', () => {
        const query = "tag:react, tag:vue, category:programming, tag:web";
        const expected = { type: 'tag', value: 'web' };
        expect(extractLastQuerySegment(query)).toEqual(expected);
    });

    it('should extract the last segment when it is a category', () => {
        const query = "tag:react, tag:vue, category:programming, category:web development";
        const expected = { type: 'category', value: 'web development' };
        expect(extractLastQuerySegment(query)).toEqual(expected);
    });

    it('should treat the last segment as freeWord when no explicit type is given', () => {
        const query = "tag:react, tag:vue, category:programming, test structure";
        const expected = { type: 'freeWord', value: 'test structure' };
        expect(extractLastQuerySegment(query)).toEqual(expected);
    });

    it('should handle a single freeWord without any type', () => {
        const query = "just some random words";
        const expected = { type: 'freeWord', value: 'just some random words' };
        expect(extractLastQuerySegment(query)).toEqual(expected);
    });

    it('should process empty strings correctly', () => {
        const query = "";
        const expected = { type: 'freeWord', value: '' };
        expect(extractLastQuerySegment(query)).toEqual(expected);
    });
});
