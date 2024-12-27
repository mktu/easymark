import { encrypt, decrypt } from './encrypt';

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