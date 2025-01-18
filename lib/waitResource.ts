export function waitResource<T>(promise: Promise<T>) {
    let status = "pending";
    let result: T;

    const suspender = promise.then(
        (res) => {
            status = "success";
            result = res;
        },
        (err) => {
            status = "error";
            result = err;
        }
    );

    return {
        read() {
            if (status === "pending") throw suspender; // ローディング中はsuspenseを投げる
            if (status === "error") throw result; // エラーの場合もthrow
            return result; // データが取得できたら返す
        },
    };
}

export type ResourceHolder<T> = ReturnType<typeof waitResource<T>>;

export async function pollData<T>(fetchFunction: () => Promise<T>, checkCondition: (data: T) => boolean, interval = 1000) {
    while (true) {
        const data = await fetchFunction();
        if (checkCondition(data)) {
            return data; // 条件を満たしたらデータを返す
        }
        await new Promise((resolve) => setTimeout(resolve, interval)); // インターバルを設定
    }
}
