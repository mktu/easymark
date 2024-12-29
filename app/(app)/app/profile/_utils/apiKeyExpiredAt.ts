export interface ExpiryOption {
    value: string;
    label: string;
}

export const expiryOptions: ExpiryOption[] = [
    { value: '1d', label: '1日' },
    { value: '7d', label: '1週間' },
    { value: '1m', label: '1ヶ月' },
    { value: '3m', label: '3ヶ月' },
    { value: '6m', label: '6ヶ月' },
    { value: '1y', label: '1年' },
    { value: 'none', label: '無期限' }
];


export function calculateExpiryDate(expiryValue: string): string | null {
    const now = new Date();
    switch (expiryValue) {
        case '1d':
            now.setDate(now.getDate() + 1);
            break;
        case '7d':
            now.setDate(now.getDate() + 7);
            break;
        case '1m':
            now.setMonth(now.getMonth() + 1);
            break;
        case '3m':
            now.setMonth(now.getMonth() + 3);
            break;
        case '6m':
            now.setMonth(now.getMonth() + 6);
            break;
        case '1y':
            now.setFullYear(now.getFullYear() + 1);
            break;
        case 'none':
            return null;  // 無期限の場合はnullを返す
    }
    return now.toISOString();  // ISO 8601形式の文字列に変換
}
