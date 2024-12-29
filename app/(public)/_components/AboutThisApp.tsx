import { FC } from "react";

const AboutThisApp: FC = () => {
    return (
        <div className='flex flex-col gap-4 p-4'>
            <h2 className="text-center text-2xl font-semibold">シンプルだけどアレンジは豊富なブックマークアプリ</h2>
            <p className='md:text-lg'>Easy markは名の通り、アプリ自体非常にシンプルなブックマークアプリです。
                一方で、Chrome拡張、Line連携やAPIなど様々なインタフェースを通じて使うことができます。
                自分だけのブックマークアプリを作成しましょう。
            </p>
        </div>
    )
}

export default AboutThisApp