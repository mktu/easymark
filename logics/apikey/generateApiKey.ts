import { randomBytes } from 'crypto';

/**
 * Generates a random API key using secure cryptographic methods.
 * @param length The desired length of the API key. Default is 32 characters.
 * @returns A hex string representing the API key.
 */
export function generateApiKey(length: number = 32): string {
    return randomBytes(length).toString('hex');
}