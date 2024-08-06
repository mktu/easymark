export function formatTimestamp(timestamp: string) {
    // タイムスタンプを Date オブジェクトに変換
    const date = new Date(timestamp);

    // 年月日時分秒を取得し、必要に応じてゼロ埋めを行う
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');

    // フォーマットされた日付と時刻を結合
    const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    return formattedDate;
}
