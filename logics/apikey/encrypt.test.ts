import { encrypt, decrypt, hashApiKey } from './encrypt';

describe('cryptoFunctions', () => {
    it('should encrypt and decrypt text correctly', () => {
        const sampleText = 'Hello, this is a test!';
        const encrypted = encrypt(sampleText);
        const decrypted = decrypt(encrypted);

        expect(decrypted).toBe(sampleText);
    });

    it('should handle edge cases like empty strings', () => {
        const emptyText = '';
        const encryptedEmpty = encrypt(emptyText);
        const decryptedEmpty = decrypt(encryptedEmpty);

        expect(decryptedEmpty).toBe(emptyText);
    });
});

describe('hashApiKey', () => {

    it('should produce the same hash for the same API key', () => {
        const apiKey = 'testApiKey123';

        const hash1 = hashApiKey(apiKey);
        const hash2 = hashApiKey(apiKey);

        expect(hash1).toBe(hash2);
    });
});
