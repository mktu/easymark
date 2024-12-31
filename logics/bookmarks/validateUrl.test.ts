import { validateURL } from "./validateUrl";

describe('validateUrl', () => {
    it('should validate correct URLs', () => {
        expect(validateURL('https://www.example.com')).toBe(true);
        expect(validateURL('http://example.com')).toBe(true);
        expect(validateURL('https://sub.example.com')).toBe(true);
        expect(validateURL('http://localhost:3000')).toBe(true);
        expect(validateURL('https://192.168.1.1')).toBe(true);
    });

    it('should invalidate incorrect URLs', () => {
        expect(validateURL('htp://example.com')).toBe(false);
        expect(validateURL('https://')).toBe(false);
        expect(validateURL('www.example.com')).toBe(false);
        expect(validateURL('example')).toBe(false);
        expect(validateURL('')).toBe(false);
    });
});