import crypto, { createHash } from 'crypto';

// 暗号化キー（環境変数から取得することを推奨）
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || '833c5fd907525a32a7960dd975831362835c9721bc37caa466a7319b4769db85'; // 32 bytes for AES-256
const IV_LENGTH = 16; // For AES, this is always 16

export function encrypt(text: string): string {
    let iv = crypto.randomBytes(IV_LENGTH);
    let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY, 'hex') as Uint8Array, iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return iv.toString('hex') + ':' + encrypted;
}

export function decrypt(text: string): string {
    let textParts = text.split(':');
    let iv = Buffer.from(textParts[0], 'hex');
    let encryptedText = textParts[1];
    let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY!, 'hex') as Uint8Array, iv);
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}

// ハッシュ化（認証用）
export function hashApiKey(apiKey: string): string {
    return createHash('sha256').update(apiKey).digest('hex');
}
